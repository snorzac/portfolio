// typing animation
var typed = new Typed(".auto-type",
    {
        strings: ["Hello! I am Isaac :)"],
        typeSpeed: 60,
        onComplete: function()
        {
            new Typed(".auto-type2",
                {
                    strings: ["i am cybersecurity and digital forensics graduate from temasek polytechnic."],
                    typeSpeed: 20,
                    showCursor: false,
                    onComplete: function()
                    {
                        new Typed(".auto-type3",
                            {
                                strings: ["i have a strong passion for programming and software development, mainly for school work and personal projects."],
                                typeSpeed: 20,
                                showCursor: false,
                                onComplete: function()
                                {
                                    new Typed(".auto-type4",
                                        {
                                            strings: ["academics aside, i enjoy speedcubing, playing rhythm games, and watching shows during my free time to unwind."],
                                            typeSpeed: 20,
                                            showCursor: false
                                        }
                                    )
                                }
                            }
                        )
                    }
                }
            )
        }
    }
);