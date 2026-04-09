const basePath = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
? ''
: '/portfolio';

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
document.querySelectorAll('.navbar-nav a').forEach(function(link)
{
    link.addEventListener('click', function()
    {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse.classList.contains('show'))
        {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            bsCollapse.hide();
        };
    });
});

// new slideshow
let slideIndex = 1;
// showSlides(slideIndex);

// next/previous controls
function plusSlides(n, containerId)
{
    const container = document.getElementById(containerId);
    changeSlide(container, n);
}

// thumbnail image controls
function currentSlide(n, containerId)
{
    const container = document.getElementById(containerId);
    goToSlide(container, n);
}

function changeSlide(container, n)
{
    const slides = container.querySelectorAll('.mySlides');
    let index = parseInt(container.dataset.index || 1);
    index += n;

    if (index > slides.length)
    {
        index = 1;
    }

    if (index < 1)
    {
        index = slides.length;
    }

    goToSlide(container, index);
}

function goToSlide(container, n)
{
    const slides = container.querySelectorAll('.mySlides');
    const dots = container.querySelectorAll('.dot');

    slides.forEach(s => s.style.display = 'none');
    dots.forEach(d => d.className = 'dot');

    slides[n - 1].style.display = 'block';
    dots[n - 1].className = 'dot active';
    container.dataset.index = n;
}

// initialise all slideshows
document.querySelectorAll('.slideshow-container').forEach(function(container)
{
    goToSlide(container, 1);
});

// new lightbox
if (document.getElementById('lightbox'))
{
    let currentLightboxIndex = 0;
    let currentGroup = [];

    const lightboxGroups =
    {
        //experiences image
        scs:
        [
            `${basePath}/public/experiences/scs1.jpg`,
            `${basePath}/public/experiences/scs2.jpg`,
            `${basePath}/public/experiences/scs3.jpg`,
            `${basePath}/public/experiences/scs4.jpg`
        ],

        refresh:
        [
            `${basePath}/public/experiences/refresh1.webp`,
            `${basePath}/public/experiences/refresh2.jpg`,
            `${basePath}/public/experiences/refresh3.jpg`
        ],

        cleanup:
        [
            `${basePath}/public/experiences/clean-up.jpg`
        ],

        shanghai:
        [
            `${basePath}/public/experiences/shanghai1.jpg`,
            `${basePath}/public/experiences/shanghai2.jpeg`,
            `${basePath}/public/experiences/shanghai3.jpeg`,
            `${basePath}/public/experiences/shanghai4.jpeg`,
            `${basePath}/public/experiences/shanghai5.jpeg`
        ],

        syf:
        [
            `${basePath}/public/experiences/syf.jpg`
        ],

        // project images
        android:
        [
            `${basePath}/public/project-images/android.png`
        ],

        androiduiux:
        [
            `${basePath}/public/project-images/hi-fi1.png`,
            `${basePath}/public/project-images/hi-fi2.png`,
            `${basePath}/public/project-images/low-fi.png`
        ],

        restaurant:
        [
            `${basePath}/public/project-images/restaurant.png`,
        ]
    };
    
    function openLightbox(group, index)
    {
        currentGroup = lightboxGroups[group];
        currentLightboxIndex = index;
        document.getElementById('lightbox-img').src = currentGroup[index];
        document.getElementById('lightbox').classList.add('active');

        // hide arrows if only one image
        const arrows = document.querySelectorAll('.lightbox-prev, .lightbox-next');
        arrows.forEach(a => a.style.display = currentGroup.length === 1 ? 'none' : 'block');
    }
    
    function changeLightboxSlide(n)
    {
        currentLightboxIndex = (currentLightboxIndex + n + currentGroup.length) % currentGroup.length;
        document.getElementById('lightbox-img').src = currentGroup[currentLightboxIndex];
    }
    
    function closeLightbox()
    {
        document.getElementById('lightbox').classList.remove('active');
    }

    document.querySelectorAll('.lightbox-trigger').forEach(function(img)
    {
        img.addEventListener('click', function()
        {
            openLightbox(this.dataset.group, parseInt(this.dataset.index));
        });
    });

    document.getElementById('lightbox').addEventListener('click', function(e)
    {
        if (e.target === this)
        {
            closeLightbox();
        }
    });

    document.querySelector('.lightbox-prev').addEventListener('click', function(e)
    {
        e.stopPropagation();
    });

    document.querySelector('.lightbox-next').addEventListener('click', function(e)
    {
        e.stopPropagation();
    });

    // close with escape key
    document.addEventListener('keydown', function(e)
    {
        if (e.key === 'Escape') closeLightbox();
    });
}