/* ============================================================
   AUTH PAGE: Log In / Sign Up toggle (design only, no accounts yet)
   Load AFTER script.js on login.html
   ========================================================== */
(() => {
    const tabsEl = document.querySelector('.auth-tabs')
    if (!tabsEl) return

    // Random background image: swap in your own full-res paths
    const bgImages = [
        'images/full-res/logcover (1).jpeg',
        'images/full-res/logcover (2).jpeg',
        'images/full-res/logcover (3).jpeg',
        'images/full-res/logcover (4).jpeg',
    ]
    const bgEl = document.querySelector('.auth-visual-img')
    if (bgEl) bgEl.src = bgImages[Math.floor(Math.random() * bgImages.length)]

    // Shown when a form is submitted. Delete this and the submit handler
    // below once real login/signup is wired up.
    const NOT_LIVE_NOTE = "Accounts aren't live yet. This form is just for show, for now."

    const tabBtns = Array.from(tabsEl.querySelectorAll('.auth-tab'))
    const panels = {
        login: document.getElementById('panel-login'),
        signup: document.getElementById('panel-signup')
    }
    const titleEl = document.querySelector('.auth-title')
    const textEl = document.querySelector('.auth-text')

    const copy = {
        login: {
            title: 'Welcome back.',
            text: 'Pick up where you left off. Your bookings and saved designs are waiting.',
            page: 'Log In — Rakistattoo'
        },
        signup: {
            title: 'Join the crew.',
            text: 'Make an account to keep track of your sessions and save the designs you love.',
            page: 'Sign Up — Rakistattoo'
        }
    }

    let current = null

    function swapText(el, value) {
        el.classList.add('is-swapping')
        setTimeout(() => {
            el.textContent = value
            el.classList.remove('is-swapping')
        }, 160)
    }

    function focusFirstField(name) {
        const first = panels[name].querySelector('input')
        if (first) first.focus({ preventScroll: true })
    }

    function setTab(name, { updateHash = true, focusForm = false } = {}) {
        if (!panels[name]) name = 'login'

        if (name === current) {
            if (focusForm) focusFirstField(name)
            return
        }

        const firstRun = current === null
        current = name

        tabsEl.dataset.active = name
        tabBtns.forEach(btn => {
            const on = btn.dataset.tab === name
            btn.setAttribute('aria-selected', String(on))
            btn.tabIndex = on ? 0 : -1
        })
        Object.entries(panels).forEach(([key, panel]) => {
            panel.classList.toggle('is-active', key === name)
        })

        if (firstRun) {
            titleEl.textContent = copy[name].title
            textEl.textContent = copy[name].text
        } else {
            swapText(titleEl, copy[name].title)
            swapText(textEl, copy[name].text)
        }
        document.title = copy[name].page

        if (updateHash) {
            try { history.replaceState(null, '', '#' + name) } catch (e) { /* ignore */ }
        }
        if (focusForm) focusFirstField(name)
    }

    // Tab clicks + arrow-key support
    tabBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => setTab(btn.dataset.tab))
        btn.addEventListener('keydown', e => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
            e.preventDefault()
            const next = tabBtns[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabBtns.length) % tabBtns.length]
            next.focus()
            setTab(next.dataset.tab)
        })
    })

    // "No account yet? Sign up" / "Already have an account? Log in"
    document.querySelectorAll('[data-switch]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            setTab(link.dataset.switch, { focusForm: true })
        })
    })

    // Deep links: login.html#signup, plus back/forward and nav links
    function tabFromHash() {
        return window.location.hash === '#signup' ? 'signup' : 'login'
    }
    window.addEventListener('hashchange', () => setTab(tabFromHash(), { updateHash: false }))
    setTab(tabFromHash(), { updateHash: false })
    
    // allow transitions only after the first paint
    const panelsWrap = document.querySelector('.auth-panels')
    requestAnimationFrame(() => requestAnimationFrame(() => panelsWrap.classList.remove('no-anim')))

    // Show / hide password
    document.querySelectorAll('.pw-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input')
            const show = input.type === 'password'
            input.type = show ? 'text' : 'password'
            btn.setAttribute('aria-pressed', String(show))
            btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
            btn.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye'
        })
    })

    // Forms are design-only for now
    document.querySelectorAll('.auth-form').forEach(form => {
        const note = form.querySelector('.auth-note')
        form.addEventListener('submit', e => {
            e.preventDefault()
            note.innerHTML = '<i class="bi bi-info-circle"></i><span></span>'
            note.querySelector('span').textContent = NOT_LIVE_NOTE
            note.classList.add('visible')
        })
        form.addEventListener('input', () => {
            note.classList.remove('visible')
            note.textContent = ''
        })
    })

    // "Forgot password?" goes nowhere yet
    document.querySelectorAll('.auth-forgot').forEach(a => {
        a.addEventListener('click', e => e.preventDefault())
    })
})()