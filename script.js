// typing animation
if (document.querySelector('.auto-type'))
{
    var typed = new Typed('.auto-type',
        {
            strings: ["hello! i am isaac :)"],
            typeSpeed: 55
        }
    );
}

// close navbar dropdown when clicked on mobile
document.querySelectorAll('.nav-link').forEach(link =>
{
    link.addEventListener('click', () =>
    {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show'))
        {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// context-aware back button
document.addEventListener('DOMContentLoaded', () =>
{
    const backBtn = document.getElementById('back-btn');
    if (!backBtn) return;

    const from = localStorage.getItem('projectFrom');

    backBtn.addEventListener('click', (e) =>
    {
        e.preventDefault();

        if (from == 'projects')
        {
            window.location.href = '../projects.html';
        }

        else
        {
            window.location.href = '../index.html#sec3';
        }
    });
});

let isSingleImage = false;

// for single images outside the slideshow
function openSingleImage(src)
{
    isSingleImage = true;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    document.getElementById('lightbox-img').src = src;
    document.querySelector('.lightbox-prev').style.display = 'none';
    document.querySelector('.lightbox-next').style.display = 'none';
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
}

let currentSlide = 0;
let currentLightboxIndex = 0;

// card slideshow
function changeSlide(direction, btn)
{
    const slideshow = btn.closest('.card-slideshow');
    const slides = slideshow.querySelectorAll('.slide-img');
    if (!slides.length) return;

    const current = slideshow.querySelector('.slide-img.active');
    const currentIndex = Array.from(slides).indexOf(current);
    const nextIndex = (currentIndex + direction + slides.length) % slides.length;

    current.classList.remove('active');
    slides[nextIndex].classList.add('active');

    // update currentSlide for lightbox sync
    currentSlide = nextIndex;
}

function openLightbox()
{
    isSingleImage = false;

    // set active array
    activeImages = projectImages;

    // sync with current card slide
    currentLightboxIndex = currentSlide;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    document.getElementById('lightbox-img').src = projectImages[currentLightboxIndex];
    document.querySelector('.lightbox-prev').style.display = 'block';
    document.querySelector('.lightbox-next').style.display = 'block';
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
}

// navigate lightbox
function lightboxNav(direction)
{
    // disable arrows for single images
    if (isSingleImage) return;
    currentLightboxIndex = (currentLightboxIndex + direction + activeImages.length) % activeImages.length;
    const img = document.getElementById('lightbox-img');
    img.style.opacity = 0;
    setTimeout(() =>
    {
        img.src = activeImages[currentLightboxIndex];
        img.style.opacity = 1;
    }, 200);
}

// close lightbox
function closeLightbox()
{
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.style.display = 'none', 300);
}

// click background to close
document.addEventListener('DOMContentLoaded', function()
{
    const lightbox = document.getElementById('lightbox');
    if (lightbox)
    {
        lightbox.addEventListener('click', function(e)
        {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // handle slideshow clicks
    document.querySelectorAll('.card-slideshow').forEach(slideshow =>
    {
        slideshow.addEventListener('click', function(e)
        {
            // ignore if clicking buttons
            if (e.target.classList.contains('slide-btn') || e.target.closest('.slide-btn')) return;

            const slides = Array.from(slideshow.querySelectorAll('.slide-img'));
            const currentIndex = slides.findIndex(s => s.classList.contains('active'));
            const images = slides.map(s => s.src);
            openLightboxFromArray(images, currentIndex);
        });
    });
});

// keyboard navigation
document.addEventListener('keydown', function(e)
{
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'Escape') closeLightbox();
});

// active array tracker
let activeImages = [];

// open lightbox with a specific array and index
function openLightboxFromArray(images, index)
{
    isSingleImage = false;
    activeImages = images;
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    document.getElementById('lightbox-img').src = activeImages[currentLightboxIndex];
    document.querySelector('.lightbox-prev').style.display = 'block';
    document.querySelector('.lightbox-next').style.display = 'block';
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
}