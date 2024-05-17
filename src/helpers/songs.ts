import { getClient } from "../helpers";
/*
 **
 **  Created By: niceEli & SPCFork
 **  License: MIT
 **
 **  Used In KaboomTS Before NGJS
 **
 */
async function getPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "text";
    xhr.onload = () => {
      if (xhr.status === 200) resolve(xhr.response);
      else reject(xhr.status);
    };
    xhr.send();
  });
}

const catchErr = async (e: any) => {
  let msg = "";
  let setMsg = (...t) => (msg = t.join(" "));

  setMsg(
    `Something went wrong!`,
    `Please check your internet connection and try again!`,
    `Error Code: ${e}`,
  );

  if (e === 404)
    setMsg(
      "The song could not be found!",
      "Please check the song id and try again!",
      "(error 404)",
    );

  return await Promise.reject(msg).catch((e) => e);
};

export default async function loadSoundID(id: string): Promise<ArrayBuffer> {
  if (!id) return Promise.reject("Song ID is empty!");

  let response: Awaited<ReturnType<typeof getPage>>;
  try {
    response = await getPage(
      `https://api.allorigins.win/get?url=https%3A%2F%2Fwww.newgrounds.com%2Faudio%2Flisten%2F${id}`,
    );
  } catch (error) {
    return await catchErr(error);
  }

  const resJson = JSON.parse(response);
  const data = resJson.contents;
  const code = resJson.status.http_code;

  if (code !== 200) return catchErr(code);

  let url = data;
  const chop = (start?: number, end?: number) => (url = url.substring(start, end));
  const chopIndOf = (ind: string, jump: number) => chop(url.indexOf(ind) + jump);

  chopIndOf("<![CDATA[", 9);
  chopIndOf("embedController([", 17);
  chop(0, url.indexOf('","'));
  chop(0, url.indexOf("?"));
  chopIndOf("url", 3);
  chopIndOf(':"', 2);
  url = url.replace(/\\\//g, "/");

  let songUrl = getClient().soundProxy + encodeURI(url);

  let songArray: ArrayBuffer;
  try {
    let request = await fetch(songUrl);
    songArray = await request.arrayBuffer();
  } catch (error) {
    return await catchErr(error);
  }

  return songArray;
}
