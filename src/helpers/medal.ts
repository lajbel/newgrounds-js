import { getClient } from "../helpers";

export const unlockMedal = async (id: number) => {
    const medalUnlock = await getClient().call("Medal.unlock", { id });

    return medalUnlock.result.data.medal.unlocked;
};

export const getMedals = async () => {
    const medals = await getClient().call("Medal.getList");

    return medals.result.data.medals;
};
