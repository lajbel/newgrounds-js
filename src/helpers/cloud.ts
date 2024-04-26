import { getClient } from "../helpers";

export const clearSlot = async (id: number) => {
    const slotResponse = await getClient().call("CloudSave.clearSlot", { id });

    return slotResponse.result.data.slot;
};

export const getCloudData = async (id: number) => {
    const slot = await getClient().call("CloudSave.loadSlot", { id });
    const slotUrl = slot.result.data.slot.url;

    if (!slotUrl) return "";

    try {
        const slotData = await fetch(slotUrl, {
            method: "GET",
            mode: "cors",
        });

        return await slotData.text();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};

export const setCloudData = async (id: number, data: string) => {
    const slotResponse = await getClient().call("CloudSave.setData", { id, data });

    return slotResponse.result.data.slot;
};
