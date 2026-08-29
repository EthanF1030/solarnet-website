import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { userHasStaffRole } from "@/lib/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: {
        params: {
          scope: "identify email guilds.members.read",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.discordAccessToken = account.access_token;

        try {
          token.isStaff = await userHasStaffRole(account.access_token);
        } catch (error) {
          console.error("Unable to check Discord staff role during login:", error);
          token.isStaff = false;
        }
      }

      if (profile?.id) {
        token.discordId = profile.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.discordId || token.sub;
        session.user.isStaff = token.isStaff === true;
      }

      session.discordAccessToken = token.discordAccessToken;

      return session;
    },
  },
});
