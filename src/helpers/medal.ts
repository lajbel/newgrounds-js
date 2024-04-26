import { getClient } from "../helpers";

export const unlockMedal = async (id: number) => {
    getClient.call("Medal.unlock", { id });
};
