import{i as a,a as y,S as p}from"./assets/vendor-BjRz3xa9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();a.settings({position:"topRight",iconColor:"#fff",messageColor:"#fff"});async function h(s,t=1,i=20){const r="https://pixabay.com/api/?key="+"49598777-3dc21f1e795110eeeec900fde"+"&q="+encodeURIComponent(s)+"&image_type=photo&orientation=horizontal&safesearch=true&page="+t+"&per_page="+i;try{if(s=="")throw new Error("Please enter something!");const o=await y.get(r);if(o.data.hits==0)throw new Error("Sorry, there are no images matching your search query. Please, try again!");return{urls:[...o.data.hits],total:o.data.totalHits}}catch(o){return a.error({iconUrl:"img/error.svg",message:o.message}),[]}}let L=new p(".gallery a");function g(s,t){let i=s.map(n=>`
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
      </li>`).join("");t.insertAdjacentHTML("beforeend",i),L.refresh()}const e={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loading"),moreImgBtn:document.getElementById("moreImgBtn"),request:document.querySelector(".form input"),submitBtn:document.querySelector(".form button")};e.form.addEventListener("submit",b);let u=1,l=20,c="";async function b(s){s.preventDefault(),e.request.setAttribute("readonly",!0),e.submitBtn.disabled=!0,e.loader.classList.remove("hidden"),c=e.request.value.trim();try{const t=await h(c,u,l);if(e.request.removeAttribute("readonly"),e.submitBtn.disabled=!1,e.loader.classList.add("hidden"),!t||!t.urls||t.urls.length===0){e.gallery.innerHTML="",e.moreImgBtn.classList.add("hidden"),a.info({position:"topRight",message:"No images found. Please try a different search."});return}e.gallery.innerHTML="",e.request.value="",g(t.urls,e.gallery),f(t)}catch(t){console.error("Error fetching images:",t),e.request.removeAttribute("readonly"),e.submitBtn.disabled=!1,e.loader.classList.add("hidden"),a.error({position:"topRight",message:"An error occurred while fetching images. Please try again."})}}async function m(s){e.loader.classList.remove("hidden");try{const t=await h(c,++u,l);if(!t||!t.urls||t.urls.length===0){e.loader.classList.add("hidden"),e.moreImgBtn.classList.add("hidden"),a.info({position:"topRight",message:"No more images found."});return}const i=e.gallery.lastElementChild;g(t.urls,e.gallery),e.loader.classList.add("hidden"),f(t);const{top:n}=i.getBoundingClientRect();window.scrollBy({top:n-24,behavior:"smooth"})}catch(t){console.error("Error fetching more images:",t),e.loader.classList.add("hidden"),a.error({position:"topRight",message:"An error occurred while fetching more images. Please try again."})}}function f(s){!s||!s.urls||s.urls.length<l||s.total===u*l?(e.moreImgBtn.classList.add("hidden"),e.moreImgBtn.removeEventListener("click",m),a.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(e.moreImgBtn.classList.remove("hidden"),e.moreImgBtn.addEventListener("click",m))}
//# sourceMappingURL=index.js.map
