// typing animation
var typed = new Typed(".auto-type",
    {
        strings: ["Isaac Tan"],
        typeSpeed: 60,
        onComplete: function()
        {
            new Typed(".auto-type2",
                {
                    strings: ["cybersecurity and digital forensics graduate"],
                    typeSpeed: 20,
                    showCursor: false
                }
            )
        }
    }
);