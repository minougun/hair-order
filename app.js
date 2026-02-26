import { CONCERN_RULES, GOAL_RULES, ORDER_PRESETS, TIME_RULES } from "./templates.js";
import { findBestCatalogItems } from "./catalog.js";
import { analyzeHairAttributes } from "./photo-analyzer.js";

const form = document.getElementById("order-form");
const resultSection = document.getElementById("result-section");
const badgeEl = document.getElementById("result-badge");
const summaryEl = document.getElementById("result-summary");
const specificsEl = document.getElementById("result-specifics");
const ngEl = document.getElementById("result-ng");
const askEl = document.getElementById("result-ask");
const searchEl = document.getElementById("result-search");
const orderTextEl = document.getElementById("order-text");
const shareTextEl = document.getElementById("share-text");
const catalogMainEl = document.getElementById("catalog-main");
const catalogGridEl = document.getElementById("catalog-grid");
const catalogEmbedWrapEl = document.getElementById("catalog-embed-wrap");
const catalogEmbedFrameEl = document.getElementById("catalog-embed-frame");
const frontPhotoInput = document.getElementById("front-photo");
const sidePhotoInput = document.getElementById("side-photo");
const topPhotoInput = document.getElementById("top-photo");
const analyzePhotosButton = document.getElementById("analyze-photos");
const photoStatusEl = document.getElementById("photo-status");
const photoPredictionsEl = document.getElementById("photo-predictions");
const copyOrderButton = document.getElementById("copy-order");
const copyShareButton = document.getElementById("copy-share");
const downloadCardButton = document.getElementById("download-card");
const cardDownloadLink = document.getElementById("card-download-link");
const shareCardCanvas = document.getElementById("share-card-canvas");
let latestResult = null;
const VALUE_LABELS = {
  gender: { male: "男性", female: "女性" },
  length: { short: "短め", medium: "中くらい", long: "長め" },
  volume: { low: "少なめ", normal: "普通", high: "多め" },
  stiffness: { soft: "柔らかい", normal: "普通", hard: "硬い" },
  wave: { straight: "直毛", wavy: "うねり", curly: "強いクセ" },
  crown: { weak: "弱い", normal: "普通", strong: "強い" },
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = collectInput();
  const result = generateOrder(input);
  renderResult(result);
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

copyOrderButton.addEventListener("click", async () => {
  await copyText(orderTextEl.value, copyOrderButton, "コピーしました");
});

copyShareButton.addEventListener("click", async () => {
  await copyText(shareTextEl.value, copyShareButton, "カード文をコピーしました");
});

downloadCardButton.addEventListener("click", () => {
  if (!latestResult) return;
  const dataUrl = drawShareCard(shareCardCanvas, latestResult);
  cardDownloadLink.href = dataUrl;
  cardDownloadLink.hidden = false;
  cardDownloadLink.click();
});

analyzePhotosButton.addEventListener("click", async () => {
  const files = {
    front: frontPhotoInput.files?.[0] ?? null,
    side: sidePhotoInput.files?.[0] ?? null,
    top: topPhotoInput.files?.[0] ?? null,
  };
  if (!files.front && !files.side && !files.top) {
    photoStatusEl.textContent = "写真が未選択です。正面・横・頭頂のいずれかを選んでください。";
    photoPredictionsEl.innerHTML = "";
    return;
  }

  analyzePhotosButton.disabled = true;
  photoStatusEl.textContent = "写真を解析しています...";

  try {
    const analysis = await analyzeHairAttributes(files);
    applyPredictionsToForm(analysis.predictions);
    renderPhotoPredictions(analysis);

    const used = [];
    if (analysis.usedPhotos.front) used.push("正面");
    if (analysis.usedPhotos.side) used.push("横");
    if (analysis.usedPhotos.top) used.push("頭頂");
    photoStatusEl.textContent = `解析完了: ${used.join(" / ")} 写真を使用して入力値を更新しました。必要に応じて手動修正してください。`;
  } catch (error) {
    photoStatusEl.textContent = `解析に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`;
    photoPredictionsEl.innerHTML = "";
  } finally {
    analyzePhotosButton.disabled = false;
  }
});

function collectInput() {
  const data = new FormData(form);

  return {
    gender: data.get("gender") || "male",
    length: data.get("length") || "short",
    volume: data.get("volume") || "normal",
    stiffness: data.get("stiffness") || "normal",
    wave: data.get("wave") || "straight",
    crown: data.get("crown") || "normal",
    concerns: data.getAll("concerns"),
    goals: data.getAll("goals"),
    setTime: data.get("setTime") || "3",
    iron: data.get("iron") || "no",
    dressCode: data.get("dressCode") || "normal",
    maintenance: data.get("maintenance") || "1m",
  };
}

function generateOrder(input) {
  const preset = selectBestPreset(input);
  const concernLabels = input.concerns.map((key) => CONCERN_RULES[key]?.label).filter(Boolean);
  const goalLabels = input.goals.map((key) => GOAL_RULES[key]?.label).filter(Boolean);

  const summaryParts = [preset.summary];
  for (const goalKey of input.goals) {
    const rule = GOAL_RULES[goalKey];
    if (rule) summaryParts.push(rule.summary);
  }

  const timeRule = TIME_RULES[input.setTime];
  if (timeRule) summaryParts.push(timeRule.summary);

  if (concernLabels.length > 0) {
    summaryParts.push(`${concernLabels.join("・")}を優先して調整`);
  }

  const specifics = [];
  const ng = [];
  const ask = [];
  const search = [];

  pushAll(specifics, preset.specifics);
  pushAll(ng, preset.ng);
  pushAll(ask, preset.ask);
  pushAll(search, preset.search);

  for (const concernKey of input.concerns) {
    const rule = CONCERN_RULES[concernKey];
    if (!rule) continue;
    pushAll(specifics, rule.specifics);
    pushAll(ng, rule.ng);
    pushAll(ask, rule.ask);
    pushAll(search, rule.search);
  }

  if (timeRule) {
    pushAll(specifics, timeRule.specifics);
    pushAll(ng, timeRule.ng);
  }

  if (input.iron === "no") {
    specifics.push("アイロンなしでも仕上がる毛流れを優先");
    ng.push("熱処理しないと成立しない設計");
  }
  if (input.iron === "yes") {
    specifics.push("アイロンは1工程以内で形が決まる設計");
  }

  if (input.dressCode === "strict") {
    specifics.push("職場ルールに合わせて輪郭はタイトに整える");
    ng.push("過度に攻めたシルエットや長さ");
  } else if (input.dressCode === "free") {
    specifics.push("休日も使える遊びを少し残す");
  }

  if (input.maintenance === "2m") {
    specifics.push("2ヶ月の伸びを見越して重さ位置を設計");
  } else if (input.maintenance === "2w") {
    specifics.push("2週メンテ前提で輪郭をキレ良く維持");
  }

  if (input.length === "short") {
    search.push("メンズ ショート");
  } else if (input.length === "medium") {
    search.push("メンズ ミディアム");
  } else {
    search.push("メンズ ロング");
  }

  if (input.volume === "high") {
    specifics.push("量感は表面を残し内側中心で調整");
  }

  if (input.stiffness === "hard") {
    specifics.push("硬毛でも横に張らない角度で収める");
  }

  if (input.wave === "wavy") {
    specifics.push("うねりを活かす流れにして再現性を上げる");
  }

  if (input.crown === "strong") {
    specifics.push("つむじ起点で安定する分け目に調整");
  }

  for (const goalKey of input.goals) {
    const rule = GOAL_RULES[goalKey];
    if (rule) pushAll(search, rule.search);
  }

  const summaryLead = summaryParts.length > 0 ? summaryParts.join("、") : "再現性を優先";
  const summary = `${summaryLead}。`;

  const compactSpecifics = unique(specifics).slice(0, 6);
  const compactNg = unique(ng).slice(0, 4);
  const compactAsk = unique(ask).slice(0, 4);
  const compactSearch = unique(search).slice(0, 8);

  const orderText = buildOrderText({
    summary,
    specifics: compactSpecifics,
    ng: compactNg,
    ask: compactAsk,
    search: compactSearch,
  });

  const shareText = buildShareText({
    gender: input.gender,
    badge: preset.badge,
    concerns: concernLabels,
    goals: goalLabels,
    setTime: input.setTime,
    summary,
  });

  const baseResult = {
    badge: preset.badge,
    summary,
    specifics: compactSpecifics,
    ng: compactNg,
    ask: compactAsk,
    search: compactSearch,
    orderText,
    shareText,
    matchedPreset: preset.title,
    concernLabels,
    goalLabels,
    gender: input.gender,
    setTime: input.setTime,
  };

  const catalog = findBestCatalogItems({
    input,
    result: baseResult,
    limit: 3,
  });

  return {
    ...baseResult,
    catalog,
  };
}

function selectBestPreset(input) {
  let best = ORDER_PRESETS[ORDER_PRESETS.length - 1];
  let bestScore = -Infinity;

  for (const preset of ORDER_PRESETS) {
    let score = 0;
    const when = preset.when || {};

    if (when.setTime) {
      score += when.setTime === input.setTime ? 3 : -1;
    }

    if (when.dressCode) {
      if (when.dressCode !== input.dressCode) {
        continue;
      }
      score += 2;
    }

    if (when.iron) {
      score += when.iron === input.iron ? 2 : -1;
    }

    if (when.maintenance) {
      score += when.maintenance === input.maintenance ? 2 : 0;
    }

    if (when.hairStiffness) {
      score += when.hairStiffness === input.stiffness ? 2 : 0;
    }

    if (when.hairWave) {
      score += when.hairWave === input.wave ? 2 : 0;
    }

    if (when.hairVolume) {
      score += when.hairVolume === input.volume ? 2 : 0;
    }

    if (when.crown) {
      score += when.crown === input.crown ? 2 : 0;
    }

    if (Array.isArray(when.concernsAny) && when.concernsAny.length > 0) {
      const matched = when.concernsAny.filter((key) => input.concerns.includes(key)).length;
      score += matched * 3;
      if (matched === 0) score -= 1;
    }

    if (Array.isArray(when.goalsAny) && when.goalsAny.length > 0) {
      const matched = when.goalsAny.filter((key) => input.goals.includes(key)).length;
      score += matched * 2;
    }

    if (score > bestScore) {
      bestScore = score;
      best = preset;
    }
  }

  return best;
}

function buildOrderText({ summary, specifics, ng, ask, search }) {
  return [
    "【要約】",
    summary,
    "",
    "【具体指示】",
    ...specifics.map((item) => `- ${item}`),
    "",
    "【避けたいこと】",
    ...ng.map((item) => `- ${item}`),
    "",
    "【美容師に確認すること】",
    ...ask.map((item) => `- ${item}`),
    "",
    "【参考写真の検索ワード】",
    ...search.map((item) => `- ${item}`),
  ].join("\n");
}

function buildShareText({ gender, badge, concerns, goals, setTime, summary }) {
  const genderText = VALUE_LABELS.gender[gender] ?? "未設定";
  const concernText = concerns.length > 0 ? concerns.join(" / ") : "悩み未選択";
  const goalText = goals.length > 0 ? goals.join(" / ") : "目標未選択";
  return [
    `対象: ${genderText}`,
    `称号: ${badge}`,
    `悩み: ${concernText}`,
    `方向性: ${goalText}`,
    `セット時間: ${setTime}分`,
    `方針: ${summary}`,
    "#美容室オーダー文メーカー",
  ].join("\n");
}

function renderResult(result) {
  latestResult = result;
  cardDownloadLink.hidden = true;
  badgeEl.textContent = `${result.badge} / ${result.matchedPreset}`;
  summaryEl.textContent = result.summary;

  renderList(specificsEl, result.specifics);
  renderList(ngEl, result.ng);
  renderList(askEl, result.ask);
  renderList(searchEl, result.search);

  orderTextEl.value = result.orderText;
  shareTextEl.value = result.shareText;
  renderCatalog(result.catalog);
}

function drawShareCard(canvas, result) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const pad = 72;
  const cardX = 56;
  const cardY = 62;
  const cardW = width - cardX * 2;
  const cardH = height - cardY * 2;
  const contentX = cardX + pad;
  const contentW = cardW - pad * 2;
  const sectionLimitY = cardY + cardH - 92;

  ctx.clearRect(0, 0, width, height);

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#0f8a82");
  bg.addColorStop(0.55, "#1c8d81");
  bg.addColorStop(1, "#1d2d3b");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  ctx.arc(width - 140, 120, 170, 0, Math.PI * 2);
  ctx.fillStyle = "#fff0a3";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(120, height - 120, 130, 0, Math.PI * 2);
  ctx.fillStyle = "#8cf6e6";
  ctx.fill();
  ctx.globalAlpha = 1;

  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 32, "#fffaf0");

  let y = cardY + 74;
  ctx.fillStyle = "#0f6762";
  ctx.font = "700 34px 'Zen Kaku Gothic New', sans-serif";
  ctx.fillText("美容室オーダー文メーカー", contentX, y);

  y += 46;
  drawRoundedRect(ctx, contentX, y - 30, contentW, 42, 21, "#f4c765");
  ctx.fillStyle = "#49300f";
  ctx.font = "700 22px 'Outfit', 'Zen Kaku Gothic New', sans-serif";
  ctx.fillText(`称号: ${result.badge}`, contentX + 18, y - 2);

  y += 64;
  const concernText = result.concernLabels.length > 0 ? result.concernLabels.join(" / ") : "悩み未選択";
  const goalText = result.goalLabels.length > 0 ? result.goalLabels.join(" / ") : "方向性未選択";
  const genderText = VALUE_LABELS.gender[result.gender] ?? "未設定";

  ctx.fillStyle = "#304247";
  ctx.font = "600 20px 'Zen Kaku Gothic New', sans-serif";
  y = drawWrappedText(ctx, `対象: ${genderText}`, contentX, y, contentW, 30);
  y = drawWrappedText(ctx, `悩み: ${concernText}`, contentX, y, contentW, 30);
  y = drawWrappedText(ctx, `方向性: ${goalText}`, contentX, y + 2, contentW, 30);
  y = drawWrappedText(ctx, `セット時間: ${result.setTime}分`, contentX, y + 2, contentW, 30);

  y += 20;
  y = drawCardSection(ctx, "要約", [result.summary], contentX, y, contentW, "#0f8a82", sectionLimitY);
  y = drawCardSection(ctx, "具体指示", result.specifics, contentX, y, contentW, "#0f8a82", sectionLimitY);
  y = drawCardSection(ctx, "避けたいこと", result.ng, contentX, y, contentW, "#de6f2f", sectionLimitY);
  y = drawCardSection(ctx, "美容師に聞く", result.ask, contentX, y, contentW, "#0f8a82", sectionLimitY);

  if (y < cardY + cardH - 46) {
    ctx.fillStyle = "#4e5d60";
    ctx.font = "500 19px 'Outfit', 'Zen Kaku Gothic New', sans-serif";
    ctx.fillText("#美容室オーダー文メーカー", contentX, cardY + cardH - 28);
  }

  return canvas.toDataURL("image/png");
}

function drawCardSection(ctx, title, items, x, y, maxWidth, accentColor, maxY) {
  if (y > maxY) return y;
  ctx.fillStyle = accentColor;
  ctx.font = "700 24px 'Zen Kaku Gothic New', sans-serif";
  ctx.fillText(title, x, y);
  y += 12;

  for (const item of items) {
    if (y + 28 > maxY) {
      ctx.fillStyle = "#5a6669";
      ctx.font = "600 20px 'Zen Kaku Gothic New', sans-serif";
      ctx.fillText("・...", x, maxY);
      return maxY + 1;
    }
    y += 22;
    ctx.fillStyle = "#324248";
    ctx.font = "600 20px 'Zen Kaku Gothic New', sans-serif";
    y = drawWrappedText(ctx, `・${item}`, x, y, maxWidth, 30);
  }

  return y + 12;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = [];
  let current = "";

  for (const char of text) {
    const next = `${current}${char}`;
    if (ctx.measureText(next).width > maxWidth && current.length > 0) {
      lines.push(current);
      current = char;
    } else {
      current = next;
    }
  }
  if (current.length > 0) lines.push(current);

  for (const line of lines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }

  return y;
}

function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function renderCatalog(catalog) {
  catalogMainEl.innerHTML = "";
  catalogGridEl.innerHTML = "";
  catalogEmbedWrapEl.hidden = true;
  catalogEmbedFrameEl.removeAttribute("src");

  if (!catalog || !Array.isArray(catalog.items) || catalog.items.length === 0) {
    catalogMainEl.textContent = "該当候補が見つかりませんでした。";
    return;
  }

  const [mainItem, ...otherItems] = catalog.items;
  renderCatalogEmbed(mainItem);
  catalogMainEl.appendChild(renderCatalogCard(mainItem, true));

  for (const item of otherItems) {
    catalogGridEl.appendChild(renderCatalogCard(item, false));
  }
}

function renderCatalogCard(item, isMain) {
  const card = document.createElement("article");
  card.className = isMain ? "catalog-card catalog-card-main" : "catalog-card";

  const body = document.createElement("div");
  body.className = "catalog-body";

  const rank = document.createElement("p");
  rank.className = "catalog-rank";
  rank.textContent = isMain ? "最有力候補" : `代替候補 ${item.rank}`;

  const title = document.createElement("h4");
  title.className = "catalog-title";
  title.textContent = item.title;

  const subtitle = document.createElement("p");
  subtitle.className = "catalog-subtitle";
  subtitle.textContent = item.subtitle;

  const source = document.createElement("p");
  source.className = "catalog-source";
  source.textContent = `参照元: ${item.sourceName}`;

  const reason = document.createElement("p");
  reason.className = "catalog-reason";
  reason.textContent = `一致: ${item.reason}`;

  const linkWrap = document.createElement("div");
  linkWrap.className = "catalog-link-wrap";

  for (const linkInfo of item.externalLinks ?? []) {
    const link = document.createElement("a");
    link.className = "catalog-link";
    link.href = linkInfo.url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.textContent = linkInfo.label;
    linkWrap.appendChild(link);
  }

  body.append(rank, title, subtitle, source, reason, linkWrap);
  card.append(body);

  return card;
}

function renderCatalogEmbed(item) {
  const instagram = (item.externalLinks ?? []).find((link) => /instagram\\.com/i.test(link.url));
  if (!instagram) return;

  const embedUrl = toInstagramEmbedUrl(instagram.url);
  if (!embedUrl) return;

  catalogEmbedFrameEl.src = embedUrl;
  catalogEmbedWrapEl.hidden = false;
}

function toInstagramEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (!/instagram\\.com$/i.test(parsed.hostname) && !/\\.instagram\\.com$/i.test(parsed.hostname)) {
      return null;
    }
    if (/\\/embed\\/?$/i.test(parsed.pathname)) {
      return `${parsed.origin}${parsed.pathname}`;
    }
    const basePath = parsed.pathname.endsWith("/") ? parsed.pathname : `${parsed.pathname}/`;
    return `${parsed.origin}${basePath}embed/`;
  } catch {
    return null;
  }
}

function applyPredictionsToForm(predictions) {
  const mapping = ["length", "volume", "stiffness", "wave", "crown"];
  for (const key of mapping) {
    const value = predictions[key];
    if (!value) continue;
    const input = form.elements.namedItem(key);
    if (input && "value" in input) {
      input.value = value;
    }
  }
}

function renderPhotoPredictions(analysis) {
  const rows = [
    { key: "length", label: "長さ" },
    { key: "volume", label: "量" },
    { key: "stiffness", label: "硬さ" },
    { key: "wave", label: "クセ" },
    { key: "crown", label: "つむじ" },
  ];

  photoPredictionsEl.innerHTML = "";
  for (const row of rows) {
    const li = document.createElement("li");
    const value = analysis.predictions[row.key];
    const valueLabel = VALUE_LABELS[row.key]?.[value] ?? value;
    const confidence = Math.round((analysis.confidence[row.key] ?? 0) * 100);
    li.textContent = `${row.label}: ${valueLabel}（推定信頼度 ${confidence}%）`;
    photoPredictionsEl.appendChild(li);
  }
}

function renderList(target, items) {
  target.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  }
}

function pushAll(target, items) {
  if (!Array.isArray(items)) return;
  for (const item of items) {
    target.push(item);
  }
}

function unique(items) {
  return [...new Set(items)];
}

async function copyText(text, button, successLabel) {
  if (!text || text.trim().length === 0) return;

  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = successLabel;
  } catch {
    button.textContent = "コピー失敗";
  }

  window.setTimeout(() => {
    button.textContent = original;
  }, 1400);
}
