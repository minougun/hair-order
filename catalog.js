const DEFAULT_BOOKING_URL = "https://beauty.hotpepper.jp/";

function links(styleUrl, official, instagram, booking = DEFAULT_BOOKING_URL) {
  return [
    { label: "おすすめスタイル", url: styleUrl },
    { label: "公式サイト", url: official },
    { label: "Instagram", url: instagram },
    { label: "予約ページ", url: booking },
  ];
}

export const HAIR_CATALOG = [
  {
    id: "C01",
    title: "ビジネスショート（タイトサイド）",
    subtitle: "清潔感が出やすい定番シルエット",
    sourceName: "AFLOAT GINZA",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000233454/style/L272811465.html",
      "https://afloat.co.jp/",
      "https://www.instagram.com/afloat_japan/",
      "https://beauty.hotpepper.jp/slnH000233454/"
    ),
    tags: ["length_short", "goal_business", "goal_clean", "time_3", "tool_no_iron", "shape_tight_side", "occasion_office", "style_natural", "gender_male"],
  },
  {
    id: "C02",
    title: "ナチュラルショート（前髪コントロール）",
    subtitle: "前髪の割れを目立たせにくい設計",
    sourceName: "upis 飯田橋",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000406803/style/L272810551.html",
      "https://lipps-hair.com/",
      "https://www.instagram.com/lipps_hair/",
      "https://lipps-hair.com/reservation/"
    ),
    tags: ["length_short", "goal_clean", "goal_business", "time_3", "tool_no_iron", "shape_control_bangs", "style_natural", "occasion_office", "gender_male"],
  },
  {
    id: "C03",
    title: "テクスチャーショート",
    subtitle: "軽い束感でカジュアル寄せ",
    sourceName: "EARTH 八潮店",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000444665/style/L272811664.html",
      "https://www.shima-hair.com/",
      "https://www.instagram.com/shima_official_account/",
      "https://www.shima-hair.com/reserve/"
    ),
    tags: ["length_short", "goal_casual", "goal_sharp", "time_7", "tool_iron_ok", "style_texture", "shape_volume_top", "occasion_flexible", "gender_female"],
  },
  {
    id: "C04",
    title: "トップボリュームショート",
    subtitle: "ぺたんこ対策向けの立体感重視",
    sourceName: "OCEAN TOKYO",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000264498/style/L242723149.html",
      "https://www.oceantokyo.com/",
      "https://www.instagram.com/oceantokyo_official/",
      "https://beauty.hotpepper.jp/slnH000264498/"
    ),
    tags: ["length_short", "goal_clean", "goal_sharp", "time_3", "tool_no_iron", "shape_volume_top", "style_natural", "occasion_office", "gender_male"],
  },
  {
    id: "C05",
    title: "センターパート（韓国寄せ）",
    subtitle: "落ち感とシャープさの中間",
    sourceName: "ANSWER 渋谷",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000759403/style/L253765222.html",
      "https://lipps-hair.com/",
      "https://www.instagram.com/lipps_hair/",
      "https://lipps-hair.com/reservation/"
    ),
    tags: ["length_medium", "goal_korean", "goal_sharp", "time_15", "tool_iron_ok", "style_center_part", "style_korean", "occasion_flexible", "gender_male"],
  },
  {
    id: "C06",
    title: "ミディアムレイヤー（柔らかめ）",
    subtitle: "動きは出しつつ重さも残す",
    sourceName: "ROGUE",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000722048/style/L236611163.html",
      "https://minx-net.co.jp/",
      "https://www.instagram.com/minx_hair/",
      "https://8eca03.b-merit.jp/z3SPb7/web/reserve1/?from_coupon=1&no_coupon=1&redirect=1"
    ),
    tags: ["length_medium", "goal_soft", "goal_casual", "time_7", "tool_no_iron", "style_layer", "hair_wavy", "shape_anti_frizz", "gender_female"],
  },
  {
    id: "C07",
    title: "収まり重視ミディアム",
    subtitle: "広がりを抑えるまとまり設計",
    sourceName: "AHL creation",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000559325/style/L272810829.html",
      "https://www.garden-hair.jp/",
      "https://www.instagram.com/garden_hair/",
      "https://www.garden-hair.jp/reserve/"
    ),
    tags: ["length_medium", "goal_clean", "goal_soft", "time_7", "tool_no_iron", "shape_anti_frizz", "style_natural", "hair_wavy", "gender_female"],
  },
  {
    id: "C08",
    title: "オフィス向けミディアムショート",
    subtitle: "仕事でも浮きにくい輪郭",
    sourceName: "EARTH 八潮店",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000444665/style/L272806959.html",
      "https://www.garden-hair.jp/",
      "https://www.instagram.com/garden_hair/",
      "https://www.garden-hair.jp/reserve/"
    ),
    tags: ["length_medium", "goal_business", "goal_clean", "time_7", "tool_no_iron", "shape_tight_side", "occasion_office", "style_natural", "gender_female"],
  },
  {
    id: "C09",
    title: "ノーセット寄りショート",
    subtitle: "乾かすだけ運用向け",
    sourceName: "upis 飯田橋",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000406803/style/L272810780.html",
      "https://www.oceantokyo.com/",
      "https://www.instagram.com/oceantokyo_official/",
      "https://beauty.hotpepper.jp/slnH000264498/"
    ),
    tags: ["length_short", "goal_clean", "time_0", "tool_no_iron", "style_natural", "shape_control_bangs", "occasion_office", "gender_male"],
  },
  {
    id: "C10",
    title: "ワイド抑制ショート",
    subtitle: "サイド膨らみ・ハチ張り対策",
    sourceName: "anis musee",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000437479/style/L272810684.html",
      "https://lipps-hair.com/",
      "https://www.instagram.com/lipps_hair/",
      "https://lipps-hair.com/reservation/"
    ),
    tags: ["length_short", "goal_business", "goal_sharp", "time_3", "tool_no_iron", "shape_tight_side", "shape_volume_top", "occasion_office", "gender_male"],
  },
  {
    id: "C11",
    title: "ウェーブ活かしミディアム",
    subtitle: "うねりを活かすカジュアル仕様",
    sourceName: "syn",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000346025/style/L172278688.html",
      "https://www.album-hair.com/",
      "https://www.instagram.com/album_hair/",
      DEFAULT_BOOKING_URL
    ),
    tags: ["length_medium", "goal_casual", "goal_soft", "time_15", "tool_iron_ok", "style_layer", "hair_wavy", "style_texture", "gender_female"],
  },
  {
    id: "C12",
    title: "ロングレイヤー（柔らか質感）",
    subtitle: "まとまりと軽さのバランス型",
    sourceName: "ROGUE",
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000722048/style/L236611163.html",
      "https://afloat.co.jp/",
      "https://www.instagram.com/afloat_japan/",
      DEFAULT_BOOKING_URL
    ),
    tags: ["length_long", "goal_soft", "goal_clean", "time_15", "tool_iron_ok", "style_layer", "shape_anti_frizz", "hair_wavy", "gender_female"],
  },
];

const GOAL_TO_TAG = {
  clean: "goal_clean",
  sharp: "goal_sharp",
  soft: "goal_soft",
  korean: "goal_korean",
  business: "goal_business",
  casual: "goal_casual",
};

const CONCERN_TO_TAG = {
  front_split: "shape_control_bangs",
  top_flat: "shape_volume_top",
  side_puff: "shape_tight_side",
  hachi_wide: "shape_tight_side",
  frizz: "shape_anti_frizz",
  limp: "shape_volume_top",
  style_fades: "style_natural",
};

const TAG_LABELS = {
  length_short: "短め",
  length_medium: "中くらい",
  length_long: "長め",
  goal_clean: "清潔感",
  goal_sharp: "シャープ",
  goal_soft: "柔らかめ",
  goal_korean: "韓国っぽい",
  goal_business: "ビジネス寄り",
  goal_casual: "カジュアル",
  time_0: "0分セット",
  time_3: "3分セット",
  time_7: "7分セット",
  time_15: "15分セット",
  tool_no_iron: "アイロンなし",
  tool_iron_ok: "アイロンあり",
  shape_control_bangs: "前髪コントロール",
  shape_volume_top: "トップボリューム",
  shape_tight_side: "サイド収まり",
  shape_anti_frizz: "広がり対策",
  style_center_part: "センターパート",
  style_korean: "韓国寄せ",
  style_texture: "束感",
  style_natural: "ナチュラル",
  style_layer: "レイヤー",
  occasion_office: "職場向け",
  occasion_flexible: "休日向け",
  hair_wavy: "うねり活かし",
  hair_straight: "直毛向け",
  volume_high: "多毛向け",
  volume_low: "少なめ向け",
  gender_male: "男性向け",
  gender_female: "女性向け",
};

export function findBestCatalogItems({ input, result, limit = 3 }) {
  const queryTags = buildQueryTags(input, result);
  const querySet = new Set(queryTags);

  const scored = HAIR_CATALOG.map((item) => {
    const matchedTags = item.tags.filter((tag) => querySet.has(tag));
    let score = matchedTags.reduce((sum, tag) => sum + tagWeight(tag), 0);

    const lengthTag = item.tags.find((tag) => tag.startsWith("length_"));
    const timeTag = item.tags.find((tag) => tag.startsWith("time_"));
    const toolTag = item.tags.find((tag) => tag.startsWith("tool_"));

    if (lengthTag && !querySet.has(lengthTag)) score -= 2;
    if (timeTag && !querySet.has(timeTag)) score -= 1;
    if (toolTag === "tool_iron_ok" && querySet.has("tool_no_iron")) score -= 2;

    return {
      ...item,
      score,
      matchedTags,
      matchedLabels: matchedTags.map((tag) => TAG_LABELS[tag]).filter(Boolean),
    };
  }).sort((a, b) => b.score - a.score);

  const selected = scored.slice(0, limit).map((item, index) => ({
    ...item,
    rank: index + 1,
    reason: item.matchedLabels.length > 0 ? item.matchedLabels.slice(0, 4).join(" / ") : "汎用候補",
  }));

  return {
    queryTags,
    items: selected,
  };
}

function buildQueryTags(input, result) {
  const tags = new Set();

  tags.add(`length_${input.length}`);
  tags.add(`time_${input.setTime}`);
  tags.add(input.iron === "yes" ? "tool_iron_ok" : "tool_no_iron");
  tags.add(input.gender === "female" ? "gender_female" : "gender_male");

  if (input.dressCode === "strict") {
    tags.add("occasion_office");
  }
  if (input.dressCode === "free") {
    tags.add("occasion_flexible");
  }

  if (input.volume === "high") tags.add("volume_high");
  if (input.volume === "low") tags.add("volume_low");

  if (input.wave === "wavy") tags.add("hair_wavy");
  if (input.wave === "straight") tags.add("hair_straight");

  for (const goal of input.goals) {
    const mapped = GOAL_TO_TAG[goal];
    if (mapped) tags.add(mapped);
  }

  for (const concern of input.concerns) {
    const mapped = CONCERN_TO_TAG[concern];
    if (mapped) tags.add(mapped);
  }

  if (input.goals.includes("korean") || result.matchedPreset.includes("センターパート")) {
    tags.add("style_center_part");
    tags.add("style_korean");
  }

  if (result.matchedPreset.includes("束感")) tags.add("style_texture");
  if (result.matchedPreset.includes("ビジネス")) tags.add("occasion_office");

  return [...tags];
}

function tagWeight(tag) {
  if (tag.startsWith("goal_")) return 6;
  if (tag.startsWith("shape_")) return 5;
  if (tag.startsWith("gender_")) return 5;
  if (tag.startsWith("length_")) return 4;
  if (tag.startsWith("time_")) return 3;
  if (tag.startsWith("tool_")) return 3;
  if (tag.startsWith("style_")) return 3;
  if (tag.startsWith("occasion_")) return 2;
  if (tag.startsWith("hair_") || tag.startsWith("volume_")) return 2;
  return 1;
}
