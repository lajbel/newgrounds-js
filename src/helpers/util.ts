import { getClient } from "../helpers";

export const getUsername = async () => {
    const session = await getClient().call("App.checkSession");

    return session?.result?.data?.session?.user?.name;
};

export const getSession = async () => {
    const session = await getClient().call("App.checkSession");

    return session?.result?.data?.session;
};

export const getVersion = async () => {
    const version = await getClient().call("App.getCurrentVersion");

    return version?.result?.data?.current_version;
};

export const isSupporter = async () => {
    const session = await getClient().call("App.checkSession");

    return session?.result?.data?.session?.user?.supporter;
};

export const isLoggedIn = async () => {
    const session = await getClient().call("App.checkSession");

    return session?.result?.data?.session?.user == null ? false : true;
};

export const isOnNewgrounds = () => {
    return globalThis.location.hostname === "uploads.ungrounded.net"
        || globalThis.location.hostname === "newgrounds.com";
};

export const ping = async () => {
    return (await getClient().call("Gateway.ping")).result.data.pong;
};

export const autoPing = async (ms: number = 5000) => {
    setInterval(() => {
        ping();
    }, ms);
};
