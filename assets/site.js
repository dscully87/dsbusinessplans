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

  /* masthead clock — local time, minute precision */
  var clocks=document.querySelectorAll("[data-clock]");
  if(clocks.length){
    var tick=function(){
      var d=new Date();
      var hh=String(d.getHours()).padStart(2,"0");
      var mm=String(d.getMinutes()).padStart(2,"0");
      clocks.forEach(function(el){ el.textContent="Local "+hh+":"+mm; });
    };
    tick();
    setInterval(tick,30000);
  }

  /* scroll reveal */
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

  /* section rail scroll-spy */
  var rail=document.querySelector(".rail");
  if(rail && "IntersectionObserver" in window){
    var links={};
    rail.querySelectorAll('a[href^="#"]').forEach(function(a){
      links[a.getAttribute("href").slice(1)]=a;
    });
    var setCurrent=function(id){
      Object.keys(links).forEach(function(k){
        if(k===id){ links[k].setAttribute("aria-current","true"); }
        else{ links[k].removeAttribute("aria-current"); }
      });
    };
    var spy=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ setCurrent(e.target.id); }
      });
    },{rootMargin:"-20% 0px -70% 0px"});
    Object.keys(links).forEach(function(id){
      var sec=document.getElementById(id);
      if(sec){ spy.observe(sec); }
    });
  }
})();
