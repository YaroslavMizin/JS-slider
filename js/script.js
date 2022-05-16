let images =
    [{ url: "asset/1.jpg"},
    { url: "asset/2.jpg"},
    { url: "asset/3.jpg"},
    { url: "asset/4.jpg"},
    { url: "https://cdn.pixabay.com/photo/2020/02/16/20/29/nyc-4854718_960_720.jpg"},
    { url: "https://cdn.pixabay.com/photo/2017/01/06/17/28/road-1958388_960_720.jpg"}
];

// функция работы слайдера

function initSlider(options) {
    if(!images || !images.length) return;

    options = options || {
        titles: false,
        dot: true,
        autoplay: true,
      };

// поиск родительских элементов по классам в переменные
    let sliderImages = document.querySelector(".image-slider");
    let sliderButtons = document.querySelector(".buttons");
    let sliderNavigation = document.querySelector(".navigation");

    // запуск функций

    initImages();
    initButtons();

    if (options.dot) {
        initNavigation();
      }
      
      if (options.autoplay) {
        initAutoplay();
      }
    
// декларация внутренних функций

    // добавление массива изображений
    function initImages() {
        images.forEach((image, index) => {
            // создание дочерних элементов с классом по индексу массива, добавление в дочерний элемент бэкграунда через стиль
            let imageDiv = `<div class="image-slider n${index} ${index === 0 ? "active" : ""}
            "style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            // добавление в родительский элемент всех дочерних элементов
            sliderImages.innerHTML += imageDiv;
        });
    }

    // функция работы кнопок
    function initButtons() {
        // добавление слушателя событий ко всем кнопкам от родительского элемента
        sliderButtons.querySelectorAll(".button").forEach(button => {
            button.addEventListener("click", function () {
                // поиск слайда с классом "active"
                let activeSlide = +sliderImages.querySelector(".active").dataset.index;
                // переменная для аргумента callback функции запуска в конце с условием
                let nextSlide;
                // для левой кнопки
                if (button.classList.contains("left")) {
                    // первый слайд к последнему
                    nextSlide = activeSlide === 0 ? images.length - 1 : activeSlide - 1;
                // для правой кнопки - последний слайд к первому
                } else {
                    nextSlide = activeSlide === images.length - 1 ? 0 : activeSlide + 1;
                }
                // запуск функции движения с аргументом от функции кнопок
                moveSlide(nextSlide);
            });
        });
    }

    // функция точек внизу слайдера
    function initNavigation() {
        // создание точек с сопряженным к классу атрибутом 
        images.forEach((image, index) => {
            let dot = `<label class="dot-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></label>`;
            sliderNavigation.innerHTML += dot;
        });
        // поиск созданных точек и вызов анонимной функции
        sliderNavigation.querySelectorAll(".dot-item").forEach(dot => {
            dot.addEventListener("click", function () {
                moveSlide(this.dataset.index);
            })
        })
    }

    // функция переключения слайдов + кнопок
    function moveSlide(numb) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + numb).classList.add("active");
        sliderNavigation.querySelector(".active").classList.remove("active");
        sliderNavigation.querySelector(".n" + numb).classList.add("active");
    }
    
    // функция автоматического переключения
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

// запуск функции

document.addEventListener("DOMContentLoaded", function(){
    initSlider(slideOptions);
});