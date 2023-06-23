import { Newgrounds, NewgroundsOpt } from "./types";

class NewgroundsConnection implements Newgrounds {
    constructor(appId: string, encryptionKey: string, opt: any) {
        this.appId = appId;
        this.encryptionKey = encryptionKey;
        this.options = opt;
    }

    CryptoJS: any;
    appId: string;
    encryptionKey: string;
    options: any;

    connect(appId: string, encryptionKey: string, config: NewgroundsOpt): void {
        throw new Error("Method not implemented.");
    }
}
