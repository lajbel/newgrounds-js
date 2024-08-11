import { getClient } from "../helpers";
const CORS_API = getClient().soundProxy;
const SAFENG_IMG_API = `${CORS_API}https://www.newgrounds.com/art/view`;

export async function getArtURI(
    artURI: string = "amyspark-ng/mrak-fanart",
    idx: number = 1,
): Promise<string | null> {
    let imgNode: Node | null = null;

    // @@ Fetch Block
    {
        let uri = `${SAFENG_IMG_API}/${artURI}`;
        let ngDoc = await fetch(uri, { method: "GET" });

        let parser = new DOMParser();
        var doc = parser.parseFromString(await ngDoc.text(), "text/html");
    }

    let artRow = doc.querySelectorAll(".art-image-row").length > 0;

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

    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

    let imageB: string | null = (await toDataURL(imgSrc ? getClient().soundProxy + encodeURI(imgSrc) : null)) as string | null;

    return imageB;
}
