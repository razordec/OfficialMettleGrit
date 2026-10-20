// === Navigation Scroll Effect ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === Mobile Menu Toggle ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// === Class Schedule Tabs ===
const timetableTabs = document.querySelectorAll('.timetable-tab');
const timetableGrids = document.querySelectorAll('.timetable-grid');

timetableTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        timetableTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all grids
        timetableGrids.forEach(grid => grid.classList.remove('active'));
        
        // Show the corresponding grid
        const day = tab.getAttribute('data-day');
        document.getElementById(day).classList.add('active');
    });
});

// === Scroll Animations (Fade In) ===
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    observer.observe(el);
});

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// === Payment Modal Logic ===
const modal = document.getElementById('paymentModal');
const form = document.getElementById('checkoutForm');
const successState = document.getElementById('paymentSuccess');
const payBtn = document.getElementById('payBtn');

// Plan Data
const plans = {
    'Basic': 'K150',
    'Pro': 'K300',
    'Elite': 'K520'
};

function openModal(planName) {
    // Update Modal Content
    document.getElementById('modalPlanName').innerText = planName;
    document.getElementById('modalPlanCost').innerText = plans[planName] + '/mo';
    
    // Reset States
    form.style.display = 'block';
    successState.style.display = 'none';
    form.reset();
    
    // Show Modal
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// === Input Formatting ===
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    input.value = value;
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// === Payment Processing Simulation ===
function processPayment(e) {
    e.preventDefault();
    
    // Disable button and show loading state
    payBtn.disabled = true;
    payBtn.innerHTML = '<span class="spinner"></span> Processing...';

    // Simulate API call delay
    setTimeout(() => {
        // Get email for confirmation message
        const email = document.getElementById('email').value;
        document.getElementById('confirmedEmail').innerText = email;

        // Switch to success view
        form.style.display = 'none';
        successState.style.display = 'block';

        // Reset button state
        payBtn.disabled = false;
        payBtn.innerHTML = 'Pay Now';
    }, 2000);
}