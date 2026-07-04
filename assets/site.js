(function(){
  var root=document.documentElement;
  var stored=localStorage.getItem("ds-theme");
  if(stored){ root.setAttribute("data-theme",stored); }

  function current(){
    var t=root.getAttribute("data-theme");
    if(t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function(btn){
    btn.textContent=current()==="dark" ? "Light" : "Dark";
    btn.addEventListener("click",function(){
      var next=current()==="dark" ? "light" : "dark";
      root.setAttribute("data-theme",next);
      localStorage.setItem("ds-theme",next);
      btn.textContent=next==="dark" ? "Light" : "Dark";
    });
  });

  if(window.matchMedia("(prefers-reduced-motion: no-preference)").matches && "IntersectionObserver" in window){
    var els=document.querySelectorAll("[data-reveal]");
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add("in-view"); io.unobserve(e.target); }
      });
    },{threshold:0.1,rootMargin:"0px 0px -40px 0px"});
    els.forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function(el){ el.classList.add("in-view"); });
  }
})();
