import{a as m,S as p,i as l}from"./assets/vendor-a57f9cde.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const h="https://pixabay.com/api/",b="32131085-77c33ae4af62fbdfe36accafe";async function d(s,o){return await m.get(`${h}?key=${b}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=40`)}const a={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};a.form.addEventListener("submit",M);a.btnLoadMore.addEventListener("click",L);a.btnLoadMore.style.display="none";let u=1;const n=40,f=new p(".gallery a",{captionsData:"alt",captionDelay:250});async function L(){u+=1;const s=a.form.elements.searchQuery.value;try{const{data:o}=await d(s,u);a.gallery.insertAdjacentHTML("beforeend",g(o.hits));let i=o.totalHits-n*(u-1);if(i>n){let e=i/n;l.info({title:"Go-on🤩",message:`${Math.ceil(e)} pages left`,position:"topRight",timeout:5e3,closeOnClick:!0})}else i<=n&&(a.btnLoadMore.style.display="none",console.log("This is the last page of Gallery"),l.warning({title:"Coool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}));f.refresh();const{height:t}=a.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(o){console.log(o),console.log(o.message)}}async function M(s){s.preventDefault(),a.gallery.innerHTML="",u=1;const i=new FormData(s.currentTarget).get("searchQuery").trim();console.log(i);try{if(i===""){a.btnLoadMore.style.display="none",l.warning({title:"Aaaaashhh😯",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:5e3,closeOnClick:!0});return}a.btnLoadMore.style.display="none";const{data:t}=await d(i,u);if(t.totalHits===0)l.error({title:"Ooooops",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:5e3,closeOnClick:!0});else if(t.totalHits>n){a.gallery.insertAdjacentHTML("beforeend",g(t.hits));let e=t.totalHits/n;l.info({title:"Go-on🤩",message:`Hooray! We found ${t.totalHits} images (${Math.ceil(e)} pages)`,position:"topRight",timeout:5e3,closeOnClick:!0}),a.btnLoadMore.style.display="block"}else t.totalHits<n&&(a.gallery.insertAdjacentHTML("beforeend",g(t.hits)),l.warning({title:"Cool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}),a.btnLoadMore.style.display="none");f.refresh()}catch(t){console.log(t),console.log(t.message)}}function g(s){return s.map(({webformatURL:o,largeImageURL:i,tags:t,likes:e,views:r,comments:c,downloads:y})=>`<div class="photo-card">
        <a href="${i}">
          <img src="${o}" alt="${t}" loading="lazy"/>
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${e}</b>
          </p>
          <p class="info-item">
            <b>Views: ${r}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${c}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${y}</b>
          </p>
        </div>
      </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
