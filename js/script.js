const lightbox = document.createElement("div")
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('.gallery-item img')

images.forEach(image => {
    image.addEventListener('click', e => {
        lightbox.classList.add('active')
        const img = document.createElement('img')
        img.src = image.dataset.full
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
    })
})

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})

const word = document.querySelector('.hero h1 .cycle-word')

const fonts = [
    'Fascinate',
    'Permanent Marker',
    'Rubik Marker Hatch',
    'Special Elite',
    'Abril Fatface',
    'Special Gothic Expanded One'
]

const colors = [
    '#6B2737',
    '#2C4A3E',
    '#1E3A5F',
    '#5C3D2E',
    '#4A3728',
    '#080607'
]

let intervalId = null

function playCycle() {
    if (intervalId) clearInterval(intervalId)
    let i = 0
    intervalId = setInterval(() => {
        word.style.fontFamily = `'${fonts[i]}', sans-serif`
        word.style.color = colors[i]
        i++
        if (i >= fonts.length) clearInterval(intervalId)
    }, 350)
}

if (word) {
    playCycle()
    word.closest('h1').addEventListener('mouseenter', playCycle)
}


const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('nav ul')
const backdrop = document.querySelector('.backdrop')

function openNav() {
    navMenu.classList.add('open');
    backdrop.classList.add('visible')
}

function closeNav () {
    navMenu.classList.remove('open')
    backdrop.classList.remove('visible')
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.contains('open') ? closeNav () : openNav()
    })

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeNav()
        }
    })
}

const featureCards = document.querySelectorAll('.feature-card')

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
        }
    })
}, { threshold: 0.2 })

featureCards.forEach(card => observer.observe(card))