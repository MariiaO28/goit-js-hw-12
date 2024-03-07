import axios from "axios";

export async function fetchPhotos(getValue, amount = 15, page = 1) {

    const resp = await axios.get("https://pixabay.com/api/", {
        params: {
          key: "42554621-2fa4a31fb360b145b3c1613f4",
          q: getValue,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          page: page,
          per_page: amount,
        }
    });

    return resp.data
}