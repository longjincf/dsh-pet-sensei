// 日语五十音小课堂（src/shared 纯数据，浏览器 bundle 与桌面 shared-core 共用）：
// 给随机动画配一句「假名 + 罗马音」对话气泡。数据与显示格式都收在这里，
// 两端（以及未来桌面端）共用同一份，避免各写一份后漂移。不依赖 React/DOM。

/** 一条五十音条目：假名字符 + 罗马音 */
export interface KanaEntry {
  /** 假名字符（平假名或片假名） */
  char: string;
  /** 罗马音（Hepburn 式） */
  romaji: string;
}

/** 五十音清音：平假名 + 片假名各 46 字，按五十音图顺序。 */
export const KANA_ROWS: KanaEntry[] = [
  // 平假名
  { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
  { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
  { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
  { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
  { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
  { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
  { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
  { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
  { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
  { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' },
  // 片假名
  { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
  { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
  { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
  { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
  { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
  { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
  { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
  { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
  { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
  { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' },
];

/** 拼成一句气泡文案：假名 + 罗马音（如「あ a」「し shi」「つ tsu」） */
export function kanaLine(entry: KanaEntry = randomKana()): string {
  return `${entry.char} ${entry.romaji}`;
}

/** 内置默认台词行：把 KANA_ROWS 拍平成「假名 罗马音」，一行一条（外部 txt 缺失时的回退） */
export const DEFAULT_KANA_LINES: string[] = KANA_ROWS.map((e) => `${e.char} ${e.romaji}`);

/**
 * 从**外部台词行**里随机抽一行；空/缺省回退到内置五十音。
 * 行来自项目根目录的 learningTxt.json（host 经 GET /learningTxt 提供），可整行替换成任意内容。
 */
export function randomBubbleLine(lines?: string[]): string {
  const pool = lines && lines.length > 0 ? lines : DEFAULT_KANA_LINES;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** 台词顺序：乱序随机 / 顺序循环。 */
export type LearningOrder = 'random' | 'cycle';

/**
 * 顺序循环：取 index 指向的那一行，next 回绕到 0（lines 空/缺省回退内置五十音）。
 * 配合调用方持有的索引推进，实现「一遍遍按顺序播、播完回到开头」。
 */
export function cycleBubbleLine(lines: string[] | undefined, index: number): { line: string; next: number } {
  const pool = lines && lines.length > 0 ? lines : DEFAULT_KANA_LINES;
  const i = ((index % pool.length) + pool.length) % pool.length;
  return { line: pool[i], next: (i + 1) % pool.length };
}

/** 内置默认内容表（外部 learningTxt.json 缺失/解析失败时的回退）：名称 → 台词行。 */
export const DEFAULT_LEARNING_CONTENTS: Record<string, string[]> = { 五十音: DEFAULT_KANA_LINES };

/**
 * 从内容表取指定名称的台词行；表/名称缺失或为空时回退内置五十音。
 * 内容表来自 learningTxt.json（`{ 名称: [台词行...] }`，host 经 GET /learningTxt 提供）。
 */
export function learningLines(
  contents: Record<string, string[]> | null | undefined,
  name: string | null | undefined,
): string[] {
  if (contents && name && Array.isArray(contents[name]) && contents[name].length > 0) return contents[name];
  return DEFAULT_KANA_LINES;
}

/** 把单个解析出的对象（`{ 名称: 台词行[] }`）并入内容表；同名时**合并台词行**（不覆盖）。 */
function mergeLearningObject(map: Record<string, string[]>, obj: Record<string, unknown>): void {
  for (const [k, v] of Object.entries(obj)) {
    if (!Array.isArray(v)) continue;
    const lines = v.filter((x): x is string => typeof x === 'string' && x !== '');
    map[k] = map[k] ? map[k].concat(lines) : lines;
  }
}

/**
 * 解析台词内容表文本。容忍「单个对象」与「多个顶层对象拼接」两种写法——
 * 用户常直接往文件末尾追加 `{ "名称": [...] }`，严格 JSON.parse 会因多顶层对象报错。
 */
export function parseLearningContents(text: string): Record<string, string[]> | null {
  const map: Record<string, string[]> = {};
  const n = text.length;
  let idx = 0;
  let parsedAny = false;
  while (idx < n) {
    const start = text.indexOf('{', idx);
    if (start === -1) break;
    let depth = 0;
    let end = -1;
    let inStr = false;
    for (let i = start; i < n; i++) {
      const ch = text[i];
      if (ch === '"') inStr = !inStr;
      else if (!inStr && ch === '{') depth++;
      else if (!inStr && ch === '}') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) break;
    try {
      const obj = JSON.parse(text.slice(start, end + 1)) as unknown;
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        mergeLearningObject(map, obj as Record<string, unknown>);
        parsedAny = true;
      }
    } catch {
      /* 跳过坏块 */
    }
    idx = end + 1;
  }
  return parsedAny && Object.keys(map).length > 0 ? map : null;
}

/** 弹五十音对话的概率（0~1）。0 = 关闭；1 = 每次都弹。随机链/右键/点击三处共用。 */
export const KANA_DIALOGUE_CHANCE = 0.7;

/** 随机抽一条五十音（均匀分布，平/片假名各半） */
export function randomKana(): KanaEntry {
  return KANA_ROWS[Math.floor(Math.random() * KANA_ROWS.length)];
}
