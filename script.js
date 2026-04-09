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
        if (navbarCollapse.classList.contains('show'))
        {
            new bootstrap.Collapse(navbarCollapse).hide();
        }
    });
});

// let isSingleImage = false;

// // for single images outside the slideshow
// function openSingleImage(src)
// {
//     isSingleImage = true;
//     const lightbox = document.getElementById('lightbox');
//     if (!lightbox) return;
//     document.getElementById('lightbox-img').src = src;
//     document.querySelector('.lightbox-prev').style.display = 'none';
//     document.querySelector('.lightbox-next').style.display = 'none';
//     lightbox.style.display = 'flex';
//     setTimeout(() => lightbox.classList.add('active'), 10);
// }

// let currentSlide = 0;
// let currentLightboxIndex = 0;

// // card slideshow
// function changeSlide(direction, btn)
// {
//     const slideshow = btn.closest('.card-slideshow');
//     const slides = slideshow.querySelectorAll('.slide-img');
//     if (!slides.length) return;

//     const current = slideshow.querySelector('.slide-img.active');
//     const currentIndex = Array.from(slides).indexOf(current);
//     const nextIndex = (currentIndex + direction + slides.length) % slides.length;

//     current.classList.remove('active');
//     slides[nextIndex].classList.add('active');

//     // update currentSlide for lightbox sync
//     currentSlide = nextIndex;
// }

// function openLightbox()
// {
//     isSingleImage = false;

//     // set active array
//     activeImages = projectImages;

//     // sync with current card slide
//     currentLightboxIndex = currentSlide;
//     const lightbox = document.getElementById('lightbox');
//     if (!lightbox) return;
//     document.getElementById('lightbox-img').src = projectImages[currentLightboxIndex];
//     document.querySelector('.lightbox-prev').style.display = 'block';
//     document.querySelector('.lightbox-next').style.display = 'block';
//     lightbox.style.display = 'flex';
//     setTimeout(() => lightbox.classList.add('active'), 10);
// }

// // navigate lightbox
// function lightboxNav(direction)
// {
//     // disable arrows for single images
//     if (isSingleImage) return;
//     currentLightboxIndex = (currentLightboxIndex + direction + activeImages.length) % activeImages.length;
//     const img = document.getElementById('lightbox-img');
//     img.style.opacity = 0;
//     setTimeout(() =>
//     {
//         img.src = activeImages[currentLightboxIndex];
//         img.style.opacity = 1;
//     }, 200);
// }

// // close lightbox
// function closeLightbox()
// {
//     const lightbox = document.getElementById('lightbox');
//     if (!lightbox) return;
//     lightbox.classList.remove('active');
//     setTimeout(() => lightbox.style.display = 'none', 300);
// }

// // click background to close
// document.addEventListener('DOMContentLoaded', function()
// {
//     const lightbox = document.getElementById('lightbox');
//     if (lightbox)
//     {
//         lightbox.addEventListener('click', function(e)
//         {
//             if (e.target === lightbox) closeLightbox();
//         });
//     }

//     // handle slideshow clicks
//     document.querySelectorAll('.card-slideshow').forEach(slideshow =>
//     {
//         slideshow.addEventListener('click', function(e)
//         {
//             // ignore if clicking buttons
//             if (e.target.classList.contains('slide-btn') || e.target.closest('.slide-btn')) return;

//             const slides = Array.from(slideshow.querySelectorAll('.slide-img'));
//             const currentIndex = slides.findIndex(s => s.classList.contains('active'));
//             const images = slides.map(s => s.src);
//             openLightboxFromArray(images, currentIndex);
//         });
//     });
// });

// // keyboard navigation
// document.addEventListener('keydown', function(e)
// {
//     const lightbox = document.getElementById('lightbox');
//     if (!lightbox || !lightbox.classList.contains('active')) return;
//     if (e.key === 'ArrowLeft') lightboxNav(-1);
//     if (e.key === 'ArrowRight') lightboxNav(1);
//     if (e.key === 'Escape') closeLightbox();
// });

// // active array tracker
// let activeImages = [];

// // open lightbox with a specific array and index
// function openLightboxFromArray(images, index)
// {
//     isSingleImage = false;
//     activeImages = images;
//     currentLightboxIndex = index;
//     const lightbox = document.getElementById('lightbox');
//     if (!lightbox) return;
//     document.getElementById('lightbox-img').src = activeImages[currentLightboxIndex];
//     document.querySelector('.lightbox-prev').style.display = 'block';
//     document.querySelector('.lightbox-next').style.display = 'block';
//     lightbox.style.display = 'flex';
//     setTimeout(() => lightbox.classList.add('active'), 10);
// }

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

// function showSlides(n)
// {
//     let i;
//     let slides = Array.from(document.getElementsByClassName('mySlides'));
//     let dots = Array.from(document.getElementsByClassName('dot'));

//     if (!slides.length) return;

//     if (n > slides.length)
//     {
//         slideIndex = 1;
//     }

//     if (n < 1)
//     {
//         slideIndex = slides.length;
//     }

//     for (i = 0; i < slides.length; i++)
//     {
//         slides[i].style.display = 'none';
//     }

//     for (i = 0; i < dots.length; i++)
//     {
//         dots[i].className = 'dot';
//     }

//     slides[slideIndex-1].style.display = 'block';
//     dots[slideIndex-1].className = 'dot active';
// }

// new lightbox
if (document.getElementById('lightbox'))
{
    let currentLightboxIndex = 0;
    let currentGroup = [];

    const lightboxGroups =
    {
        scs:
        [
            'public/experiences/scs1.jpg',
            'public/experiences/scs2.jpg',
            'public/experiences/scs3.jpg',
            'public/experiences/scs4.jpg'    
        ],

        refresh:
        [
            'public/experiences/refresh1.webp',
            'public/experiences/refresh2.jpg',
            'public/experiences/refresh3.jpg'
        ],

        cleanup:
        [
            'public/experiences/clean-up.jpg'
        ],

        shanghai:
        [
            'public/experiences/shanghai.jpg'
        ],

        syf:
        [
            'public/experiences/syf.jpg'
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

    // document.querySelector('#lightbox-img').addEventListener('click', function(e)
    // {
    //     e.stopPropagation();
    // });
    
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