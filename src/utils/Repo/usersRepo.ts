import { PrismaClient } from '@prisma/client';

export const usersRepo = {
  getUserIdByDiscordId: async (discordId: bigint) => {
    const prisma = new PrismaClient();
    const user = await prisma.users.findFirst({
      where: {
        user_discord_id: discordId,
      },
    });
    return user?.user_id;
  },
};
