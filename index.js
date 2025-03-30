import{a as d,S as u,i as c}from"./assets/vendor-DVva8SYe.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function f(i){const o="https://pixabay.com/api/?key="+"49598777-3dc21f1e795110eeeec900fde"+"&q="+encodeURIComponent(i)+"&image_type=photo&orientation=horizontal&safesearch=true";return d.get(o).then(t=>[...t.data.hits])}let h=new u(".gallery a");function m(i,s){let o=i.map(t=>`
      <li>
        <a href="${t.largeImageURL}"><img src="${t.webformatURL}" alt="${t.tags}" width="360" height="200" /></a>
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
              <td>${t.likes}</td>
              <td>${t.views}</td>
              <td>${t.comments}</td>
              <td>${t.downloads}</td>
            </tr>
          </tbody>
        </table>
      </li>`).join("");s.innerHTML=o,h.refresh()}c.settings({position:"topRight",iconColor:"#fff",messageColor:"#fff"});const a=document.querySelector(".gallery"),n=document.querySelector(".form");n.addEventListener("submit",p);function p(i){i.preventDefault();const s=n.elements.request.value.trim();s!=""&&(a.innerHTML="",n.elements.request.setAttribute("readonly",!0),n.elements.button.disabled=!0,n.lastElementChild.classList.remove("hidden"),f(s).then(o=>{if(o.length!==0)n.elements.request.value="",m(o,a);else throw new Error("Sorry, there are no images matching your search query. Please, try again!")}).catch(o=>{c.error({iconUrl:"img/error.svg",message:o.message})}).finally(()=>{n.request.removeAttribute("readonly"),n.elements.button.disabled=!1,n.lastElementChild.classList.add("hidden")}))}
//# sourceMappingURL=index.js.map
