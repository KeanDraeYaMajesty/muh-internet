/**
 * Point Zen Internet at muh-internet.
 *
 * Run from Zen Internet's background page console:
 *   about:debugging → This Firefox → Zen Internet → Inspect
 *
 * Paste:
 *   await browser.storage.local.set({
 *     stylesRepositoryUrl: "https://raw.githubusercontent.com/KeanDraeYaMajesty/muh-internet/main/styles.json",
 *     transparentZenSettings: {
 *       ...(await browser.storage.local.get("transparentZenSettings")).transparentZenSettings,
 *       forceStyling: true,
 *       enableStyling: true,
 *       autoUpdate: true,
 *     },
 *   });
 *
 * Then open the Zen Internet popup → Refetch styles.
 *
 * Correct URL (raw JSON, NOT the GitHub blob page):
 *   https://raw.githubusercontent.com/KeanDraeYaMajesty/muh-internet/main/styles.json
 */
const RAW_URL =
  "https://raw.githubusercontent.com/KeanDraeYaMajesty/muh-internet/main/styles.json";

export async function applyMuhInternetDefaults(browserApi = globalThis.browser) {
  const existing = await browserApi.storage.local.get([
    "transparentZenSettings",
    "stylesRepositoryUrl",
  ]);
  await browserApi.storage.local.set({
    stylesRepositoryUrl: RAW_URL,
    transparentZenSettings: {
      ...(existing.transparentZenSettings || {}),
      enableStyling: true,
      autoUpdate: true,
      forceStyling: true,
    },
  });
  return browserApi.storage.local.get([
    "stylesRepositoryUrl",
    "transparentZenSettings",
  ]);
}

if (typeof browser !== "undefined" && browser?.storage?.local) {
  applyMuhInternetDefaults(browser).then((r) =>
    console.log("[muh-internet] applied", r),
  );
}
