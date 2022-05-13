let images =
    [{ url: "asset/1.jpg", title: "blue" },
    { url: "asset/2.jpg", title: "forest" },
    { url: "asset/3.jpg", title: "ocean" },
    { url: "asset/4.jpg", title: "cold forest" },];

function initSlider(options) {
    options = options || {
        titles: false,
        dot:true,
    }
    let sliderImages = document.querySelector(".image-slider");
    let sliderButtons = document.querySelector(".buttons");
    let sliderNavigation = document.querySelector(".navigation");

    initImages();
    initButtons();
    initNavigation();

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
            let dot = `<label class="dot-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></label>`;
            sliderNavigation.innerHTML +=dot;
        });
        sliderNavigation.querySelectorAll(".dot-item").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlide(this.dataset.index);
                sliderNavigation.querySelector(".active").classList.remove("active");
                this.classList.add("active");
            })
        })
    }

    function moveSlide(numb) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n"+numb).classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", initSlider);