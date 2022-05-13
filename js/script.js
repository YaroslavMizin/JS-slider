let images =
    [{ url: "asset/1.jpg"},
    { url: "asset/2.jpg"},
    { url: "asset/3.jpg"},
    { url: "asset/4.jpg"},
    { url: "https://cdn.pixabay.com/photo/2020/02/16/20/29/nyc-4854718_960_720.jpg"},
    { url: "https://cdn.pixabay.com/photo/2017/01/06/17/28/road-1958388_960_720.jpg"}
];

function initSlider(options) {
    if(!images || !images.length) return;

    options = options || {
        titles: false,
        dot: true,
        autoplay: true,
      };

    let sliderImages = document.querySelector(".image-slider");
    let sliderButtons = document.querySelector(".buttons");
    let sliderNavigation = document.querySelector(".navigation");

    initImages();
    initButtons();

    if (options.dot) {
        initNavigation();
      }
      
      if (options.autoplay) {
        initAutoplay();
      }
    

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="image-slider n${index} ${index === 0 ? "active" : ""}
            "style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        });
    }

    function initButtons() {
        sliderButtons.querySelectorAll(".button").forEach(button => {
            button.addEventListener("click", function () {
                let activeSlide = +sliderImages.querySelector(".active").dataset.index;
                let nextSlide;
                if (button.classList.contains("left")) {
                    nextSlide = activeSlide === 0 ? images.length - 1 : activeSlide - 1;
                } else {
                    nextSlide = activeSlide === images.length - 1 ? 0 : activeSlide + 1;
                }
                moveSlide(nextSlide);
            });
        });
    }

    function initNavigation() {
        images.forEach((image, index) => {
            let dot = `<label class="dot-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></label>`;
            sliderNavigation.innerHTML += dot;
        });
        sliderNavigation.querySelectorAll(".dot-item").forEach(dot => {
            dot.addEventListener("click", function () {
                moveSlide(this.dataset.index);
            })
        })
    }

    function moveSlide(numb) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + numb).classList.add("active");
        sliderNavigation.querySelector(".active").classList.remove("active");
        sliderNavigation.querySelector(".n" + numb).classList.add("active");
    }
    
    function initAutoplay() {
        setInterval(() => {
          activeSlide = +sliderImages.querySelector(".active").dataset.index;
          nextSlide = activeSlide === images.length - 1? 0 : activeSlide + 1;
          moveSlide(nextSlide);
        }, options.autoplayInterval);
      }
}


let slideOptions = {
    dot: true,
    titles: false,
    autoplay: true,
    autoplayInterval: 5000
}

document.addEventListener("DOMContentLoaded", function(){
    initSlider(slideOptions);
});