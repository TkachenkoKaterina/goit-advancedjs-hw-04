import{a as m,S as y,i as c}from"./assets/vendor-f67ecabd.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();const h="https://pixabay.com/api/",b="32131085-77c33ae4af62fbdfe36accafe";async function d(s,o){return await m.get(`${h}?key=${b}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=40`)}const r={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};r.form.addEventListener("submit",M);r.btnLoadMore.addEventListener("click",L);r.btnLoadMore.style.display="none";let u=1;const n=40,p=new y(".gallery a",{captionsData:"alt",captionDelay:250});async function L(){u+=1;const s=r.form.elements.searchQuery.value;try{const{data:o}=await d(s,u);r.gallery.insertAdjacentHTML("beforeend",f(o.hits));let i=o.totalHits-n*(u-1);if(i>n){let t=i/n;c.info({title:"Go-on🤩",message:`${Math.ceil(t)} pages left`,position:"topRight",timeout:5e3,closeOnClick:!0})}else i<=n&&(r.btnLoadMore.style.display="none",console.log("This is the last page of Gallery"),c.warning({title:"Coool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}));p.refresh()}catch(o){console.log(o),console.log(o.message)}}async function M(s){s.preventDefault(),r.gallery.innerHTML="",u=1;const i=new FormData(s.currentTarget).get("searchQuery").trim();try{const{data:t}=await d(i,u);if(t.totalHits===0)c.error({title:"Ooooops",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:5e3,closeOnClick:!0});else if(t.totalHits>n){r.gallery.insertAdjacentHTML("beforeend",f(t.hits));let e=t.totalHits/n;c.info({title:"Go-on🤩",message:`Hooray! We found ${t.totalHits} images (${Math.ceil(e)} pages)`,position:"topRight",timeout:5e3,closeOnClick:!0}),r.btnLoadMore.style.display="block"}else t.totalHits<n&&(r.gallery.insertAdjacentHTML("beforeend",f(t.hits)),c.warning({title:"Cool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}),r.btnLoadMore.style.display="none");p.refresh()}catch(t){console.log(t),console.log(t.message)}}function f(s){return s.map(({webformatURL:o,largeImageURL:i,tags:t,likes:e,views:a,comments:l,downloads:g})=>`<div class="photo-card">
        <a href="${i}">
          <img src="${o}" alt="${t}" loading="lazy"/>
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${e}</b>
          </p>
          <p class="info-item">
            <b>Views: ${a}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${l}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${g}</b>
          </p>
        </div>
      </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
