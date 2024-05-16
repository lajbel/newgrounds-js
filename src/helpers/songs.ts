/*
**  
**  Created By: niceEli
**  License: MIT
**  
**  Used In KaboomTS Before NGJS
**  
*/


export async function loadSoundID(id: string | number): Promise<ArrayBuffer> {
  async function getPage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "text";
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.status);
        }
      };
      xhr.send();
    });
  }

  if (!id) {
    return Promise.reject("Song ID is empty!");
  }

  try {
    const response = await getPage(
      `https://api.allorigins.win/get?url=https%3A%2F%2Fwww.newgrounds.com%2Faudio%2Flisten%2F${id}`
    );
    const data = JSON.parse(response).contents;
    const code = JSON.parse(response).status.http_code;

    if (code !== 200) {
      if (code === 404) {
        return Promise.reject(
          "The song could not be found! Please check the song id and try again! (error 404)"
        );
      }
      return Promise.reject(
        `Something went wrong! Please check your internet connection and try again! Error Code: ${code}`
      );
    }

    let url = data.substring(data.indexOf("<![CDATA[") + 9);
    url = url.substring(url.indexOf("embedController([") + 17);
    url = url.substring(0, url.indexOf('","'));
    url = url.substring(0, url.indexOf("?"));
    url = url.substring(url.indexOf("url") + 3);
    url = url.substring(url.indexOf(':"') + 2);
    url = url.replace(/\\\//g, "/");

    let songUrl = `https://cors.niceeli.workers.dev/?${encodeURI(url)}`;

    let songArray: ArrayBuffer;
    songArray = await (await (await fetch(songUrl)).blob()).arrayBuffer();
    return songArray;
  } catch (error) {
    if (error === 404) {
      return Promise.reject(
        "The song could not be found! Please check the song id and try again! (error 404)"
      );
    }
    return Promise.reject(
      `Something went wrong! Please check your internet connection and try again! Error Code: ${error}`
    );
  }
}