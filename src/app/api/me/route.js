import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json(
      {
        user: null,
        isStaff: false,
      },
      { headers: noStoreHeaders }
    );
  }

  return Response.json(
    {
      user: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        id: session.user.id,
      },
      isStaff: session.user.isStaff === true,
    },
    { headers: noStoreHeaders }
  );
}
