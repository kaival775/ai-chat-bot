function splitTextIntoSpans(selector) {
    var element = document.querySelector(selector);
    if (element) {
        var text = element.innerText;
        var splitText = text
           .split("")
           .map((char) => `<span>${char}</span> `)
           .join("");
        element.innerHTML = splitText;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    splitTextIntoSpans(".send h1");
    splitTextIntoSpans(".header-text h1");

    gsap.to(".header-text h1 span", {
        top: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.075,
    });

    gsap.from(".cta, .nav, .tagline, .links", {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 1,
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector("#toggle");
    const toggleButton2 = document.querySelector("#back");
    let isOpen = false;

    const timeline = gsap.timeline({ paused: true });

    timeline.to(".overlay", {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "all",
    });

    timeline.to(".send h1 span", {
        top: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.075,
    });

    toggleButton.addEventListener("click", function () {
        if (isOpen) {
            timeline.reverse();
        } else {
            timeline.play();
        }
        isOpen = !isOpen;
    });

    toggleButton2.addEventListener("click", function () {
        if (isOpen) {
            timeline.reverse();
        } else {
            timeline.play();
        }
        isOpen = !isOpen;
    });
});



function sendToWhatsApp() {
    var name = document.getElementById("fname").value;
    var location = document.getElementById("location").value;
    var email = document.getElementById("email").value;
  
    var selectedDisciplines = [];
    var checkboxes = document.querySelectorAll('.jobs input[type="checkbox"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
      selectedDisciplines.push(checkboxes[i].nextElementSibling.textContent);
    }
  
    var message = "New contact form submission:\n\n";
    message += "Name: " + name + "\n";
    message += "Location: " + location + "\n";
    message += "Email: " + email + "\n";
    message += "Disciplines:\n";
    for (var i = 0; i < selectedDisciplines.length; i++) {
      message += "- " + selectedDisciplines[i] + "\n";
    }
  
    var whatsappNumber = "1234567890"; // Replace with your WhatsApp number in international format (without +)
    var whatsappUrl = "https://api.whatsapp.com/send?phone=" + whatsappNumber + "&text=" + encodeURIComponent(message);
  
    window.open(whatsappUrl, '_blank');
  }