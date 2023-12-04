import{a as l}from"./assets/vendor-19a64109.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const s={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery")},f="https://pixabay.com/api",u="32131085-77c33ae4af62fbdfe36accafe";s.form.addEventListener("submit",d);function d(a){a.preventDefault(),s.gallery.innerHTML="";const r={};new FormData(a.currentTarget).forEach((n,e)=>{r[e]=n}),m(r),s.btnSearch.disabled=!0}async function m({searchQuery:a}){const r=new URLSearchParams({key:u,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0});return l.get(`${f}?${r}`).then(o=>{if(o.data.total===0){console.log("Sorry, there are no images matching your search query. Please try again.");return}else o.data.total>0&&(console.log("More 1"),console.log(o.data.hits),s.gallery.innerHTML=y(o.data.hits))}).catch(o=>{console.error("Error fetching data:",o)}).finally(()=>{s.btnSearch.disabled=!1})}function y(a){return a.map(({webformatURL:r,largeImageURL:o,tags:n,likes:e,views:t,comments:i,downloads:c})=>`<div class="photo-card">
        <img src="${r}" alt="${n}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes: ${e}</b>
            </p>
            <p class="info-item">
            <b>Views: ${t}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${i}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${c}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
