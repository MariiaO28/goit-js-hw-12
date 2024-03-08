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

hideLoader();
hideButton();

 const lightbox = new SimpleLightbox(".gallery a", {
       captionsData: "alt",
       captionDelay: 100,
 });

async function handleSearchSubmit(event) {
    event.preventDefault(); 
    gallery.innerHTML = "";
    console.clear();
    hideButton();
    getValue = event.currentTarget.elements.search.value.trim();

    if (getValue !== "") {
        showLoader();
        page = 1;
        try {
            const data = await fetchPhotos(getValue, 15, page);
            if (data.totalHits !== 0) {
                hideLoader();
                  gallery.innerHTML = renderPhotos(data.hits);
                  showButton();
                  lightbox.refresh();
            } else {
                handleNoResults();
            }
            lastPageResultInfo(data.totalHits);
            }
        catch (error) {
            handleFetchError(error);
        }
    };
    searchForm.reset();
}

async function onloadMore() {
    showLoader();
    hideButton();
    page += 1;

    try {
        const data = await fetchPhotos(getValue, 15, page);
        hideLoader();
        const newPhotosHTML = renderPhotos(data.hits);
        gallery.insertAdjacentHTML('beforeend', newPhotosHTML);
        showButton();
        fetchPhotosBtn.parentNode.insertBefore(loading, fetchPhotosBtn.nextSibling);
        lightbox.refresh();
        lastPageResultInfo(data.totalHits);
        smoothScroll();
    } catch (error) {
        handleFetchError(error);
    }
}

async function lastPageResultInfo(totalHits) {
    if (totalHits <= page * 15) {
        hideButton();
        showEndOfResultsMessage();
    }
}

function smoothScroll() {
    const elem = document.querySelector(".gallery-item");
    const rect = elem.getBoundingClientRect();
    window.scrollBy({
        top: rect.height * 3,
        behavior: "smooth",
    });
}

function showButton() {
    fetchPhotosBtn.classList.remove("is-hidden");
}

function hideButton() {
    fetchPhotosBtn.classList.add("is-hidden");
}

function showLoader() {
    loading.classList.add("loader");
}

function hideLoader() {
    loading.classList.remove("loader");
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
    hideLoader();
}

function handleFetchError() {
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
    hideLoader()
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