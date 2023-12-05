import{a as f}from"./assets/vendor-e79added.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const u="https://pixabay.com/api/",m="32131085-77c33ae4af62fbdfe36accafe";async function p(a,r){return await f.get(`${u}?key=${m}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=40`)}const n={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};n.form.addEventListener("submit",y);n.btnLoadMore.style.display="none";let c=1;const i=40;async function y(a){a.preventDefault(),n.gallery.innerHTML="",c=1;const s=new FormData(a.currentTarget).get("searchQuery");console.log("searchQuery",s);try{const{data:t}=await p(s,c);if(console.log("data",t),n.gallery.insertAdjacentHTML("beforeend",g(t.hits)),t.totalHits>i){n.btnLoadMore.style.display="block";let e=t.totalHits/i;console.log(`Total pages = ${Math.ceil(e)}`)}else t.totalHits<i&&(n.btnLoadMore.style.display="none",console.log("This is the last page of Gallery"))}catch(t){console.log(t),console.log(t.message)}}function g(a){return a.map(({webformatURL:r,largeImageURL:s,tags:t,likes:e,views:o,comments:l,downloads:d})=>`<div class="photo-card">
        <img src="${r}" alt="${t}" loading="lazy" width="150"/>
        <div class="info">
            <p class="info-item">
            <b>Likes: ${e}</b>
            </p>
            <p class="info-item">
            <b>Views: ${o}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${l}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${d}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
