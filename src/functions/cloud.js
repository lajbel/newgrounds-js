export function clearSlot(id) {
    this.call("CloudSave.clearSlot", { id });
}

export function getCloudData(id) {
    const slot = this.call("CloudSave.loadSlot", { id }, false);
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", slot?.result?.data?.slot?.url, false);
    xmlhttp.send();

    if (xmlhttp.status == 200) {
        return xmlhttp.responseText;
    } else return "nope.";
}

export function setCloudData(id, value) {
    return this.call("CloudSave.setData", { id, data: value });
}
