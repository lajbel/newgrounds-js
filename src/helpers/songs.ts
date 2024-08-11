import { staticPlugin } from "kapcacher";
import { getClient } from "../helpers";

const CACHE_NAME = "NGjs";
const CACHE_NS = "songs";
const ngCache = new staticPlugin.Cacher(CACHE_NAME);

async function prepareCache() {
    if (!ngCache.initialized) await ngCache.init();
}

function getPage(url: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        await prepareCache();
        const ns = ngCache.createNamespace(CACHE_NS);
        const res = await ns.get(url) as Response;

        if (res) return resolve(res.text());
        function handleCacheRes(res: string) {
            ns.put(url, new Response(res));
            resolve(res);
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "text";
        xhr.onload = () => {
            if (xhr.status === 200) handleCacheRes(xhr.response);
            else reject(xhr.status);
        };
        xhr.send();
    });
}

export async function loadSoundID(id: string): Promise<ArrayBuffer> {
    if (!id) return Promise.reject("Song ID is empty!");

    const catchErr = (e: any) => {
        if (e === 404) {
            return Promise.reject(
                "The song could not be found! Please check the song id and try again! (error 404)",
            );
        }

        return Promise.reject(
            `Something went wrong! Please check your internet connection and try again! Error Code: ${e}`,
        );
    };

    let response: Awaited<ReturnType<typeof getPage>>;
    try {
        response = await getPage(
            `https://api.allorigins.win/get?url=https%3A%2F%2Fwww.newgrounds.com%2Faudio%2Flisten%2F${id}`,
        );
    } catch (error) {
        return await catchErr(error).catch((e) => e);
    }

    const resJson = JSON.parse(response);
    const data = resJson.contents;
    const code = resJson.status.http_code;

    if (code !== 200) return catchErr(code);

    let url = data.substring(data.indexOf("<![CDATA[") + 9);
    url = url.substring(url.indexOf("embedController([") + 17);
    url = url.substring(0, url.indexOf("\",\""));
    url = url.substring(0, url.indexOf("?"));
    url = url.substring(url.indexOf("url") + 3);
    url = url.substring(url.indexOf(":\"") + 2);
    url = url.replace(/\\\//g, "/");

    let songUrl = getClient().soundProxy + encodeURI(url);

    let songArray: ArrayBuffer;
    try {
        let request = await fetch(songUrl);
        songArray = await request.arrayBuffer();
    } catch (error) {
        return await catchErr(error).catch((e) => e);
    }

    return songArray;
}
