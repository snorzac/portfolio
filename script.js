// typing animation
if (document.querySelector('.auto-type'))
{
    var typed = new Typed('.auto-type',
        {
            strings: ["Hello! I am Isaac :)"],
            typeSpeed: 60
        }
    );
}

// close navbar on mobile when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link =>
{
    link.addEventListener('click', () =>
    {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show'))
        {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// expand image in project
document.addEventListener('DOMContentLoaded', function()
{
    const lightbox = document.getElementById('lightbox');
    if (lightbox)
    {
        lightbox.addEventListener('click', function()
        {
            closeLightbox();
        });
    }
});

function openLightbox(img)
{
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = img.src;
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
}

function closeLightbox()
{
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.style.display = 'none', 300);
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

// lightbox
function openLightbox(index)
{
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = projectImages[index];
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
}

function lightboxNav(direction)
{
    currentLightboxIndex = (currentLightboxIndex + direction + projectImages.length) % projectImages.length;
    const img = document.getElementById('lightbox-img');
    img.style.opacity = 0;
    setTimeout(() =>
    {
        img.src = projectImages[currentLightboxIndex];
        img.style.opacity = 1;
    }, 200);
}

function closeLightbox()
{
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.style.display = 'none', 300);
}

// keyboard navigation
document.addEventListener('keydown', function(e)
{
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'Escape') closeLightbox();
});

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
})