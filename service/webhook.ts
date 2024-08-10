const apiKey = Deno.env.get("API_KEY") ?? "";
const appKey = Deno.env.get("APP_KEY") ?? "";

const payload = `_api_key=${apiKey}&appKey=${appKey}`;

export default async (): Promise<boolean> => {
  try {
    const resp = await fetch("https://www.pgyer.com/apiv2/app/check", {
      method: "POST",
      body: payload,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const result = await resp.json();
    if (result.code != 0) {
      return false;
    }

    const appConfig = JSON.parse(await Deno.readTextFile("./config/app.json"));

    const config: Record<string, string> = {
      site: result.data.appURl,
      version: `${result.data.buildVersion}+${result.data.buildVersionNo}`,
      download_url: result.data.downloadURL,
      update_notes: result.data.buildUpdateDescription,
      forced_update_version: appConfig.forced_update_version,
      forced_update_notes: appConfig.forced_update_notes,
    };
    const kv = await Deno.openKv();
    await kv.set(["app", "config"], config);
    return true;
  } catch (e) {
    console.error("Webhook Error:", e);
  }
  return false;
};
