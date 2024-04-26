import { getClient } from "../helpers";

export const loadAuthorUrl = async () => {
    const session = await getClient().call("Loader.loadAuthorUrl");

    return session.result.data;
};
