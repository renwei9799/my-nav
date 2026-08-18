interface Env {
  NAV_KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const data = await context.env.NAV_KV.get("NAV_DATA");
  return new Response(data || "[]", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=10"
    }
  });
};