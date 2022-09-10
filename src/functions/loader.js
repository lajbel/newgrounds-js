export function loadAuthorUrl() {
    const session = this.call('Loader.loadAuthorUrl');

    return session?.result?.data;
};

export function getVersion() {
    const version = this.call('App.getCurrentVersion');

    return version?.result?.data?.current_version;
};

export function isSupporter() {
    const session = this.call('App.checkSession');

    return session?.result?.data?.session?.user?.supporter;
};