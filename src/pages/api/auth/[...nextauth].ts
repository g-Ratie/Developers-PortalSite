import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

async function isJoinGuild(accessToken: string): Promise<boolean> {
  const res: Response = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.ok) {
    const guilds = await res.json();
    return guilds.some((guild: { id: string }) => guild.id === '805487335914864640');
  }
  return false;
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: { scope: 'identify email guilds' },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    /**
     * sessionにaccessTokenと、user.idを追加
     */
    session: async ({ session, token }) => {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }
      if (session.user && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
    /**
     * jwtにaccessTokenと、profile.idを追加
     */
    jwt: async ({ token, account, profile }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = profile.id;
      }
      return token;
    },
    signIn: async ({ account }) => {
      if (account === null || account.access_token === undefined) return false;
      return await isJoinGuild(account.access_token);
    },
    // ログイン後のリダイレクト先
    redirect: async ({ baseUrl }) => {
      return `${baseUrl}/status`;
    },
  },
  pages: {
    error: '/autherror',
  },
};

export default NextAuth(authOptions);
