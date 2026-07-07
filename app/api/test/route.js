// test code to see if D1 binding works

export async function GET(request) {
  return Response.json({
    node: process.version,
    cf: !!request.cf,
    url: request.url,
    headers: Object.fromEntries(request.headers),
  });
}