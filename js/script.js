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

/* ============================================================
   HEADER SCROLL, BOOK NOW BUTTON, BOOKING MODAL
   ========================================================== */
(function () {
    const isHome = document.body.classList.contains('page-home')
    const isContact = document.body.classList.contains('page-contact')

    // Header: transparent over the hero, glass once you scroll
    const siteHeader = document.querySelector('header')
    if (siteHeader && isHome) {
        const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
    }

    // Book Now button, last item in the nav
    const navList = document.querySelector('nav ul')
    let bookBtn = null
    if (navList) {
        const li = document.createElement('li')
        li.className = 'nav-book'
        li.innerHTML = '<button type="button" class="nav-book-btn">Book Now</button>'
        navList.appendChild(li)
        bookBtn = li.querySelector('button')
    }

    const placements = {
        ear: ['Earlobe', 'Helix', 'Auricle', 'Flat', 'Conch', 'Tragus', 'Snug', 'Rook', 'Daith', 'Forward Helix', 'Industrial', 'Tunnel (10mm)'],
        facial: ['Nostril', 'Septum', 'Eyebrow', 'Medusa', 'Ashley', 'Labret', 'Cheek'],
        body: ['Tongue', 'Navel', 'Nipple', 'Dermal']
    }

    const overlay = document.createElement('div')
    overlay.className = 'booking-modal-overlay'
    overlay.setAttribute('aria-hidden', 'true')
    overlay.innerHTML = `
        <div class="booking-modal" role="dialog" aria-modal="true" aria-labelledby="bm-title">
            <button type="button" class="booking-modal-close" aria-label="Close booking form"><i class="bi bi-x-lg"></i></button>

            <div id="bm-form-view">
                <h3 id="bm-title">Book a session</h3>
                <p class="modal-sub">Tell us what you want and when. We'll reach out to confirm. Walk-ins are always welcome.</p>

                <form id="bm-form" novalidate>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="bm-fname">First Name</label>
                            <input type="text" id="bm-fname" placeholder="Juan" autocomplete="given-name">
                        </div>
                        <div class="form-group">
                            <label for="bm-lname">Last Name</label>
                            <input type="text" id="bm-lname" placeholder="Dela Cruz" autocomplete="family-name">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="bm-contact">Contact Number</label>
                        <input type="tel" id="bm-contact" placeholder="09XX XXX XXXX" maxlength="13" inputmode="numeric" autocomplete="tel">
                    </div>

                    <div class="form-group">
                        <label for="bm-email">Email Address</label>
                        <input type="email" id="bm-email" placeholder="juan@email.com" autocomplete="email">
                    </div>

                    <div class="form-group">
                        <label for="bm-service">Service</label>
                        <select id="bm-service">
                            <option value="" disabled selected>Select a service</option>
                            <option value="tattoo">Permanent Tattoo</option>
                            <option value="piercing">Body Piercing</option>
                            <option value="henna">Henna Tattoo</option>
                            <option value="coverup">Cover-Up Tattoo</option>
                        </select>
                    </div>

                    <div id="bm-sub-tattoo" hidden>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bm-tattoo-size">Size</label>
                                <select id="bm-tattoo-size">
                                    <option value="" disabled selected>Select size</option>
                                    <option>Minimalist</option>
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                    <option>Half Sleeve</option>
                                    <option>Full Sleeve</option>
                                    <option>Back Piece</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="bm-tattoo-color">Style</label>
                                <select id="bm-tattoo-color">
                                    <option value="" disabled selected>Select style</option>
                                    <option>Black & Grey</option>
                                    <option>Colored</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div id="bm-sub-piercing" hidden>
                        <div class="form-group">
                            <label for="bm-piercing-type">Piercing Type</label>
                            <select id="bm-piercing-type">
                                <option value="" disabled selected>Select type</option>
                                <option value="ear">Ear</option>
                                <option value="facial">Facial</option>
                                <option value="body">Body</option>
                            </select>
                        </div>
                        <div class="form-group" id="bm-placement-group" hidden>
                            <label for="bm-piercing-placement">Placement</label>
                            <select id="bm-piercing-placement">
                                <option value="" disabled selected>Select placement</option>
                            </select>
                        </div>
                    </div>

                    <div id="bm-sub-henna" hidden>
                        <div class="form-group">
                            <label for="bm-henna-size">Size</label>
                            <select id="bm-henna-size">
                                <option value="" disabled selected>Select size</option>
                                <option>3 × 3 in. — ₱150</option>
                                <option>5 × 5 in. — ₱300</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="bm-date">Preferred Date</label>
                        <input type="date" id="bm-date">
                    </div>

                    <div class="form-group">
                        <label for="bm-details">Tell Us About Your Idea</label>
                        <textarea id="bm-details" placeholder="Design, placement, size, style, or any references you have..."></textarea>
                    </div>

                    <p class="modal-error" id="bm-error" role="alert" aria-live="polite"></p>

                    <button type="submit" class="form-submit">Send Request</button>
                </form>
            </div>

            <div id="bm-success-view" class="modal-success" hidden>
                <h3 id="bm-success-title">Thanks!</h3>
                <p class="modal-sub" id="bm-success-text"></p>
                <button type="button" class="form-submit" id="bm-done">Close</button>
            </div>
        </div>
    `
    document.body.appendChild(overlay)

    const modal = overlay.querySelector('.booking-modal')
    const closeBtn = overlay.querySelector('.booking-modal-close')
    const form = overlay.querySelector('#bm-form')
    const formView = overlay.querySelector('#bm-form-view')
    const successView = overlay.querySelector('#bm-success-view')
    const errorEl = overlay.querySelector('#bm-error')
    const $ = id => overlay.querySelector('#' + id)

    const dateInput = $('bm-date')
    const t = new Date()
    t.setDate(t.getDate() + 1)
    dateInput.min = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`

    $('bm-contact').addEventListener('input', e => { e.target.value = e.target.value.replace(/[^\d+]/g, '') })
    ;['bm-fname', 'bm-lname'].forEach(id => {
        $(id).addEventListener('input', e => { e.target.value = e.target.value.replace(/[0-9]/g, '') })
    })

    const subs = { tattoo: $('bm-sub-tattoo'), piercing: $('bm-sub-piercing'), henna: $('bm-sub-henna') }
    const placementGroup = $('bm-placement-group')
    const placementSelect = $('bm-piercing-placement')
    const placementDefault = '<option value="" disabled selected>Select placement</option>'

    $('bm-service').addEventListener('change', function () {
        Object.values(subs).forEach(el => { el.hidden = true })
        if (subs[this.value]) subs[this.value].hidden = false
        $('bm-piercing-type').value = ''
        placementGroup.hidden = true
        placementSelect.innerHTML = placementDefault
    })

    $('bm-piercing-type').addEventListener('change', function () {
        const list = placements[this.value]
        if (!list) return
        placementSelect.innerHTML = placementDefault
        list.forEach(p => {
            const opt = document.createElement('option')
            opt.textContent = p
            placementSelect.appendChild(opt)
        })
        placementGroup.hidden = false
    })

    function fail(msg, field) {
        errorEl.textContent = msg
        if (field) field.focus()
    }

    form.addEventListener('input', () => { errorEl.textContent = '' })
    form.addEventListener('change', () => { errorEl.textContent = '' })

    form.addEventListener('submit', e => {
        e.preventDefault()
        const fname = $('bm-fname').value.trim()
        const lname = $('bm-lname').value.trim()
        const contact = $('bm-contact').value.trim()
        const email = $('bm-email').value.trim()
        const service = $('bm-service').value
        const date = dateInput.value

        if (!fname) return fail('Enter your first name.', $('bm-fname'))
        if (!lname) return fail('Enter your last name.', $('bm-lname'))
        if (!/^(09|\+639|0?9)\d{9}$/.test(contact)) return fail('Enter a valid PH number, like 09XXXXXXXXX.', $('bm-contact'))
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Enter a valid email address.', $('bm-email'))
        if (!service) return fail('Pick a service.', $('bm-service'))

        if (service === 'tattoo') {
            if (!$('bm-tattoo-size').value) return fail('Pick a tattoo size.', $('bm-tattoo-size'))
            if (!$('bm-tattoo-color').value) return fail('Pick a tattoo style.', $('bm-tattoo-color'))
        }
        if (service === 'piercing') {
            if (!$('bm-piercing-type').value) return fail('Pick a piercing type.', $('bm-piercing-type'))
            if (!placementSelect.value) return fail('Pick a placement.', placementSelect)
        }
        if (service === 'henna' && !$('bm-henna-size').value) return fail('Pick a henna size.', $('bm-henna-size'))

        if (!date) return fail('Pick a preferred date.', dateInput)
        if (date < dateInput.min) return fail('Pick a date from tomorrow onward.', dateInput)

        const [y, m, d] = date.split('-').map(Number)
        const niceDate = new Date(y, m - 1, d).toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' })
        $('bm-success-title').textContent = `Thanks, ${fname}!`
        $('bm-success-text').textContent = `We'll reach out to confirm your booking for ${niceDate}.`
        formView.hidden = true
        successView.hidden = false
        $('bm-done').focus()
    })

    function resetModal() {
        form.reset()
        Object.values(subs).forEach(el => { el.hidden = true })
        placementGroup.hidden = true
        placementSelect.innerHTML = placementDefault
        errorEl.textContent = ''
        successView.hidden = true
        formView.hidden = false
    }

    let lastFocus = null

    function openModal() {
        if (typeof closeNav === 'function') closeNav()
        if (!successView.hidden) resetModal()
        lastFocus = document.activeElement
        overlay.classList.add('open')
        overlay.setAttribute('aria-hidden', 'false')
        document.documentElement.classList.add('modal-open')
        requestAnimationFrame(() => $('bm-fname').focus())
    }

    function closeModal() {
        overlay.classList.remove('open')
        overlay.setAttribute('aria-hidden', 'true')
        document.documentElement.classList.remove('modal-open')
        if (lastFocus && lastFocus.focus) lastFocus.focus()
    }

    closeBtn.addEventListener('click', closeModal)
    $('bm-done').addEventListener('click', closeModal)
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal() })

    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('open')) return
        if (e.key === 'Escape') { closeModal(); return }
        if (e.key !== 'Tab') return
        const focusable = Array.from(modal.querySelectorAll('button, input, select, textarea, a[href]'))
            .filter(el => !el.disabled && el.offsetParent !== null)
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    })

    // Nav button: modal everywhere, except on the contact page where the form is already there
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            if (isContact && document.getElementById('booking-form')) {
                if (typeof closeNav === 'function') closeNav()
                document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })
                const f = document.getElementById('fname')
                if (f) setTimeout(() => f.focus({ preventScroll: true }), 400)
            } else {
                openModal()
            }
        })
    }

    // Any "Book a Session" link that points at the contact form opens the modal instead
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href]')
        if (!link || isContact) return
        if (/(^|\/)contact\.html#booking-form$/.test(link.getAttribute('href'))) {
            e.preventDefault()
            openModal()
        }
    })
})()