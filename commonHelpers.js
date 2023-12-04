import{a as u}from"./assets/vendor-e79added.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const n={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},y="https://pixabay.com/api",m="32131085-77c33ae4af62fbdfe36accafe";n.btnLoadMore.style.display="none";let c=1;n.form.addEventListener("submit",p);n.btnLoadMore.addEventListener("click",g);async function g(){const a=n.form.elements.searchQuery.value;c+=1,console.log(a);try{const e=await d({searchQuery:a});if(console.log(e),e.data.totalHits===0){notifyUser("Sorry, there are no images matching your search query. Please try again.");return}n.gallery.insertAdjacentHTML("beforeend",l(e.data.hits))}catch(e){console.error("Error loading more data:",e)}}async function p(a){a.preventDefault(),n.gallery.innerHTML="";const o=new FormData(a.currentTarget).get("searchQuery");await d({searchQuery:o})}async function d({searchQuery:a}){try{const e=new URLSearchParams({key:m,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:c,per_page:40}),o=await u.get(`${y}?${e}`);if(console.log(o),console.log(o.data),console.log(o.data.hits),o.data.totalHits===0){console.log("Sorry, there are no images matching your search query. Please try again.");return}else o.data.totalHits>40?(n.btnLoadMore.style.display="block",n.gallery.insertAdjacentHTML("beforeend",l(o.data.hits))):o.data.totalHits<=40&&(n.btnLoadMore.style.display="none",n.gallery.insertAdjacentHTML("beforeend",l(o.data.hits)),console.log("This is the last page"))}catch(e){console.error("Error fetching data:",e),console.log("Error details:",e.response)}finally{}}function l(a){return a.map(({webformatURL:e,largeImageURL:o,tags:i,likes:t,views:r,comments:s,downloads:f})=>`<div class="photo-card">
        <img src="${e}" alt="${i}" loading="lazy" width="150"/>
        <div class="info">
            <p class="info-item">
            <b>Likes: ${t}</b>
            </p>
            <p class="info-item">
            <b>Views: ${r}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${s}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${f}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
