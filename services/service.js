const serviceSelectorBtns = document.querySelectorAll('.service-btn-container');
const serviceBtnIcons = document.querySelectorAll('.service-btn-icon i');
const serviceBtnHeaderContainer = document.querySelectorAll('.service-btn-header');
const serviceBtnHeader = document.querySelectorAll('.service-btn-header h2');


function classRemover(elementsName, className) {
    elementsName.forEach((c) => {
        c.classList.remove(className);
    })
}

function classAdder(elementsName, className) {
    elementsName.forEach((c) => {
        c.classList.add(className);
    })
}


const serviceCards = document.querySelectorAll('.services-service-card');
serviceCards.forEach((card) => {
    if (card.classList.contains('SchedualServices')) {
        true
    } else {
        card.classList.add('card-hide');
    }
})

serviceSelectorBtns.forEach((btn, i) => {
    
    btn.addEventListener('click', () => {
        classRemover(serviceBtnIcons, 'active')
        serviceBtnIcons[i].classList.add('active')
        classRemover(serviceBtnHeaderContainer, 'active')
        serviceBtnHeaderContainer[i].classList.add('active')
        classRemover(serviceBtnHeader, 'active')
        serviceBtnHeader[i].classList.add('active')

        
        const headerText = document.querySelector('.services-service-header');
        headerText.innerHTML = btn.innerText
        headerText.classList.add('active')
        setTimeout(() => {
            headerText.classList.remove('active')
        }, 1200)

        
        let attName = btn.getAttribute('data-serviceType');
        serviceCards.forEach((card) => {
            if (card.classList.contains(attName)) {
                


                
                card.classList.remove('project-hide');
                setTimeout(() => {
                    card.classList.remove('card-hide');
                }, 600)
            } else {
                card.classList.add('project-hide');
                setTimeout(() => {
                    card.classList.add('card-hide');

                }, 600)
            }
        });

    })
})




window.addEventListener('load', () => {
        document.querySelector('.preloader-container').style.display = 'none';
        mainHeroTl.play();
    })
    
const quickNavBar = document.querySelector('.quick-contact-nav');
const mainNavBar = document.querySelector('.main-nav');
let lastScroll = 100;
window.addEventListener('scroll', function() {
    let currentscroll = window.pageYOffset
    if (currentscroll > lastScroll) {
        quickNavBar.classList.add('quick-contact-nav-hide');
        mainNavBar.classList.add('main-nav-active');
    } else {
        quickNavBar.classList.remove('quick-contact-nav-hide');
        mainNavBar.classList.remove('main-nav-active');
    }
    if (currentscroll == 0) {
        mainNavBar.classList.remove('main-nav-active-back-ground')
    } else {
        mainNavBar.classList.add('main-nav-active-back-ground')
    }
    lastScroll = currentscroll
});



function myFunction(x) {
    if (x.matches) { 
        
        const mainBurger = document.querySelector('.burger-container');
        const burgerLines = document.querySelectorAll('.burger-line');
        const mainNavTl = gsap.timeline({ paused: true, reversed: true, defaults: { duration: .6, ease: 'power1.out' } })
        mainNavTl.to('.nav-link-container', { x: 0 })
            .from('.nav-link-container li', { x: '-100px', opacity: 0, stagger: .2 });

        mainBurger.addEventListener('click', () => {
            burgerLines[0].classList.toggle('line1')
            burgerLines[1].classList.toggle('line2')
            burgerLines[2].classList.toggle('line3')
            if (mainNavTl.reversed() == true) {
                mainNavTl.play()
            } else {
                mainNavTl.timeScale(1.5)
                mainNavTl.reverse();
            }
        });
        

        
        const quickBurgerBtn = document.querySelector('.quick-burger');
        const quickBurgerLines = document.querySelectorAll('.quick-burger-dot');
        const quickBurgerTl = gsap.timeline({ paused: true, reversed: true, defaults: { duration: .6, ease: 'power1.out' } })
        quickBurgerTl.to('.quick-contact-nav', { height: 230, scaleY: 1 })
            .from('.saperator', { scaleX: 0 })
            .from('.quck-contact-phone-location, .quick-contact-logos', { y: '-20%', opacity: 0 });


        quickBurgerBtn.addEventListener('click', () => {
            quickBurgerLines[0].classList.add('quick-burger-dot-1');
            quickBurgerLines[2].classList.add('quick-burger-dot-3');
            setTimeout(() => {
                quickBurgerLines[0].classList.remove('quick-burger-dot-1');
                quickBurgerLines[2].classList.remove('quick-burger-dot-3');
            }, 300);
            if (quickBurgerTl.reversed() == true) {
                quickBurgerTl.play();
            } else {
                quickBurgerTl.timeScale(1.5);
                quickBurgerTl.reverse();
            }
        });
        
        window.addEventListener('scroll', () => {
            quickBurgerTl.timeScale(1.5);
            quickBurgerTl.reverse();
            mainNavTl.timeScale(1.5)
            mainNavTl.reverse();
            burgerLines[0].classList.remove('line1')
            burgerLines[1].classList.remove('line2')
            burgerLines[2].classList.remove('line3')
        })

    }
}

const mainHeroTl = gsap.timeline({ paused: true, defaults: { duration: 1 } })
mainHeroTl.from('.main-nav', { opacity: 0, y: -200 })
    .from('.intro', { y: -100, opacity: 0 }, '-=.1')
    .from('.content-container', { y: '10%', opacity: 0 }, '-=.1')

const btnUp = {
      el: document.querySelector('.btn-up'),
      show() {
        // удалим у кнопки класс btn-up_hide
        this.el.classList.remove('btn-up_hide');
      },
      hide() {
        // добавим к кнопке класс btn-up_hide
        this.el.classList.add('btn-up_hide');
      },
      addEventListener() {
        // при прокрутке содержимого страницы
        window.addEventListener('scroll', () => {
          // определяем величину прокрутки
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
          scrollY > 400 ? this.show() : this.hide();
        });
        // при нажатии на кнопку .btn-up
        document.querySelector('.btn-up').onclick = () => {
          // переместим в начало страницы
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    }
    btnUp.addEventListener();


