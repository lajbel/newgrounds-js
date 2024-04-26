import { getClient } from "../helpers";

export const getUsername = async () => {
    const session = await getClient().call("App.checkSession");

    return session?.result?.data?.session?.user?.name;
};

export const getVersion = async () => {
    const version = await getClient().call("App.getCurrentVersion");

    return version?.result?.data?.current_version;
};

export const isSupporter = async () => {
    const session = await getClient().call("App.checkSession");

    return session?.result?.data?.session?.user?.supporter;
};
