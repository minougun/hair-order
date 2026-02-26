const DEFAULT_BOOKING_URL = "https://beauty.hotpepper.jp/";

function links(styleUrl, official, instagram, booking = DEFAULT_BOOKING_URL) {
  return [
    { label: "おすすめスタイル", url: styleUrl },
    { label: "公式サイト", url: official },
    { label: "Instagram", url: instagram },
    { label: "予約ページ", url: booking },
  ].filter((item) => typeof item.url === "string" && item.url.trim().length > 0);
}

function location(lat, lng, prefecture, area, keywords = []) {
  return { lat, lng, prefecture, area, keywords };
}

export const HAIR_CATALOG = [
  {
    id: "C01",
    title: "ビジネスショート（タイトサイド）",
    subtitle: "清潔感が出やすい定番シルエット",
    sourceName: "AFLOAT GINZA",
    location: location(35.6718, 139.7652, "東京都", "銀座", ["東京", "中央区", "有楽町", "関東"]),
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
    location: location(35.7026, 139.7446, "東京都", "飯田橋", ["東京", "千代田区", "新宿区", "関東"]),
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
    location: location(35.8073, 139.8449, "埼玉県", "八潮", ["埼玉", "八潮市", "つくばエクスプレス", "関東"]),
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
    location: location(35.6696, 139.7066, "東京都", "原宿", ["東京", "渋谷区", "表参道", "関東"]),
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
    location: location(35.6594, 139.7003, "東京都", "渋谷", ["東京", "渋谷区", "道玄坂", "関東"]),
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
    location: location(35.6677, 139.7124, "東京都", "表参道", ["東京", "港区", "南青山", "関東"]),
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
    location: location(35.7299, 139.7108, "東京都", "池袋", ["東京", "豊島区", "池袋駅", "関東"]),
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
    location: location(35.8073, 139.8449, "埼玉県", "八潮", ["埼玉", "八潮市", "関東"]),
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
    location: location(35.7026, 139.7446, "東京都", "飯田橋", ["東京", "千代田区", "関東"]),
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
    location: location(35.6657, 139.7403, "東京都", "六本木", ["東京", "港区", "六本木", "関東"]),
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
    location: location(35.6603, 139.6983, "東京都", "渋谷", ["東京", "渋谷区", "神南", "関東"]),
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
    location: location(35.6677, 139.7124, "東京都", "表参道", ["東京", "港区", "南青山", "関東"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000722048/style/L236611163.html",
      "https://afloat.co.jp/",
      "https://www.instagram.com/afloat_japan/",
      DEFAULT_BOOKING_URL
    ),
    tags: ["length_long", "goal_soft", "goal_clean", "time_15", "tool_iron_ok", "style_layer", "shape_anti_frizz", "hair_wavy", "gender_female"],
  },
  {
    id: "C13",
    title: "梅田ビジネスショート",
    subtitle: "清潔感と収まりを両立した関西向け定番",
    sourceName: "L-MARK 梅田店",
    location: location(34.7047, 135.4979, "大阪府", "梅田", ["大阪", "大阪駅", "北区", "梅田駅", "宝塚", "関西"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000790795/style/L265695495.html",
      "https://beauty.hotpepper.jp/slnH000790795/",
      "",
      "https://beauty.hotpepper.jp/slnH000790795/"
    ),
    tags: ["length_short", "goal_business", "goal_clean", "time_3", "tool_no_iron", "shape_tight_side", "style_natural", "occasion_office", "gender_male"],
  },
  {
    id: "C14",
    title: "なんばセンターパート",
    subtitle: "韓国寄せの落ち感シルエット",
    sourceName: "FRAME + 御堂筋難波店",
    location: location(34.6672, 135.5009, "大阪府", "なんば", ["大阪", "難波", "心斎橋", "中央区", "宝塚", "関西"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000577126/style/L181750961.html",
      "https://beauty.hotpepper.jp/slnH000577126/",
      "",
      "https://beauty.hotpepper.jp/slnH000577126/"
    ),
    tags: ["length_medium", "goal_korean", "goal_sharp", "time_15", "tool_iron_ok", "style_center_part", "style_korean", "occasion_flexible", "gender_male"],
  },
  {
    id: "C15",
    title: "京都ナチュラルレイヤー",
    subtitle: "柔らかくまとまるミディアム設計",
    sourceName: "freera 京都河原町三条店",
    location: location(35.0082, 135.7682, "京都府", "河原町", ["京都", "三条", "四条", "中京区", "関西"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000519584/style/L191129210.html",
      "https://beauty.hotpepper.jp/slnH000519584/",
      "",
      "https://beauty.hotpepper.jp/slnH000519584/"
    ),
    tags: ["length_medium", "goal_soft", "goal_casual", "time_7", "tool_no_iron", "style_layer", "hair_wavy", "shape_anti_frizz", "gender_female"],
  },
  {
    id: "C16",
    title: "神戸ビジネスショート",
    subtitle: "職場でも扱いやすい再現性重視",
    sourceName: "Salon de aim",
    location: location(34.6937, 135.1956, "兵庫県", "三宮", ["神戸", "兵庫", "三ノ宮", "中央区", "宝塚", "西宮", "関西"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000746703/style/L239012354.html",
      "https://beauty.hotpepper.jp/slnH000746703/",
      "",
      "https://beauty.hotpepper.jp/slnH000746703/"
    ),
    tags: ["length_short", "goal_business", "goal_clean", "time_3", "tool_no_iron", "shape_control_bangs", "style_natural", "occasion_office", "gender_male"],
  },
  {
    id: "C17",
    title: "神戸ウェーブレイヤー",
    subtitle: "うねりを活かすカジュアル質感",
    sourceName: "source hair atelier",
    location: location(34.6929, 135.1949, "兵庫県", "三宮", ["神戸", "兵庫", "三ノ宮", "元町", "宝塚", "西宮", "関西"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000746031/style/L259847250.html",
      "https://beauty.hotpepper.jp/slnH000746031/",
      "",
      "https://beauty.hotpepper.jp/slnH000746031/"
    ),
    tags: ["length_medium", "goal_casual", "goal_soft", "time_15", "tool_iron_ok", "style_layer", "style_texture", "hair_wavy", "gender_female"],
  },
  {
    id: "C18",
    title: "神戸まとまりショート",
    subtitle: "広がりを抑えた扱いやすいフォルム",
    sourceName: "Lumiere 神戸",
    location: location(34.6948, 135.1935, "兵庫県", "三宮", ["神戸", "兵庫", "元町", "三ノ宮", "宝塚", "西宮", "関西"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000748015/style/L242871107.html",
      "https://beauty.hotpepper.jp/slnH000748015/",
      "",
      "https://beauty.hotpepper.jp/slnH000748015/"
    ),
    tags: ["length_short", "goal_clean", "goal_soft", "time_7", "tool_no_iron", "shape_anti_frizz", "style_natural", "occasion_flexible", "gender_female"],
  },
  {
    id: "C19",
    title: "西宮北口ナチュラルショート",
    subtitle: "宝塚・西宮エリア向けの扱いやすい質感",
    sourceName: "NEXUS 西宮北口",
    location: location(34.7395, 135.3476, "兵庫県", "西宮北口", ["兵庫", "西宮", "宝塚", "阪急宝塚", "関西"]),
    externalLinks: links(
      "https://beauty.hotpepper.jp/slnH000561760/style/L259462985.html",
      "https://beauty.hotpepper.jp/slnH000561760/",
      "",
      "https://beauty.hotpepper.jp/slnH000561760/"
    ),
    tags: ["length_short", "goal_business", "goal_clean", "time_3", "tool_no_iron", "shape_control_bangs", "style_natural", "occasion_office", "gender_male"],
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
  const locationSignal = buildLocationSignal(input);

  const scored = HAIR_CATALOG.map((item) => {
    const matchedTags = item.tags.filter((tag) => querySet.has(tag));
    let score = matchedTags.reduce((sum, tag) => sum + tagWeight(tag), 0);

    const lengthTag = item.tags.find((tag) => tag.startsWith("length_"));
    const timeTag = item.tags.find((tag) => tag.startsWith("time_"));
    const toolTag = item.tags.find((tag) => tag.startsWith("tool_"));

    if (lengthTag && !querySet.has(lengthTag)) score -= 2;
    if (timeTag && !querySet.has(timeTag)) score -= 1;
    if (toolTag === "tool_iron_ok" && querySet.has("tool_no_iron")) score -= 2;

    const locationResult = scoreLocation(item, locationSignal);
    score += locationResult.locationScore;

    return {
      ...item,
      score,
      matchedTags,
      matchedLabels: matchedTags.map((tag) => TAG_LABELS[tag]).filter(Boolean),
      distanceKm: locationResult.distanceKm,
      matchedAreaKeyword: locationResult.matchedAreaKeyword,
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const distanceA = Number.isFinite(a.distanceKm) ? a.distanceKm : Number.POSITIVE_INFINITY;
    const distanceB = Number.isFinite(b.distanceKm) ? b.distanceKm : Number.POSITIVE_INFINITY;
    return distanceA - distanceB;
  });

  const selected = scored.slice(0, limit).map((item, index) => ({
    ...item,
    rank: index + 1,
    reason: buildReasonText(item),
  }));

  return {
    queryTags,
    items: selected,
    locationHint: buildLocationHint(locationSignal, selected),
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

function buildLocationSignal(input) {
  const areaQueryRaw = `${input.areaQuery || ""}`.trim();
  const areaTokens = expandAreaTokens(areaQueryRaw);
  const hasCoords =
    input.location && Number.isFinite(input.location.lat) && Number.isFinite(input.location.lng);

  return {
    areaQueryRaw,
    areaTokens,
    coords: hasCoords ? input.location : null,
  };
}

function scoreLocation(item, locationSignal) {
  const result = {
    locationScore: 0,
    distanceKm: null,
    matchedAreaKeyword: "",
  };

  const itemLocation = item.location;
  if (!itemLocation) return result;

  if (
    locationSignal.coords &&
    Number.isFinite(itemLocation.lat) &&
    Number.isFinite(itemLocation.lng)
  ) {
    const distanceKm = haversineKm(
      locationSignal.coords.lat,
      locationSignal.coords.lng,
      itemLocation.lat,
      itemLocation.lng
    );
    result.distanceKm = distanceKm;

    if (distanceKm <= 5) result.locationScore += 20;
    else if (distanceKm <= 15) result.locationScore += 14;
    else if (distanceKm <= 40) result.locationScore += 9;
    else if (distanceKm <= 100) result.locationScore += 3;
    else if (distanceKm <= 250) result.locationScore -= 8;
    else result.locationScore -= 22;
  }

  if (locationSignal.areaTokens.length > 0) {
    const keywords = [itemLocation.prefecture, itemLocation.area, ...(itemLocation.keywords ?? [])]
      .filter(Boolean)
      .map((value) => String(value));

    let matchedKeyword = "";
    for (const keyword of keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (!normalizedKeyword) continue;

      const matchedToken = locationSignal.areaTokens.find((token) => {
        if (!token) return false;
        return normalizedKeyword.includes(token) || token.includes(normalizedKeyword);
      });

      if (matchedToken) {
        matchedKeyword = keyword;
        break;
      }
    }

    if (matchedKeyword) {
      result.locationScore += 24;
      if (locationSignal.coords) {
        result.locationScore += 4;
      }
      result.matchedAreaKeyword = matchedKeyword;
    } else if (!locationSignal.coords) {
      result.locationScore -= 3;
    }
  }

  return result;
}

function buildReasonText(item) {
  const reasonParts = [];

  if (item.matchedLabels.length > 0) {
    reasonParts.push(...item.matchedLabels.slice(0, 3));
  }

  if (Number.isFinite(item.distanceKm)) {
    reasonParts.push(`距離${item.distanceKm.toFixed(1)}km`);
  } else if (item.matchedAreaKeyword) {
    reasonParts.push(`エリア一致:${item.matchedAreaKeyword}`);
  }

  return reasonParts.length > 0 ? reasonParts.join(" / ") : "汎用候補";
}

function buildLocationHint(locationSignal, selectedItems) {
  if (!locationSignal.coords && locationSignal.areaTokens.length === 0) {
    return "地域未設定のため、髪型条件を優先して表示しています。";
  }

  const hints = [];
  if (locationSignal.areaQueryRaw) {
    hints.push(`エリア「${locationSignal.areaQueryRaw}」を優先`);
  }

  if (locationSignal.coords) {
    const nearestWithDistance = selectedItems.find((item) => Number.isFinite(item.distanceKm));
    if (nearestWithDistance) {
      hints.push(`現在地優先（最短 約${nearestWithDistance.distanceKm.toFixed(1)}km）`);
    } else {
      hints.push("現在地優先（距離情報未設定の候補あり）");
    }
  }

  return hints.join(" / ");
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\s　\-ー_]/g, "")
    .normalize("NFKC");
}

function normalizeAreaToken(value) {
  return normalizeText(value).replace(/(駅|jr|阪急|阪神|地下鉄|メトロ|線|口|出口|電鉄|本線)/g, "");
}

function expandAreaTokens(areaQueryRaw) {
  const raw = `${areaQueryRaw || ""}`.trim();
  if (raw.length === 0) return [];

  const tokens = new Set();
  const base = normalizeAreaToken(raw);
  if (base) tokens.add(base);

  const splitTokens = raw.split(/[\/、,・\s　]+/).map(normalizeAreaToken).filter(Boolean);
  for (const token of splitTokens) tokens.add(token);

  const aliasMap = {
    宝塚: ["宝塚", "西宮", "兵庫", "神戸", "三宮", "関西"],
    西宮: ["西宮", "兵庫", "宝塚", "神戸", "関西"],
    三宮: ["三宮", "神戸", "兵庫", "元町", "関西"],
    神戸: ["神戸", "三宮", "元町", "兵庫", "関西"],
    梅田: ["梅田", "大阪", "大阪駅", "なんば", "心斎橋", "関西"],
    なんば: ["なんば", "難波", "心斎橋", "大阪", "関西"],
    心斎橋: ["心斎橋", "なんば", "難波", "大阪", "関西"],
    京都: ["京都", "河原町", "三条", "四条", "関西"],
    飯田橋: ["飯田橋", "東京", "新宿", "関東"],
    銀座: ["銀座", "東京", "有楽町", "関東"],
    渋谷: ["渋谷", "原宿", "東京", "関東"],
  };

  for (const [key, values] of Object.entries(aliasMap)) {
    const normalizedKey = normalizeAreaToken(key);
    if (!normalizedKey) continue;
    const keyMatched =
      tokens.has(normalizedKey) ||
      (base.length > 0 && (base.includes(normalizedKey) || normalizedKey.includes(base)));
    if (!keyMatched) {
      continue;
    }
    for (const value of values) {
      const normalized = normalizeAreaToken(value);
      if (normalized) tokens.add(normalized);
    }
  }

  return [...tokens];
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
