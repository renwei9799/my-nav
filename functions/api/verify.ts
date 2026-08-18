interface Env {
  ADMIN_TOKEN: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const authHeader = context.request.headers.get("Authorization");
  const expectedToken = `Bearer ${context.env.ADMIN_TOKEN}`;

  if (!context.env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "未在后台设置 ADMIN_TOKEN 环境变量" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (authHeader === expectedToken) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ error: "密码错误" }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
};