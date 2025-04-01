import{i as a,a as g,S as y}from"./assets/vendor-BjRz3xa9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();a.settings({position:"topRight",iconColor:"#fff",messageColor:"#fff"});async function m(s,e=1,i=15){const r="https://pixabay.com/api/?key="+"49598777-3dc21f1e795110eeeec900fde"+"&q="+encodeURIComponent(s)+"&image_type=photo&orientation=horizontal&safesearch=true&page="+e+"&per_page="+i;try{if(s=="")throw new Error("Please enter something!");const o=await g.get(r);if(o.data.hits==0)throw new Error("Sorry, there are no images matching your search query. Please, try again!");return{urls:[...o.data.hits],total:o.data.totalHits}}catch(o){return a.error({iconUrl:"img/error.svg",message:o.message}),[]}}let p=new y(".gallery a");function h(s,e){if(!s||s.length===0){e.innerHTML="";return}let i=s.map(n=>`
      <li>
        <a href="${n.largeImageURL}"><img src="${n.webformatURL}" alt="${n.tags}" width="360" height="200" /></a>
        <table class="caption">
          <thead>
            <tr>
              <th>Likes</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${n.likes}</td>
              <td>${n.views}</td>
              <td>${n.comments}</td>
              <td>${n.downloads}</td>
            </tr>
          </tbody>
        </table>
      </li>`).join("");e.insertAdjacentHTML("beforeend",i),p.refresh()}const t={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loading"),moreImgBtn:document.getElementById("moreImgBtn"),request:document.querySelector(".form input"),submitBtn:document.querySelector(".form button")};t.form.addEventListener("submit",b);let l,d=15,u;async function b(s){s.preventDefault(),t.request.setAttribute("readonly",!0),t.submitBtn.disabled=!0,t.loader.classList.remove("hidden"),l=1,u=t.request.value.trim();try{const e=await m(u,l,d);if(console.log(e),t.request.removeAttribute("readonly"),t.submitBtn.disabled=!1,t.loader.classList.add("hidden"),!e||!e.urls||e.urls.length===0){t.gallery.innerHTML="",t.moreImgBtn.classList.add("hidden");return}t.gallery.innerHTML="",t.request.value="",h(e.urls,t.gallery),f(e)}catch(e){console.error("Error fetching images:",e),a.error({position:"topRight",message:"An error occurred while fetching images."}),t.loader.classList.add("hidden"),t.request.removeAttribute("readonly"),t.submitBtn.disabled=!1}}async function L(s){t.loader.classList.remove("hidden");try{const e=await m(u,++l,d);if(!e||!e.urls||e.urls.length===0){t.loader.classList.add("hidden");return}const i=t.gallery.lastElementChild;h(e.urls,t.gallery),t.loader.classList.add("hidden"),f(e);const{top:n}=i.getBoundingClientRect();window.scrollBy({top:n-24,behavior:"smooth"})}catch(e){console.error("Error fetching more images:",e),a.error({position:"topRight",message:"An error occurred while fetching more images."}),t.loader.classList.add("hidden")}}function f(s){s.urls.length<d||s.total===l*d?(t.moreImgBtn.classList.add("hidden"),a.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(t.moreImgBtn.classList.remove("hidden"),t.moreImgBtn.addEventListener("click",L))}
//# sourceMappingURL=index.js.map
