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
setTimeout(function()
    {
        const overlay = document.querySelector('.navbar-overlay');
        const toggler = document.querySelector('.navbar-toggler');
        const closeBtn = document.querySelector('.navbar-close');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        function openMenu()
        {
            navbarCollapse.classList.add('show');
            overlay.classList.add('show');
            closeBtn.classList.add('show');
        }

        function closeMenu()
        {
            navbarCollapse.classList.remove('show');
            overlay.classList.remove('show');
            closeBtn.classList.remove('show');
        }

        toggler.addEventListener('click', openMenu);
        overlay.addEventListener('click', closeMenu);
        closeBtn.addEventListener('click', closeMenu);

        document.querySelectorAll('.navbar-nav a').forEach(function(link)
    {
        link.addEventListener('click', closeMenu);
    });
    
}, 500);

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

    // dots[n - 1].className = 'dot active';
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
        // experiences image
        akita:
        [
            `${basePath}/public/experiences/akita/akita1.jpg`,
            `${basePath}/public/experiences/akita/akita2.jpg`,
            `${basePath}/public/experiences/akita/akita3.jpg`,
            `${basePath}/public/experiences/akita/akita4.JPG`,
            `${basePath}/public/experiences/akita/akita5.jpg`,
            `${basePath}/public/experiences/akita/akita6.jpg`,
            `${basePath}/public/experiences/akita/akita7.jpg`,
            `${basePath}/public/experiences/akita/akita8.JPG`,
            `${basePath}/public/experiences/akita/akita9.JPG`
        ],

        refresh:
        [
            `${basePath}/public/experiences/refresh/refresh1.webp`,
            `${basePath}/public/experiences/refresh/refresh2.jpg`,
            `${basePath}/public/experiences/refresh/refresh3.jpg`
        ],

        cleanup:
        [
            `${basePath}/public/experiences/clean-up.jpg`
        ],

        shanghai:
        [
            `${basePath}/public/experiences/shanghai/shanghai1.jpg`,
            `${basePath}/public/experiences/shanghai/shanghai2.jpeg`,
            `${basePath}/public/experiences/shanghai/shanghai3.jpeg`,
            `${basePath}/public/experiences/shanghai/shanghai4.jpeg`,
            `${basePath}/public/experiences/shanghai/shanghai5.jpeg`
        ],

        syf:
        [
            `${basePath}/public/experiences/syf.jpg`
        ],

        // project images
        android:
        [
            `${basePath}/public/project-images/android/android.png`
        ],

        androiduiux:
        [
            `${basePath}/public/project-images/android/low-fi.png`,
            `${basePath}/public/project-images/android/hi-fi1.png`,
            `${basePath}/public/project-images/android/hi-fi2.png`
        ],

        mainrestaurant:
        [
            `${basePath}/public/project-images/cdev/restaurant1.png`,
            `${basePath}/public/project-images/cdev/restaurant2.png`,
            `${basePath}/public/project-images/cdev/restaurant3.png`,
            `${basePath}/public/project-images/cdev/restaurant4.png`,
            `${basePath}/public/project-images/cdev/restaurant5.png`,
            `${basePath}/public/project-images/cdev/restaurant6.png`,
            `${basePath}/public/project-images/cdev/restaurant7.png`
        ],

        restaurant_lofi:
        [
            `${basePath}/public/project-images/cdev/cdev1.png`,
            `${basePath}/public/project-images/cdev/cdev2.png`,
            `${basePath}/public/project-images/cdev/cdev3.png`,
            `${basePath}/public/project-images/cdev/cdev4.png`,
            `${basePath}/public/project-images/cdev/cdev5.png`,
            `${basePath}/public/project-images/cdev/cdev6.png`,
            `${basePath}/public/project-images/cdev/eer.jpeg`
        ],

        mp:
        [
            `${basePath}/public/project-images/mp/esp32.jpg`
        ],

        mp_others:
        [
            `${basePath}/public/project-images/mp/esp-nsh.jpg`,
            `${basePath}/public/project-images/mp/esp-light.gif`,
            `${basePath}/public/project-images/mp/esp-ap.jpg`,
            `${basePath}/public/project-images/mp/esp-mqtt.jpg`
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

    const slideCount = container.querySelectorAll('.mySlides').length;
    
    // skip swipe/dot logic entirely for single-image containers
    if (slideCount <= 1)
        return;
    
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