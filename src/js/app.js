const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}; 

const lockPaddingElements = document.querySelector("header");

function lockBody() {
    let paddingValue = window.innerWidth - document.documentElement.clientWidth;
    if (lockPaddingElements && paddingValue) {
        lockPaddingElements.style.paddingRight = paddingValue + "px"
    }
    document.body.classList.add("_lock")
}

function unlockBody () {
    if (lockPaddingElements) {
        lockPaddingElements.style.paddingRight = ""
    }
    document.body.classList.remove("_lock")
}

function openPopup(popup = undefined) {
    lockBody()
    if (popup) {
        popup.classList.add("popup--open")
    } else {
        console.log("Give me a popup")
    }
}

function closePopup(popup = null) {
    if (!popup) {
        popup = document.querySelector(".popup--open")
    }

    popup.classList.remove("popup--open");
    popup.addEventListener("transitionend", () =>  {
        if (!document.querySelector(".header__burger--open") && !document.querySelector(".header__submenu--open")) {
            unlockBody() 
        }

    }, {once: true})
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


// Валидация российского номер
function validateRuPhone(str) {
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        str
    );
}

function validateForm(form) {    
    const reqFiedls = form.querySelectorAll("[class$='input--required']")

    let errors = 0;
    for (let i = 0; i < reqFiedls.length; i++) {
        if (reqFiedls[i].getAttribute("name") === "name") {
            if (reqFiedls[i].value.trim() === "") {
                reqFiedls[i].closest(".form__control").classList.add("form__control--error");
                errors++;
            }
        }
        if (reqFiedls[i].getAttribute("name") === "phone") {
            if (reqFiedls[i].value.trim() === "" || reqFiedls[i].value.length < 18) {
                reqFiedls[i].closest(".form__control").classList.add("form__control--error");
                errors++;
            }
        }
        const emailField = form.querySelector("input[type='email']")

        if (reqFiedls[i].getAttribute("name") === "mail") {
            if (reqFiedls[i].value.trim() === "" || (reqFiedls[i].value.trim !== "" && !validateEmail(emailField.value))) {
                reqFiedls[i].closest(".form__control").classList.add("form__control--error");
                errors++;
            }
        }
    }

    if (errors) {
        console.log("Fill req fields");
    } else {
        form.classList.add("form--sending")
        form.querySelectorAll("input, textarea").forEach(formField => formField.disabled = true)
        setTimeout(() => {
            // changeContentPage(form)
            resetForm(form)
        }, 200)
    }

    function resetForm(form) {
        form.reset();
        form.classList.remove("form--sending")
        form.querySelectorAll(".form__control").forEach(controlEl => controlEl.className = "form__control")
        form.querySelectorAll("input, textarea").forEach(inputEl => inputEl.disabled = false)
    }
}


// device detection
// if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
//     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
//     isMobile = true;
// }

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

window.onload = function() {

    // Header
    const headerEl = document.querySelector(".header");
    const burgerMenuEl = headerEl.querySelector(".header__burger");
    const serviceMenuItemEl = headerEl.querySelector(".header__menu-item:first-child");
    const desktopSubmenuEl = serviceMenuItemEl.querySelector(".header__submenu");
    const mobileMenuEl = headerEl.querySelector(".header__menu--mobile")

    // breakpoints
    const tabletMediaQuery = window.matchMedia("(max-width: 992px)")
    const gapMediaQuery = window.matchMedia("(max-width: 768px)")
    // const callback = function(entries, observer) {
    //     // элемент в видимой части экрана
    //     // в данном случае это headerEl
    //     if (entries[0].isIntersecting) {
    //         headerEl.classList.remove("header_scroll")
    //     } else {
    //         // элемент пропал с видимой части экрана
    //         headerEl.classList.add("header_scroll")
    //     }
    // }

    // const headerObserver = new IntersectionObserver(callback)
    // headerObserver.observe(headerEl)


    serviceMenuItemEl.addEventListener("click", (e) => {
        if (e.target.closest(".submenu__backdrop")) {
            desktopSubmenuEl.className = "header__submenu header__submenu--close";
            desktopSubmenuEl.firstElementChild.addEventListener("transitionend", () => {
                unlockBody()
                desktopSubmenuEl.classList.remove("header__submenu--close")
            }, { once: true })

        } else if (!e.target.closest(".header__submenu")) {
            if (desktopSubmenuEl.classList.contains("header__submenu--open")) {
                desktopSubmenuEl.className = "header__submenu header__submenu--close";
                desktopSubmenuEl.firstElementChild.addEventListener("transitionend", () => {
                    unlockBody()
                    desktopSubmenuEl.classList.remove("header__submenu--close")
                }, { once: true })
            } else if (!desktopSubmenuEl.classList.contains("header__submenu--close")) {
                lockBody()
                desktopSubmenuEl.classList.add("header__submenu--open")
            }
        }
    })

    burgerMenuEl.addEventListener("click", () => {
        if (burgerMenuEl.classList.contains("header__burger--open")) {
            unlockBody()
            Array.from(mobileMenuEl.querySelectorAll(".header__menu-item._open")).forEach(el => {
                el.classList.remove("_open")
            })
            mobileMenuEl.classList.remove("header__menu--submenu-open")
        } else {
            lockBody()
        }
        
        burgerMenuEl.classList.toggle("header__burger--open")
        mobileMenuEl.classList.toggle("header__menu--open")
    })

    let timeoutId;
    mobileMenuEl.querySelector(".header__menu-item:first-child").addEventListener("click", (e) => {
        const menuEl = e.currentTarget
        const submenuEl = menuEl.querySelector(".submenu")
        const submenuListEl = submenuEl.firstElementChild

        if (e.target.closest(".header__submenu")) {
            return
        }

        if (menuEl.classList.contains("_open")) {
            let submenuElHeight = submenuEl.scrollHeight;
            submenuEl.style.height = submenuElHeight + "px";
            menuEl.classList.remove("_open")
            timeoutId = setTimeout(() => submenuEl.style.height = "")
        } else {
            clearTimeout(timeoutId)
            timeoutId = null
            menuEl.classList.add("_open");
            submenuEl.style.height = submenuListEl.offsetHeight + "px";
            submenuEl.addEventListener("transitionend", () => {
                if (timeoutId) {
                    return
                }
                submenuEl.style.height = "auto"
            }, { once: true })
        }
    })


    const mobileMenuListEl = mobileMenuEl.querySelector("ul")
    const mobileSubmenuEl = mobileMenuEl.querySelector(".submenu")

    mobileSubmenuEl.addEventListener("click", e => {

        const currentHeight = mobileMenuListEl.offsetHeight
        let submenuEl = null;
        
        if ((e.target.classList.contains("submenu__item") || e.target.classList.contains("submenu__link") && e.target.closest(".submenu__item").childElementCount === 2)) {
            mobileMenuEl.classList.add("header__menu--submenu-open")
            submenuEl = e.target.parentElement.lastElementChild;
            mobileMenuListEl.style.height = `${currentHeight}px`;
            setTimeout(() => mobileMenuListEl.style.height = `${submenuEl.offsetHeight}px`)
            submenuEl.style.cssText = `
                transform: none;
            `
        }

        if (e.target.closest(".submenu__back-button")) {
            submenuEl = e.target.closest(".submenu__menu");
            mobileMenuEl.classList.remove("header__menu--submenu-open")
            mobileMenuListEl.style.height = `${currentHeight}px`;
            setTimeout(() => {
                mobileMenuListEl.style.height = `${mobileMenuListEl.scrollHeight}px`
                submenuEl.style = ``
                mobileMenuListEl.addEventListener("transitionend", () => {
                    mobileMenuListEl.style = ""
                }, { once: true })
            })
        }
    })

    function replaceButton(e) {
        const buttonEl = headerEl.querySelector(".header__button");
        
        if (e.matches) {
            mobileMenuEl.querySelector(".header__actions").append(buttonEl)
        } else {
            headerEl.querySelector(".header__actions").append(buttonEl)
        }
    }

    function replaceCity(e) {
        const cityEl = headerEl.querySelector(".header__city")

        if (e.matches) {
            mobileMenuEl.querySelector(".header__actions").append(cityEl)
        } else {
            headerEl.querySelector(".header__main").append(cityEl)
        }
    }

    tabletMediaQuery.addEventListener("change", replaceButton)
    gapMediaQuery.addEventListener("change", replaceCity)

    replaceButton(tabletMediaQuery)
    replaceCity(gapMediaQuery)


    // SERVICES
    document.querySelector(".services__list").addEventListener("click", e => {
        const currentServiceItem = e.target.closest(".service")
        const MIN_HEIGHT = 180

        if (!currentServiceItem || currentServiceItem.classList.contains("_animating") || window.innerWidth < 769) {
            return
        }

        const descEl = currentServiceItem.querySelector(".service__desc")
        const imageEl = currentServiceItem.querySelector(".service__image")
        let maxHeight = null;

        currentServiceItem.classList.add("_animating")

        maxHeight = Math.max(descEl.scrollHeight, MIN_HEIGHT)
        descEl.style.height = `${maxHeight}px`

        if (currentServiceItem.classList.contains("service--open")) {
            imageEl.style.opacity = ""
            
            imageEl.addEventListener("transitionend", () => {
                currentServiceItem.classList.remove("service--open")
                descEl.style.height = ``
                descEl.addEventListener("transitionend", () => {
                    currentServiceItem.classList.remove("_animating")
                }, { once: true })
            }, { once: true })

        } else {
            descEl.addEventListener("transitionend", () => {
                currentServiceItem.classList.add("service--open")
                descEl.style.height = "auto"
                imageEl.style.opacity = "1"

                imageEl.addEventListener("transitionend", () => {
                    currentServiceItem.classList.remove("_animating")
                }, { once: true })
            }, { once: true })
        }
        // currentServiceItem.classList.toggle("service--open")
    })

    document.querySelectorAll("input[name='phone']").forEach(inputElement => {
        inputElement.addEventListener("keypress", (e) => {
            const length = e.target.value.length;
            if (e.charCode < 48 || e.charCode > 57 || length > 14) {
                e.preventDefault();
                return;
            }
    
            switch (length) {
                case 0: 
                    e.target.value = "8 " ;
                    break;
                case 5:
                case 9:
                case 12:
                    e.target.value += " ";
                    break;
                default:
                    break;
            }
        })
        inputElement.addEventListener("input", e => {e.target.value.length === 2 && (e.target.value = "")})
    })

    const faqItemHeaderEls = document.querySelectorAll(".accordion__header");
    faqItemHeaderEls.forEach(faqItemHeaderEl => {
        let timeoutId;
        faqItemHeaderEl.addEventListener("click", e => {
            const faqItemEl = faqItemHeaderEl.parentElement;
            const faqItemBodyEl = faqItemHeaderEl.nextElementSibling;
            const faqItemTextEl = faqItemBodyEl.firstElementChild;

            if (faqItemEl.classList.contains("accordion--open")) {
                let faqItemBodyHeight = faqItemBodyEl.scrollHeight;
                faqItemBodyEl.style.height = faqItemBodyHeight + "px";
                faqItemEl.classList.remove("accordion--open")
                timeoutId = setTimeout(() => faqItemBodyEl.style.height = "")
            } else {
                clearTimeout(timeoutId)
                timeoutId = null
                faqItemEl.classList.add("accordion--open");
                faqItemBodyEl.style.height = faqItemTextEl.offsetHeight + "px";
                faqItemBodyEl.addEventListener("transitionend", () => {
                    if (timeoutId) {
                        return
                    }
                    faqItemBodyEl.style.height = "auto"
                }, { once: true })
            }
        })
    })

    // FORMs
    const inputEls = document.querySelectorAll(".form__input")
    const phoneInputEls = document.querySelectorAll(".form__input[name='phone']")
    const nameInputEls = document.querySelectorAll(".form__input[name='name']")
    const inputControlClass = "form__control"

    Array.from(inputEls).forEach(inputEl => {
        let inputControlEl = inputEl.closest("." + inputControlClass)

        inputEl.addEventListener("input", () => {
            if (inputControlEl.classList.contains(inputControlClass + "--error")) {
                inputControlEl.classList.remove(inputControlClass + "--error")
            }
        })

        inputEl.addEventListener("change", () => {
            if (inputEl.value.trim() !== "") {
                inputControlEl.classList.add("form__control--filled")
            } else {
                inputControlEl.classList.remove("form__control--filled")
            }
        })
    })

    Array.from(phoneInputEls).forEach(inputEl => {
        inputEl.addEventListener("keypress", (e) => {
            const length = e.target.value.length;
            if (e.charCode < 48 || e.charCode > 57 || length > 17) {
                e.preventDefault();
                return;
            }
                switch (length) {
                case 0: 
                    e.target.value = "+7 (" ;
                    break;               
                case 7:
                    e.target.value += ")-";
                    break;
                case 12:
                case 15:
                    e.target.value += "-";
                    break;
                default:
                    break;
            }
        })
        inputEl.addEventListener("input", e => {e.target.value.length === 3 && (e.target.value = "")})
    })

    Array.from(nameInputEls).forEach(inputEl => {
        inputEl.addEventListener("keypress", (e) => {
            const length = e.target.value.length;
            if (e.charCode >= 48 && e.charCode <= 57) {
                e.preventDefault();
                return;
            }
        })
    })

    for (let i = 0; i < document.forms.length; i++) {
        document.forms[i].addEventListener("submit", e => {
            e.preventDefault();
            validateForm(e.target)
        })
    }

    document.querySelector(".form__file-input")?.addEventListener("change", e => {
        if (e.target.files[0].size > 100 * 1024 * 1024) {
            alert("Размер файла не должен превышать 30 MB")
            return
        }
        const parentEl = e.target.closest(".form__file");
        parentEl.querySelector(".form__file-doc .text").innerHTML = e.target.files[0].name
        parentEl.classList.add("form__file_attached")
        parentEl.querySelector(".form__file-doc button").addEventListener("click", () => {
            e.target.value = "";
            parentEl.classList.remove("form__file_attached")
        }, { once: true })
    })


    // POPUPs
    document.querySelectorAll(".popup__close").forEach(closeEl => {
        let popupEl = closeEl.closest(".popup")
        closeEl.addEventListener("click", () => closePopup(popupEl))
    })
    
    document.querySelectorAll(".popup").forEach(
        popupEl => popupEl.addEventListener("click", e => {
            if (!e.target.closest(".popup__content")) {
                closePopup(popupEl)
            }
        })
    )
    
    document.addEventListener("keydown", (e) => {
        if (e.which === 27) {
            closePopup()
        }
    })

        // article text
        if (document.querySelector(".article")) {
            const articleEl = document.querySelector(".article");
            const articleTextEl = articleEl.querySelector(".article__text");
            const readMoreButtonEl = articleEl.querySelector(".article__more");
            const maxHeight = parseFloat(getComputedStyle(articleTextEl).maxHeight)
        
            function changeElemHeight(elem) {
                const buttonTextEl = elem.querySelector("span")
                const className = elem.classList[1];
                if (elem.classList.contains(className + "--open")) {
                    elem.classList.remove(className + "--open")
                    buttonTextEl.innerHTML = "Читать полностью"
                } else {
                    elem.classList.add(className + "--open")
                    buttonTextEl.innerHTML = "Свернуть текст"
                }
            }
        
            function checkElemHeight(elem) {
                const className = elem.classList[1];
                const textEl = articleTextEl;
                const readMoreEl = readMoreButtonEl;
        
                if (textEl.offsetHeight < textEl.scrollHeight) {
                    !elem.classList.contains(className + "--hide") && elem.classList.add(className + "--hide")
                } else {
                    if (!elem.classList.contains(className + "--open")) {
                        // elem.className = className
                        elem.classList.remove(`${className}--hide`);
                    } else if (textEl.offsetHeight <= maxHeight) {
                        // elem.className = className
                        elem.classList.remove(`${className}--hide`);
                        elem.classList.remove(`${className}--open`);
                        readMoreEl.querySelector("span").innerHTML = "Читать полностью"
                    }
                } 
            }
    
        
            checkElemHeight(articleEl);
        
            readMoreButtonEl.addEventListener("click", () => changeElemHeight(articleEl))
        
            window.addEventListener("resize", () => {
                checkElemHeight(articleEl)
            })
        }

    if (window.Swiper) {

        // hero
        let heroThumbSwiper = new Swiper(".hero__thumb-swiper", {
            slidesPerView: "auto",
            spaceBetween: 5,
        })
        let heroGallerySwiper = new Swiper(".hero__gallery-swiper", {
            slidesPerView: 1,
            speed: 800,
            loop: true,
            effect: "fade",
            crossFade: true,
            thumbs: {
                swiper: heroThumbSwiper,
            },
        })
        let heroContentSwiper = new Swiper(".hero__content-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            loop: true,
            navigation: {
                nextEl: ".hero__thumb-swiper .swiper-button-next",
                prevEl: ".hero__thumb-swiper .swiper-button-prev",
            },
        })

        heroGallerySwiper.controller.control = heroContentSwiper
        heroContentSwiper.controller.control = heroGallerySwiper

    
        new Swiper(".advantages__swiper", {
            slidesPerView: "auto",
            spaceBetween: 10,
            // slidesOffsetBefore: 10,
            // slidesOffsetAfter: 10,
            wathcOverflow: true,
            breakpoints: {
                768: {
                    spaceBetween: 15
                }
            }
        })

        let projectsThumbSwiper = new Swiper(".projects__thumb-swiper", {
            slidesPerView: "auto",
            spaceBetween: 5,
        })
        
        let projectsSwiper = new Swiper(".projects__projects-swiper", {
            slidesPerView: 1,
            spaceBetween: 10,
            wathcOverflow: true,
            thumbs: {
                swiper: projectsThumbSwiper,
            },
        })
    }
}