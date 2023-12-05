import{a as m,i as c}from"./assets/vendor-2dcf4ad5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const p="https://pixabay.com/api/",y="32131085-77c33ae4af62fbdfe36accafe";async function d(a,o){return await m.get(`${p}?key=${y}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=40`)}const s={form:document.querySelector("#search-form"),btnSearch:document.querySelector("button[type = submit]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};s.form.addEventListener("submit",b);s.btnLoadMore.addEventListener("click",h);s.btnLoadMore.style.display="none";let u=1;const n=40;async function h(){u+=1;const a=s.form.elements.searchQuery.value;console.log(a);try{const{data:o}=await d(a,u);s.gallery.insertAdjacentHTML("beforeend",f(o.hits));let i=o.totalHits-n*(u-1);if(i>n){let t=i/n;c.info({title:"Go-on🤩",message:`${Math.ceil(t)} pages left`,position:"topRight",timeout:5e3,closeOnClick:!0})}else i<=n&&(s.btnLoadMore.style.display="none",console.log("This is the last page of Gallery"),c.warning({title:"Coool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}))}catch(o){console.log(o),console.log(o.message)}}async function b(a){a.preventDefault(),s.gallery.innerHTML="",u=1;const i=new FormData(a.currentTarget).get("searchQuery").trim();console.log("searchQuery",i);try{const{data:t}=await d(i,u);if(t.totalHits===0)c.error({title:"Ooooops",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:5e3,closeOnClick:!0});else if(t.totalHits>n){s.gallery.insertAdjacentHTML("beforeend",f(t.hits)),s.btnLoadMore.style.display="block";let e=t.totalHits/n;c.info({title:"Go-on🤩",message:`Hooray! We found ${t.totalHits} images (${Math.ceil(e)} pages)`,position:"topRight",timeout:5e3,closeOnClick:!0})}else t.totalHits<n&&(s.gallery.insertAdjacentHTML("beforeend",f(t.hits)),s.btnLoadMore.style.display="none",c.warning({title:"Cool 😸",message:"This is the last page of Gallery",position:"topRight",timeout:5e3,closeOnClick:!0}))}catch(t){console.log(t),console.log(t.message)}}function f(a){return a.map(({webformatURL:o,largeImageURL:i,tags:t,likes:e,views:r,comments:l,downloads:g})=>`<div class="photo-card">
        <img src="${o}" alt="${t}" loading="lazy" width="150"/>
        <div class="info">
            <p class="info-item">
            <b>Likes: ${e}</b>
            </p>
            <p class="info-item">
            <b>Views: ${r}</b>
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
