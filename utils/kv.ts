export const kv = await Deno.openKv();

await kv.set(["users"], []);
