export function getUsername() {
    const session = this.call('App.checkSession');

    return session?.result?.data?.session?.user?.name;
};

export function getVersion() {
    const version = this.call('App.getCurrentVersion');

    return version?.result?.data?.current_version;
};

export function isSupporter() {
    const session = this.call('App.checkSession');

    return session?.result?.data?.session?.user?.supporter;
};