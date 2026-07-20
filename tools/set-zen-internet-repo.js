/**
 * Point Zen Internet at muh-internet, seed styles, and skip the welcome wizard.
 *
 * Run from Zen Internet's background page console (one paste):
 *   about:debugging → This Firefox → Zen Internet → Inspect → Console
 *
 * Correct URL (raw JSON, NOT the GitHub blob page):
 *   https://raw.githubusercontent.com/KeanDraeYaMajesty/muh-internet/main/styles.json
 *
 * If fetch fails with NetworkError, AdNauseam/uBO is likely canceling the request.
 * Whitelist in AdNauseam:  @@||raw.githubusercontent.com^
 * Or temporarily disable AdNauseam, run this script, then re-enable.
 */
(async () => {
  const RAW_URL =
    "https://raw.githubusercontent.com/KeanDraeYaMajesty/muh-internet/main/styles.json";

  const existing = await browser.storage.local.get([
    "transparentZenSettings",
    "stylesRepositoryUrl",
    "styles",
    "stylesMapping",
  ]);

  let styles = existing.styles;
  let fetchError = null;
  try {
    const res = await fetch(RAW_URL, {
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    styles = await res.json();
  } catch (err) {
    fetchError = err;
    console.warn(
      "[muh-internet] live fetch failed; keeping any existing styles",
      err,
    );
  }

  if (!styles?.website || !Object.keys(styles.website).length) {
    throw new Error(
      `No styles available. Fetch failed (${fetchError?.message || "unknown"}). ` +
        "Whitelist @@||raw.githubusercontent.com^ in AdNauseam, then re-run.",
    );
  }

  const mapping =
    styles.mapping && Object.keys(styles.mapping).length > 0
      ? { mapping: styles.mapping }
      : existing.stylesMapping || { mapping: {} };

  const transparentZenSettings = {
    ...(existing.transparentZenSettings || {}),
    enableStyling: true,
    autoUpdate: true,
    forceStyling: true,
    welcomeShown: true,
    lastFetchedTime: Date.now(),
  };

  await browser.storage.local.set({
    stylesRepositoryUrl: RAW_URL,
    styles,
    stylesMapping: mapping,
    transparentZenSettings,
  });

  try {
    await browser.runtime.sendMessage({ action: "enableAutoUpdate" });
  } catch (_) {
    /* optional */
  }

  const overlay = globalThis.document?.getElementById?.("welcome-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
    overlay.remove();
  }

  const saved = await browser.storage.local.get([
    "stylesRepositoryUrl",
    "transparentZenSettings",
    "styles",
  ]);
  console.log("[muh-internet] applied", {
    stylesRepositoryUrl: saved.stylesRepositoryUrl,
    welcomeShown: saved.transparentZenSettings?.welcomeShown,
    forceStyling: saved.transparentZenSettings?.forceStyling,
    websiteCount: Object.keys(saved.styles?.website || {}).length,
    fetchError: fetchError?.message || null,
  });
  return saved;
})();
