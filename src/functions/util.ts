export function username(): string {
	const session = this.call("App.checkSession");

	return session?.result?.data?.session?.user?.name;
}

export function version(): string {
	const version = this.call("App.getCurrentVersion");

	return version?.result?.data?.current_version;
}

export function isSupporter(): boolean {
	const session = this.call("App.checkSession");

	return session?.result?.data?.session?.user?.supporter;
}
