import { auth } from "@/auth";
import { userHasStaffRole } from "@/lib/discord";

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({
      user: null,
      isStaff: false,
    });
  }

  const isStaff = await userHasStaffRole(session.discordAccessToken);

  return Response.json({
    user: session.user,
    isStaff,
  });
}