import{S as h,i as c}from"./assets/vendor-7659544d.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const l="/goit-js-hw-12/assets/icon-06de2d57.svg";function d(s){const t="https://pixabay.com/api/",r="42554621-2fa4a31fb360b145b3c1613f4",i=new URLSearchParams({key:r,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}),e=`${t}?${i}`;return fetch(e).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})}function p(s){return s.map(({webformatURL:t,largeImageURL:r,tags:i,likes:e,views:o,comments:n,downloads:m})=>`<li class="gallery-item">
                     <a href="${r}">
                        <img src="${t}" alt="${i}"/>
                        <div class="info-box">
                           <p class="info"><b>Likes</b> ${e}</p>
                           <p class="info"><b>Views</b> ${o}</p>
                           <p class="info"><b>Comments</b> ${n}</p>
                           <p class="info"><b>Downloads</b> ${m}</p>
                     </div>
                    </a>
                   </li>`).join("")}const f=document.querySelector("form"),u=document.querySelector("ul.gallery"),a=document.querySelector("span.loader");a.classList.remove("loader");function g(s){s.preventDefault(),u.innerHTML="";const t=s.currentTarget.elements.search.value.trim();t!==""&&(a.classList.add("loader"),d(t).then(r=>{a.classList.remove("loader"),r.hits.length!==0?(u.innerHTML=p(r.hits),new h(".gallery a",{captionsData:"alt",captionDelay:100}).refresh()):c.show({iconUrl:l,message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",color:"#FF6868",position:"topRight",progressBarColor:"#FFFFFF",close:!1,timeout:3e3})}).catch(r=>{c.show({iconUrl:l,message:"Sorry, there was an unexpected issue running your request!",messageColor:"#FFFFFF",color:"#FF6868",position:"topRight",progressBarColor:"#FFFFFF",close:!1,timeout:3e3}),console.error(r)})),f.reset()}f.addEventListener("submit",g);
//# sourceMappingURL=commonHelpers.js.map
