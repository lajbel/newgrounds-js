import { NewgroundsClient } from "./client";

export let client: NewgroundsClient | null = null;

export const getClient = (): NewgroundsClient => {
    if (!client) throw new Error("Client not initialized");

    return client;
};

export const setClient = (newClient: NewgroundsClient) => (client = newClient);