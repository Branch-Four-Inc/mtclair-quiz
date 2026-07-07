// test code to see if D1 binding works

export async function GET(request) {
  return Response.json({
    hasCloudflare: !!request.cf,
  });
}