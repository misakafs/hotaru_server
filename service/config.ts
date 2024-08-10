export default async (): Promise<Record<string, string> | null> => {
    const kv = await Deno.openKv();
    const m = await kv.get<Record<string, string>>(["app", "config"]);
    return m.value;
}