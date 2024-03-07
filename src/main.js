'use strict';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import icon from "./img/icon.svg";

import { fetchPhotos } from './js/pixabay-api.js';
import { renderPhotos } from './js/render-functions.js';

const searchForm = document.querySelector('form');
const gallery = document.querySelector('ul.gallery');
const loading = document.querySelector('span.loader');
const fetchPhotosBtn = document.querySelector('[data-action="load-more"]');

let page;
let getValue;

loading.classList.remove("loader");
fetchPhotosBtn.classList.add("is-hidden");

 const lightbox = new SimpleLightbox(".gallery a", {
       captionsData: "alt",
       captionDelay: 100,
 });

async function handleSearchSubmit(event) {
    event.preventDefault(); 
    gallery.innerHTML = "";
    fetchPhotosBtn.classList.add("is-hidden");
    getValue = event.currentTarget.elements.search.value.trim();

    if (getValue !== "") {
        loading.classList.add("loader");
        page = 1;
        try {
            const data = await fetchPhotos(getValue, 15, page);
            if (data.totalHits !== 0) {
                  loading.classList.remove("loader");
                  gallery.innerHTML = renderPhotos(data.hits);
                  fetchPhotosBtn.classList.remove("is-hidden");
                  lightbox.refresh();
            } else {
                handleNoResults();
                }
            }
        catch (error) {
            handleFetchError(error);
        }
    };
    searchForm.reset();
}

async function onloadMore() {
    loading.classList.add("loader");
    fetchPhotosBtn.classList.add("is-hidden");
    page += 1;

    try {
        const data = await fetchPhotos(getValue, 15, page);
        loading.classList.remove("loader");
        const newPhotosHTML = renderPhotos(data.hits);
        gallery.insertAdjacentHTML('beforeend', newPhotosHTML);
        fetchPhotosBtn.classList.remove("is-hidden");
        fetchPhotosBtn.parentNode.insertBefore(loading, fetchPhotosBtn.nextSibling);
        lightbox.refresh();
        lastPageResultInfo(data.totalHits);
        slowScroll();
    } catch (error) {
        handleFetchError(error);
    }
}

async function lastPageResultInfo(totalHits) {
    if (totalHits <= page * 15) {
        fetchPhotosBtn.classList.add("is-hidden");
        showEndOfResultsMessage();
    }
}

function slowScroll() {
    const elem = document.querySelector(".gallery-item");
    const rect = elem.getBoundingClientRect();
    window.scrollBy({
        top: rect.height * 3,
        behavior: "smooth",
    });
}


function handleNoResults() {
    iziToast.show({
        iconUrl: icon,
        message: `Sorry, there are no images matching your search query. Please try again!`,
        messageColor: "#FFFFFF",
        color: "#FF6868",
        position: "topRight",
        progressBarColor: "#FFFFFF",
        close: false,
        timeout: 3000
    });
    loading.classList.remove("loader");
}

function handleFetchError(error) {
    console.error(error);
    iziToast.error({
        iconUrl: icon,
        message: `Sorry, there was an unexpected issue running your request!`,
        messageColor: "#FFFFFF",
        color: "#FF6868",
        position: "topRight",
        progressBarColor: "#FFFFFF",
        close: false,
        timeout: 3000
    });
    loading.classList.remove("loader");
}

function showEndOfResultsMessage() {
    iziToast.show({
        iconUrl: icon,
        message: `We're sorry, but you've reached the end of search results`,
        messageColor: "#FFFFFF",
        color: "#1E81B0",
        position: "topRight",
        progressBarColor: "#FFFFFF",
        close: false,
        timeout: 3000
    });
}

searchForm.addEventListener("submit", handleSearchSubmit);
fetchPhotosBtn.addEventListener("click", onloadMore);