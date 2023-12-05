import{a as p,S as y,i as c}from"./assets/vendor-f67ecabd.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const h="https://pixabay.com/api/",b="32131085-77c33ae4af62fbdfe36accafe";async function u(a,i){return await p.get(`${h}?key=${b}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&page=${i}&per_page=40`)}const r={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};r.form.addEventListener("submit",M);r.btnLoadMore.addEventListener("click",L);r.btnLoadMore.style.display="none";let d=1;const n=40,f=new y(".gallery a",{captionsData:"alt",captionDelay:250});async function L(){d+=1;const a=r.form.elements.searchQuery.value;try{const{data:i}=await u(a,d);r.gallery.insertAdjacentHTML("beforeend",g(i.hits));let s=i.totalHits-n*(d-1);if(s>n){let e=s/n;c.info({title:"Go-on🤩",message:`${Math.ceil(e)} pages left`,position:"topRight",timeout:5e3,closeOnClick:!0})}else s<=n&&(r.btnLoadMore.style.display="none",console.log("This is the last page of Gallery"),c.warning({title:"Coool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}));f.refresh();const{height:t}=r.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(i){console.log(i),console.log(i.message)}}async function M(a){a.preventDefault(),r.gallery.innerHTML="",d=1;const s=new FormData(a.currentTarget).get("searchQuery").trim();try{const{data:t}=await u(s,d);if(t.totalHits===0)r.btnLoadMore.style.display="none",c.error({title:"Ooooops",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:5e3,closeOnClick:!0});else if(t.totalHits>n){r.gallery.insertAdjacentHTML("beforeend",g(t.hits));let o=t.totalHits/n;c.info({title:"Go-on🤩",message:`Hooray! We found ${t.totalHits} images (${Math.ceil(o)} pages)`,position:"topRight",timeout:5e3,closeOnClick:!0}),r.btnLoadMore.style.display="block"}else t.totalHits<n&&(r.gallery.insertAdjacentHTML("beforeend",g(t.hits)),c.warning({title:"Cool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}),r.btnLoadMore.style.display="none");f.refresh();const{height:e}=r.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch(t){console.log(t),console.log(t.message)}}function g(a){return a.map(({webformatURL:i,largeImageURL:s,tags:t,likes:e,views:o,comments:l,downloads:m})=>`<div class="photo-card">
        <a href="${s}">
          <img src="${i}" alt="${t}" loading="lazy"/>
        </a>
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
            <b>Downloads: ${m}</b>
          </p>
        </div>
      </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
