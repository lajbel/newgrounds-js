interface NewgroundsConf {
    showPopUps: boolean,
    showDescriptions: boolean,
    medalTime: number,
    debug: boolean
};

interface Session {
    expired: boolean,
    id: string,
    passport_url: string,
    remember: boolean,
    user: User
}

interface User {
    icons: UserIcons,
    tag: string,
    value: number,
    supporter: true
};

interface UserIcons {
    large: string,
    medium: string,
    small: string
};

interface Score {
    formated_value: string,
    tag: string,
    value: number
};