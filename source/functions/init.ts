export function init(appID: string, encryptionKey: string = null, conf?: NewgroundsConf = {}) {
    this.appID = appID;
    this.encryptionKey = encryptionKey;
    this.debug = conf.debug;

    this.conf = conf;
};