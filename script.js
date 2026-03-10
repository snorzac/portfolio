// typing animation
var typed = new Typed(".auto-type",
    {
        strings: ["Hello! I am Isaac :)"],
        typeSpeed: 60
    }
);

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