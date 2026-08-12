import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

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
      }

      if (profile?.id) {
        token.discordId = profile.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.discordId || token.sub;
      session.discordAccessToken = token.discordAccessToken;

      return session;
    },
  },
});