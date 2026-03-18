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

// close navbar on mobile when nav link is clicked
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

// images array
const projectImages =
[
    '../public/project-images/low-fi.png',
    '../public/project-images/hi-fi1.png',
    '../public/project-images/hi-fi2.png'
];

let currentSlide = 0;
let currentLightboxIndex = 0;

// card slideshow
function changeSlide(direction)
{
    const slides = document.querySelectorAll('.slide-img');
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function openLightbox()
{
    isSingleImage = false;

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
    currentLightboxIndex = (currentLightboxIndex + direction + projectImages.length) % projectImages.length;
    const img = document.getElementById('lightbox-img');
    img.style.opacity = 0;
    setTimeout(() =>
    {
        img.src = projectImages[currentLightboxIndex];
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

    // click slide to open lightbox
    const track = document.querySelector('.slide-track');
    if (track)
    {
        track.addEventListener('click', function()
        {
            openLightbox();
        });
    }
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