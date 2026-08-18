interface Env {
  NAV_KV: KVNamespace;
  ADMIN_TOKEN: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const authHeader = context.request.headers.get("Authorization");
  const expectedToken = `Bearer ${context.env.ADMIN_TOKEN}`;

  if (!context.env.ADMIN_TOKEN || authHeader !== expectedToken) {
    return new Response(JSON.stringify({ error: "密钥错误或未在后台配置 ADMIN_TOKEN" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const payload = await context.request.json();
    await context.env.NAV_KV.put("NAV_DATA", JSON.stringify(payload));
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "提交的数据格式有误" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};