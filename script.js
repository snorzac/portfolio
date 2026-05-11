const basePath = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
? ''
: '/portfolio';

w3.includeHTML();

// typing animation
if (document.querySelector('.auto-type'))
{
    var typed = new Typed('.auto-type',
        {
            strings: ["Hello! I am Isaac!"],
            typeSpeed: 50
        }
    );
}

// close navbar dropdown when clicked on mobile
document.addEventListener('DOMContentLoaded', () =>
{
    document.querySelectorAll('.navbar-nav a').forEach(link =>
    {
        link.addEventListener('click', () =>
        {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show'))
            {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                // const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                bsCollapse.hide();
            };
        });
    });
});


// new slideshow
let slideIndex = 1;

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

    // 0 = no animation
    goToSlide(container, n, 0);
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

    // pass n as direction
    goToSlide(container, index, n);
}

function goToSlide(container, n, direction)
{
    const slides = container.querySelectorAll('.mySlides');
    const dots = container.querySelectorAll('.dot');

    slides.forEach(s =>
    {
        s.style.display = 'none';
        s.classList.remove('slide-in-right', 'slide-in-left');
    });
    dots.forEach(d => d.className = 'dot');

    const activeSlide = slides[n - 1];
    activeSlide.style.display = 'block';

    // small timeout lets the browser register display:block before animating
    setTimeout(() =>
    {
        if (direction === 1)
        {
            activeSlide.classList.add('slide-in-right');
        }

        else if (direction === -1)
        {
            activeSlide.classList.add('slide-in-left');
        }
    }, 10);

    dots[n - 1].className = 'dot active';
    container.dataset.index = n;
}

// initialise all slideshows
document.querySelectorAll('.slideshow-container').forEach(function(container)
{
    goToSlide(container, 1, 0);
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
            `${basePath}/public/project-images/low-fi.png`,
            `${basePath}/public/project-images/hi-fi1.png`,
            `${basePath}/public/project-images/hi-fi2.png`
        ],

        mainrestaurant:
        [
            `${basePath}/public/project-images/restaurant1.png`,
            `${basePath}/public/project-images/restaurant2.png`,
            `${basePath}/public/project-images/restaurant3.png`,
            `${basePath}/public/project-images/restaurant4.png`,
            `${basePath}/public/project-images/restaurant5.png`,
            `${basePath}/public/project-images/restaurant6.png`,
            `${basePath}/public/project-images/restaurant7.png`
        ],

        restaurant_lofi:
        [
            `${basePath}/public/project-images/cdev1.png`,
            `${basePath}/public/project-images/cdev2.png`,
            `${basePath}/public/project-images/cdev3.png`,
            `${basePath}/public/project-images/cdev4.png`,
            `${basePath}/public/project-images/cdev5.png`,
            `${basePath}/public/project-images/cdev6.png`,
            `${basePath}/public/project-images/eer.jpeg`
        ],

        mp:
        [
            `${basePath}/public/project-images/esp32.jpg`
        ],

        mp_others:
        [
            `${basePath}/public/project-images/esp-nsh.jpg`,
            `${basePath}/public/project-images/esp-light.gif`,
            `${basePath}/public/project-images/esp-ap.jpg`,
            `${basePath}/public/project-images/esp-mqtt.jpg`
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

// moving slides with finger swipe
document.querySelectorAll('.slideshow-container').forEach(function(container)
{
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', function(e)
    {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    },
    {
        passive: false
    });

    container.addEventListener('touchmove', function(e)
    {
        const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
        const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);

        // only lock scroll if swiping more horizontally than vertically
        if (diffX > diffY)
        {
            e.preventDefault();
        }
    },

    {
        passive: false
    });

    container.addEventListener('touchend', function(e)
    {
        touchendX = e.changedTouches[0].screenX;

        const diff = touchStartX - touchendX;

        // only register as swipe if finger moved more than 50px
        if (Math.abs(diff) > 50)
        {
            if (diff > 0)
            {
                // swiped left = next
                plusSlides(1, container.id);
            }

            else
            {
                // swiped right = prev
                plusSlides(-1, container.id);
            }
        }
    },
    
    {
        passive: false
    });
});

// preload slideshow images
function preloadImages(images)
{
    images.forEach(function(src)
    {
        const img = new Image();
        img.src = src;
    });
}

// preload all groups
if (document.getElementById('lightbox'))
{
    Object.values(lightboxGroups).forEach(function(group)
    {
        preloadImages(group);
    });
}

// preload all slideshow images on the page
document.querySelectorAll('.mySlides img').forEach(function(img)
{
    const src = img.getAttribute('src');
    const preloadImg = new Image();
    preloadImg.src = src;
});