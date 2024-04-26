import { getClient } from "../helpers";

export const unlockMedal = async (id: number) => {
    const medalUnlock = await getClient().call("Medal.unlock", { id });

    return medalUnlock.result.data.medal.unlocked;
};
