const galleryItems = document.querySelectorAll('.gallery-item')

const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible')
            }, index * 60)
            itemObserver.unobserve(entry.target)
        }
    })
}, { threshold: 0.1 })

galleryItems.forEach(item => itemObserver.observe(item))


const lightbox = document.createElement("div")
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('.gallery-item img')
let currentIndex = 0
const imageList = Array.from(images)

function getVisibleImages() {
    return imageList.filter(img => img.closest('.gallery-item').style.display !== 'none')
}

function openLightbox(index, visibleList = getVisibleImages()) {
    currentIndex = index
    const image = visibleList[index]
    lightbox.classList.add('active')

    lightbox.innerHTML = `
        <button class="lb-btn lb-prev">&#10094;</button>
        <img src="${image.dataset.full}" alt="${image.alt}">
        <button class="lb-btn lb-next">&#10095;</button>
    `

    lightbox.querySelector('.lb-prev').addEventListener('click', (e) => {
        e.stopPropagation()
        const visible = getVisibleImages()
        currentIndex = (currentIndex - 1 + visible.length) % visible.length
        openLightbox(currentIndex, visible)
    })

    lightbox.querySelector('.lb-next').addEventListener('click', (e) => {
        e.stopPropagation()
        const visible = getVisibleImages()
        currentIndex = (currentIndex + 1) % visible.length
        openLightbox(currentIndex, visible)
    })
}

images.forEach((image) => {
    image.addEventListener('click', () => {
        const visible = getVisibleImages()
        const visibleIndex = visible.indexOf(image)
        openLightbox(visibleIndex, visible)
    })
})

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active')
})

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return
    const visible = getVisibleImages()
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + visible.length) % visible.length
        openLightbox(currentIndex, visible)
    }
    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % visible.length
        openLightbox(currentIndex, visible)
    }
    if (e.key === 'Escape') lightbox.classList.remove('active')
})


// Filters
const filterBtns = document.querySelectorAll('.filter-btn')
const allItems = document.querySelectorAll('.gallery-item')
const toggles = document.querySelectorAll('.filter-group__toggle')

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const group = toggle.closest('.filter-group')
        const isOpen = group.classList.contains('open')

        // Close all groups first
        document.querySelectorAll('.filter-group').forEach(g => g.classList.remove('open'))

        // Toggle clicked group
        if (!isOpen) group.classList.add('open')
    })
})

// Close groups when clicking outside
document.addEventListener('click', e => {
    if (!e.target.closest('.filter-group')) {
        document.querySelectorAll('.filter-group').forEach(g => g.classList.remove('open'))
    }
})

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')

        const category = btn.dataset.category
        const sub = btn.dataset.sub

        allItems.forEach(item => {
            const categoryMatch = category === 'all' || item.dataset.category === category
            const subMatch = sub === 'all' || item.dataset.sub === sub
            item.style.display = categoryMatch && subMatch ? '' : 'none'
        })

        // Close groups after selecting
        document.querySelectorAll('.filter-group').forEach(g => g.classList.remove('open'))
    })
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

let intervalId = null

function playCycle() {
    if (intervalId) clearInterval(intervalId)
    let i = 0
    intervalId = setInterval(() => {
        word.style.fontFamily = `'${fonts[i]}', sans-serif`
        i++
        if (i >= fonts.length) clearInterval(intervalId)
    }, 500)
}

if (word) {
    playCycle()
    word.closest('h1').addEventListener('mouseenter', playCycle)
}

const navLinks = document.querySelectorAll('nav ul li a')

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active')
    }
})

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

const marquee = document.querySelector('.marquee')

const marqueeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            marqueeObserver.unobserve(entry.target)
        }
    })
}, { threshold: 0.1 })

if (marquee) marqueeObserver.observe(marquee)

    document.addEventListener('DOMContentLoaded', function() {

        // ========== DATE PICKER - DISABLE PAST DATES ==========
        const dateInput = document.getElementById('preferred-date');
        if (dateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            
            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const day = String(tomorrow.getDate()).padStart(2, '0');
            
            dateInput.min = `${year}-${month}-${day}`;
        }

        // ========== CONTACT NUMBER - STRIP NON-NUMERIC ==========
        const contactInput = document.getElementById('contact');
        if (contactInput) {
            contactInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d+]/g, '');
            });
        }

        // ========== PIERCING PLACEMENTS DATA ==========
        const piercingPlacements = {
            ear: ['Earlobe', 'Helix', 'Auricle', 'Flat', 'Conch', 'Tragus', 'Snug', 'Rook', 'Daith', 'Forward Helix', 'Industrial', 'Tunnel (10mm)'],
            facial: ['Nostril', 'Septum', 'Eyebrow', 'Medusa', 'Ashley', 'Labret', 'Cheek'],
            body: ['Tongue', 'Navel', 'Nipple', 'Dermal']
        };

        // ========== SHOW/HIDE SUB-OPTIONS BASED ON SERVICE ==========
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function() {
                document.querySelectorAll('.form-sub').forEach(el => el.style.display = 'none');
                const map = {
                    tattoo: 'sub-tattoo',
                    piercing: 'sub-piercing',
                    henna: 'sub-henna'
                };
                if (map[this.value]) {
                    document.getElementById(map[this.value]).style.display = 'block';
                }
                const piercingPlacementGroup = document.getElementById('piercing-placement-group');
                const piercingType = document.getElementById('piercing-type');
                if (piercingPlacementGroup) piercingPlacementGroup.style.display = 'none';
                if (piercingType) piercingType.value = '';
            });
        }

        // ========== SHOW PIERCING PLACEMENTS BASED ON TYPE ==========
        const piercingType = document.getElementById('piercing-type');
        if (piercingType) {
            piercingType.addEventListener('change', function() {
                const placements = piercingPlacements[this.value];
                const select = document.getElementById('piercing-placement');
                const group = document.getElementById('piercing-placement-group');

                if (!placements || !select || !group) return;

                select.innerHTML = '<option value="" disabled selected>Select placement</option>';
                placements.forEach(p => {
                    const opt = document.createElement('option');
                    opt.textContent = p;
                    select.appendChild(opt);
                });
                group.style.display = 'block';
            });
        }

        // ========== FORM VALIDATION AND SUBMIT ==========
        const formSubmit = document.getElementById('formSubmit');
        if (formSubmit) {
            formSubmit.addEventListener('click', () => {
                const fname = document.getElementById('fname')?.value.trim() || '';
                const lname = document.getElementById('lname')?.value.trim() || '';
                const contact = document.getElementById('contact')?.value.trim() || '';
                const email = document.getElementById('email')?.value.trim() || '';
                const service = document.getElementById('service')?.value || '';
                const preferredDate = document.getElementById('preferred-date')?.value || '';

                const phoneRegex = /^(09|\+639|0?9)\d{9}$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!fname || !lname) { alert('Please enter your full name.'); return; }
                if (!phoneRegex.test(contact)) { alert('Please enter a valid PH number (e.g. 09XXXXXXXXX).'); return; }
                if (!emailRegex.test(email)) { alert('Please enter a valid email address.'); return; }
                if (!service) { alert('Please select a service.'); return; }
                if (!preferredDate) { alert('Please select a preferred date.'); return; }

                if (service === 'tattoo') {
                    if (!document.getElementById('tattoo-size')?.value) { alert('Please select a tattoo size.'); return; }
                    if (!document.getElementById('tattoo-color')?.value) { alert('Please select a tattoo style.'); return; }
                }
                if (service === 'piercing') {
                    if (!document.getElementById('piercing-type')?.value) { alert('Please select a piercing type.'); return; }
                    if (!document.getElementById('piercing-placement')?.value) { alert('Please select a placement.'); return; }
                }
                if (service === 'henna') {
                    if (!document.getElementById('henna-size')?.value) { alert('Please select a henna size.'); return; }
                }

                alert(`Thanks ${fname}! We'll reach out to confirm your booking for ${preferredDate}.`);
            });
        }

    });

    const fnameInput = document.getElementById('fname');
    if (fnameInput) {
        fnameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[0-9]/g, '');
        });
    }

    const lnameInput = document.getElementById('lname');
    if (lnameInput) {
        lnameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[0-9]/g, '');
        });
    }