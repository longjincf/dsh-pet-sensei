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
 * 行来自项目根目录的 learningTxt.txt（host 经 GET /learningTxt 提供），可整行替换成任意内容。
 */
export function randomBubbleLine(lines?: string[]): string {
  const pool = lines && lines.length > 0 ? lines : DEFAULT_KANA_LINES;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** 弹五十音对话的概率（0~1）。0 = 关闭；1 = 每次都弹。随机链/右键/点击三处共用。 */
export const KANA_DIALOGUE_CHANCE = 0.7;

/** 随机抽一条五十音（均匀分布，平/片假名各半） */
export function randomKana(): KanaEntry {
  return KANA_ROWS[Math.floor(Math.random() * KANA_ROWS.length)];
}
