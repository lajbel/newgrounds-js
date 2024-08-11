import { staticPlugin } from "kapcacher";
import { getClient } from "../helpers";
const CORS_API = getClient().soundProxy;
const SAFENG_IMG_API = `${CORS_API}https://www.newgrounds.com/art/view`;

const CACHE_NAME = "NGjs";
const CACHE_NS = "art";
const ngCache = new staticPlugin.Cacher(CACHE_NAME);

const toDataURL = (url: any) =>
    fetch(url)
        .then((response) => response.blob())
        .then(
            (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }),
        );

export async function getArtURI(
    artURI: string = "amyspark-ng/mrak-fanart",
    idx: number = 1,
): Promise<string | null> {
    let hiddenName: string = artURI + "\\" + idx.toString();
    if (!ngCache.initialized) await ngCache.init();

    let ns = ngCache.createNamespace(CACHE_NS);

    let res = await ns.get(hiddenName);
    if (res) {
        return res.text();
    }

    let imgNode: Node | null = null;

    // @@ Fetch Block
    {
        let uri = `${SAFENG_IMG_API}/${artURI}`;
        let ngDoc = await fetch(uri, { method: "GET" });

        let parser = new DOMParser();
        var doc = parser.parseFromString(await ngDoc.text(), "text/html");
    }

    let artRow = doc.querySelectorAll(".art-image-row").length > 0;

    let mediaBlockCenter = doc.querySelectorAll(".ng-img-container-sync");

    if (mediaBlockCenter.length > 0 && !artRow) {
        imgNode = mediaBlockCenter[idx - 1].children[0].children[0];

        let fMg = CORS_API + (imgNode as any)["src"];

        let fBsf = (await toDataURL(fMg)) as string | null;

        await ns.put(hiddenName, new Response(fBsf));
        return fBsf;
    }

    let hasMultiImage;

    if (artRow) {
        hasMultiImage = true;
    } else {
        hasMultiImage = false;
    }

    // @@ Payload Block
    let wholePl = hasMultiImage
        ? `/html/body/div[9]/div[6]/div/div/div/div[2]/div[1]/div[2]/div[1]/div/div[${idx.toString()}]/div/a`
        : `/html/body/div[9]/div[6]/div/div/div/div[2]/div[1]/div[2]/div[1]/a`;

    try {
        imgNode = doc.evaluate(
            wholePl,
            doc.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
        ).singleNodeValue;
    } catch (e) {
        throw new Error("Image source is null: " + e);
    }

    let imgSrc = (imgNode as any)?.["href"];

    let imageB: string | null = (await toDataURL(
        imgSrc ? CORS_API + encodeURI(imgSrc) : null,
    )) as string | null;

    await ns.put(hiddenName, new Response(imageB));

    return imageB;
}
