import { next } from "@vercel/edge";

const ENABLE_MIDDLEWARE = process.env.ENABLE_MIDDLEWARE === "true";

export const config = {
  matcher: ENABLE_MIDDLEWARE ? '/(.*)' : undefined,
};

export default function middleware(request) {
  const authorizationHeader = request.headers.get("authorization");

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(" ")[1];
    const [user, password] = atob(basicAuth).toString().split(":");

    if (user === "sample" && password === "sample") {
      return next();
    }
  }

  return new Response("Basic Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}