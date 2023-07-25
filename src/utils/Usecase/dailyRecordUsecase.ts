import { dailyRecordRepo } from '../Repo/dailyRecordRepo';
import { usersRepo } from '../Repo/usersRepo';

export const dailyRecordUsecase = {
  getDailyRecordsAll: async () => {
    const allRecord = await dailyRecordRepo.getDailyRecordsAll();
    return allRecord;
  },
  getDailyRecordsByUserId: async (discordId: bigint) => {
    const userId = await usersRepo.getUserIdByDiscordId(discordId);
    if (userId === undefined) {
      return null;
    }
    const userRecords = await dailyRecordRepo.getDailyRecordsByUserId(userId);
    return userRecords;
  },
};
