
document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".mobile-btn"), menu=document.querySelector(".menu");
 if(toggle) toggle.addEventListener("click",()=>menu.classList.toggle("open"));
 document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
   document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
   const f=btn.dataset.filter; document.querySelectorAll(".product-item").forEach(card=>{
     card.style.display=(f==="all"||card.dataset.category===f)?"block":"none";
   });
 }));
 const search=document.querySelector("#productSearch");
 if(search) search.addEventListener("input",e=>{let q=e.target.value.toLowerCase();document.querySelectorAll(".product-item").forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?"block":"none")});
 document.querySelectorAll("form").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();let n=form.querySelector(".notice");if(n){n.style.display="block";form.reset();}}));

 // Home page image slider
 const slides = document.querySelectorAll(".hero-slider .slide");
 const dots = document.querySelectorAll(".slider-dot");
 let currentSlide = 0;
 let sliderTimer;

 function showSlide(index){
   if(!slides.length) return;
   currentSlide = (index + slides.length) % slides.length;
   slides.forEach((slide,i)=>slide.classList.toggle("active",i===currentSlide));
   dots.forEach((dot,i)=>dot.classList.toggle("active",i===currentSlide));
 }

 function nextSlide(){ showSlide(currentSlide + 1); }
 function restartSlider(){
   clearInterval(sliderTimer);
   if(slides.length > 1) sliderTimer = setInterval(nextSlide, 5000);
 }

 const nextBtn = document.querySelector(".slider-arrow.next");
 const prevBtn = document.querySelector(".slider-arrow.prev");

 if(nextBtn) nextBtn.addEventListener("click",()=>{nextSlide();restartSlider();});
 if(prevBtn) prevBtn.addEventListener("click",()=>{showSlide(currentSlide - 1);restartSlider();});
 dots.forEach((dot,i)=>dot.addEventListener("click",()=>{showSlide(i);restartSlider();}));

 restartSlider();

});
