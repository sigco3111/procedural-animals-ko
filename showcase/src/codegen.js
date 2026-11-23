// "Use in your game": copy-paste code for the animal on screen (species, seed, quality, sex, age),
// with a tiny syntax highlighter for the panel.

export function gameCode(s) {
  const q = (v) => (typeof v === 'string' ? `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : JSON.stringify(v));
  const opt = [`seed: ${s.seed}`, `quality: ${q(s.quality)}`];
  if (s.variant) opt.push(`variant: ${q(s.variant)}`);
  if (s.sex) opt.push(`sex: ${q(s.sex)}`);
  if (s.age && s.age !== 'adult') opt.push(`age: ${q(s.age)}`);
  const acts = (s.actions || []).filter((a) => a !== 'idle');
  const act = acts.find((a) => a === 'sit') || acts[0] || 'jump';
  const swim = s.plan === 'swimmer', fly = s.plan === 'bird';
  const drinks = (s.actions || []).includes('drink') && !swim;
  const perches = fly || (s.actions || []).includes('perch');
  const gait = s.gait ? `, gait: ${q(s.gait)}` : '';
  const speed = (s.speed || 3).toFixed(1).replace(/\.0$/, '');
  const file = `${s.species}-${s.seed}-${s.quality}.animal`;
  const bakeFlags = [`--seed ${s.seed}`, `--quality ${s.quality}`, s.sex ? `--sex ${s.sex}` : '', s.age && s.age !== 'adult' ? `--age ${s.age}` : '', `--out ${file}`].filter(Boolean).join(' ');
  return `// npm install procedural-animals three
import * as THREE from 'three';
import { createAnimal } from 'procedural-animals';

// ${s.name} (${s.latin}${s.variantNote ? ', ' + s.variantNote : ''}), Web Worker에서 절차적으로 생성 (여기서는 약 ${s.buildSec}초)
const animal = await createAnimal(${q(s.species)}, {
  ${opt.join(', ')},
  ground: (x, z) => terrain.heightAt(x, z),   // 지면 높이 (미터, 월드 좌표)${swim ? `
  water: (x, z) => lake.surfaceAt(x, z),      // 수면 높이, 물이 없는 곳은 null: 물 밖으로 나가지 않습니다` : drinks ? `
  water: (x, z) => lake.surfaceAt(x, z),      // 선택: 수면 또는 null (물가를 걸어 들어가 물을 마십니다)` : ''}${perches ? `
  perches: [branchTip, fencePost],            // 날아가 앉을 수 있는 Vector3들: play('perch')` : ''}
  position: new THREE.Vector3(0, ${swim ? '-0.5' : '0'}, 0),${swim ? '    // 물 속에서 시작' : ''}
  heading: 0,                                 // 라디안, 0이면 +Z 방향
});
scene.add(animal.object);                     // 스스로 움직입니다: transform은 항등으로 두세요

// 조종하기
animal.move({ speed: ${speed}, heading: Math.PI / 2${gait}${fly ? ', climb: 1' : swim ? ', climb: -0.3' : ''} });  // m/s${fly ? `
// climb은 m/s; 가장 빠른 지상 기어 이상(또는 상승 중)이면 이륙, 비행 속도 아래면 착지
// animal.state.mode: 'ground' | 'takeoff' | 'air' | 'landing' | 'perch', animal.state.altitude (m)
animal.play('perch', { target: branchTip });  // 날아가서 앉습니다` : swim ? `
// climb -1..1로 헤엄 경로의 각도를 조절; animal.state.depth는 수면 아래 미터
// 수생 동물의 moveTo 목표는 3D (수층 안으로 제한)` : ''}
animal.moveTo(new THREE.Vector3(10, ${swim ? '-0.5' : '0'}, 4), { speed: ${speed} });
animal.follow(body.position, body.velocity);  // 또는 내 물리 바디에 맞추기
animal.lookAt(player.position);               // null이면 바라보기 중지
animal.play(${q(act)});${acts.length ? `                         // ${acts.join(', ')}` : ''}
animal.on('footstep', (e) => sfx.play('step', e.position, e.strength));
animal.on('attackHit', (e) => damage(e.position, e.direction));

// 매 프레임
renderer.setAnimationLoop(() => {
  animal.update(clock.getDelta());
  renderer.render(scene, camera);
});

// 다 쓰고 나면
animal.dispose();

// 미리 빌드해서 배포 (로딩 때 메시 생성 없음):
${s.variant ? `//   writeBake(await buildAnimalData(${q(s.species)}, { ${opt.join(', ')} }))  // 'procedural-animals'와 'procedural-animals/bake'에서
//   (기본 변이는 npx procedural-animals-bake ${s.species} ${bakeFlags})` : `//   npx procedural-animals-bake ${s.species} ${bakeFlags}`}
// const animal = await createAnimal(${q(s.species)}, {
//   baked: fetch('${file}').then((r) => r.arrayBuffer()), ground });
`;
}

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const KW = /\b(import|from|const|let|await|new|return|async|function|null|true|false)\b/g;

export function highlight(code) {
  return code.split('\n').map((line) => {
    let out = '', rest = line;
    // split off a trailing // comment that is not inside a string
    let inS = null, cut = -1;
    for (let i = 0; i < rest.length; i++) {
      const c = rest[i];
      if (inS) { if (c === inS && rest[i - 1] !== '\\') inS = null; continue; }
      if (c === '"' || c === "'" || c === '`') inS = c;
      else if (c === '/' && rest[i + 1] === '/') { cut = i; break; }
    }
    const comment = cut >= 0 ? rest.slice(cut) : '';
    rest = cut >= 0 ? rest.slice(0, cut) : rest;
    const parts = rest.split(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2) out += `<span class="s">${esc(parts[i])}</span>`;
      else out += esc(parts[i]).replace(KW, '<span class="k">$1</span>').replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="n">$1</span>').replace(/\.(\w+)\(/g, '.<span class="f">$1</span>(');
    }
    if (comment) out += `<span class="c">${esc(comment)}</span>`;
    return out;
  }).join('\n');
}
