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

let i = 0
const interval = setInterval(() => {
    word.style.fontFamily = `'${fonts[i]}', sans-serif`
    i++
    if (i >= fonts.length) {
        clearInterval(interval)
    }
}, 350)

const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('nav ul')

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open')
})

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open')
    }
})