import{a as y}from"./assets/vendor-e79added.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/",g="32131085-77c33ae4af62fbdfe36accafe";async function d(a,t){return await y.get(`${m}?key=${g}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=20`)}const s={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};s.form.addEventListener("submit",h);s.btnLoadMore.addEventListener("click",p);s.btnLoadMore.style.display="none";let c=1;const l=20;async function p(){c+=1;const a=s.form.elements.searchQuery.value;console.log(a);try{const{data:t}=await d(a,c);s.gallery.insertAdjacentHTML("beforeend",f(t.hits));let n=t.totalHits-l*(c-1);if(n>l){let o=n/l;console.log(`Total pages = ${Math.ceil(o)}`)}else n<=l&&(s.btnLoadMore.style.display="none",console.log("This is the last page of Gallery"))}catch(t){console.log(t),console.log(t.message)}}async function h(a){a.preventDefault(),s.gallery.innerHTML="",c=1;const n=new FormData(a.currentTarget).get("searchQuery").trim();console.log("searchQuery",n);try{const{data:o}=await d(n,c);if(s.gallery.insertAdjacentHTML("beforeend",f(o.hits)),o.totalHits>l){s.btnLoadMore.style.display="block";let e=o.totalHits/l;console.log(`Total pages = ${Math.ceil(e)}`)}else o.totalHits<l&&(s.btnLoadMore.style.display="none",console.log("This is the last page of Gallery"))}catch(o){console.log(o),console.log(o.message)}}function f(a){return a.map(({webformatURL:t,largeImageURL:n,tags:o,likes:e,views:r,comments:i,downloads:u})=>`<div class="photo-card">
        <img src="${t}" alt="${o}" loading="lazy" width="150"/>
        <div class="info">
            <p class="info-item">
            <b>Likes: ${e}</b>
            </p>
            <p class="info-item">
            <b>Views: ${r}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${i}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${u}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
