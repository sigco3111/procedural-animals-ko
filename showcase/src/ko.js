// Korean display labels for the showcase UI (ids stay English; only what the user sees is Korean).
export const KO_GAIT = {
  stand: '정지', moving: '이동 중', walk: '걷기', amble: '느린 걸음', trot: '속보', canter: '구보',
  gallop: '질주', bound: '도약', halfbound: '반도약', sprint: '전력 질주', run: '달리기',
  shuffle: '어기적걸음', hop: '깡충', crawl: '기어가기', dash: '돌진', fly: '비행',
  slither: '미끄러지기', swim: '헤엄', glide: '활공',
};
export const KO_ACTION = {
  idle: '대기', jump: '점프', sit: '앉기', lie: '엎드리기', sleep: '잠자기', eat: '먹기',
  drink: '물 마시기', attack: '공격', hit: '피격', death: '죽음', stand: '일어서기',
  burst: '돌진', takeoff: '이륙', land: '착지', perch: '가지에 앉기', glide: '활공', flap: '날갯짓',
  roar: '포효', yawn: '하품', standup: '일어서기', sniff: '냄새 맡기', dig: '땅 파기',
  groom: '그루밍', knead: '꾹꾹이', loaf: '식빵 자세', stalk: '사냥 자세', slowblink: '천천히 눈 깜빡이기',
  pounce: '덮치기', listen: '귀 기울이기', stomp: '발 구르기', alert: '경계', flee: '도망',
  binky: '깡충 뛰기', periscope: '서서 살피기', thump: '뒷발 쿵', hop: '깡충', croak: '개굴',
  blink: '눈 깜빡이기', bleat: '메에', headshake: '고개 흔들기', stamp: '앞발 구르기', pronk: '프롱킹',
  rear: '뒷다리로 서기', box: '앞발 싸움', scurry: '종종걸음', lick: '핥기', chew: '되새김',
  moo: '음매', swish: '꼬리 치기', shake: '털 털기', wallow: '진흙 목욕', grunt: '꿀꿀',
  root: '땅 후비기', frolic: '뛰놀기', browse: '풀 뜯기', paw: '앞발질', greet: '반기기',
  playbow: '놀이 자세', strike: '급습', coil: '몸 말기', preen: '깃 다듬기', howl: '울부짖기', crow: '울음',
};
export const KO_SEX = { male: '수컷', female: '암컷' };
export const KO_AGE = { adult: '성체', juvenile: '어린 개체' };
export const KO_QUALITY = { auto: '자동', hero: '히어로', high: '높음', medium: '중간', low: '낮음', crowd: '군중' };
export const KO_PLAN = { quadruped: '네발 동물', bird: '새', swimmer: '수생 동물', snake: '뱀', spider: '거미', hopper: '깡충 동물' };
export const KO_VARIANT = {
  saanen: '자넨', alpine: '알파인', pied: '얼룩', nubian: '누비안', boer: '보어',
  bay: '적갈색', darkbay: '진적갈색', chestnut: '밤색', black: '흑색', grey: '회백색',
  palomino: '팔로미노', dun: '듄', buckskin: '벅스킨',
};
export const koGait = (g) => KO_GAIT[g] || g;
export const koAction = (a) => KO_ACTION[a] || a;
