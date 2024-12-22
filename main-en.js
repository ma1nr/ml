
window.addEventListener('load', () => {
        document.querySelector('.preloader-container').style.display = 'none';
        mainHeroTl.play();
    })




const header = document.querySelector('.hero-header');
const servicesName = ['In the footsteps of Yakub Kolas', 'Yanka Kupala and Minsk', 'Maxim Bogdanovich', 'Minsk in works'];
let serviceIndex = 0;
window.addEventListener('load', () => {
    setInterval(() => {
        header.classList.add('hero-header-hide');

    }, 3200);
    setInterval(() => {
        if (serviceIndex > servicesName.length - 1) {
            serviceIndex = 0
        }
        header.innerHTML = servicesName[serviceIndex];
        serviceIndex++
        header.classList.remove('hero-header-hide')
    }, 3500);
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

var x = window.matchMedia("(max-width: 970px)")
myFunction(x) 
x.addListener(myFunction) 


const mainHeroTl = gsap.timeline({ paused: true, defaults: { duration: 1 } })
mainHeroTl.from('.main-nav', { opacity: 0, y: -200 })
    .from('.quck-contact-phone-location, .quick-contact-logos', { y: -100, opacity: 0 }, '-=.1')
    .from('.content-container', { y: '10%', opacity: 0 }, '-=.1')



