document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;
  const overlayElement = document.querySelector(".overlay-nav-menu");
  const getStartedButton = document.querySelector(".button-86");
  const timeline = gsap.timeline({ paused: true });

  timeline.to(".block", {
    duration: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    stagger: 0.075,
    ease: "power3.inOut",
  });

  timeline.to(
    ".menu-item",
    {
      duration: 0.3,
      opacity: 1,
      stagger: 0.05,
      onStart: () => {
        document.querySelectorAll(".menu-item").forEach((item) => {
          item.classList.remove("hidden");
        });
      },
    },
    "-=0.5"
  );

  toggleButton.addEventListener("click", function () {
    
    if (toggleButton.classList.contains("active")) {
      overlayElement.classList.add("blur"); // Add blur effect when the menu is open
      getStartedButton.style.display = "none";
    } else {
      overlayElement.classList.remove("blur"); // Remove blur effect when the menu is closed
      getStartedButton.style.display = "block";
    }
    if (isOpen) {
      gsap.to(" .menu-item", {
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
          document.querySelectorAll(".menu-item").forEach((item) => {
            item.classList.add("hidden");
          });
        },
      });
      timeline.reverse();
    } else {
      timeline.play();
    }
    isOpen = !isOpen;
  });

  // Check if the user has already seen the loading animation

  startLoader(); // Call your loading function

  gsap.to(".counter", 0.25, {
    delay: 3.5,
    opacity: 0,
  });

  gsap.to(".bar", 1.5, {
    delay: 3.5,
    height: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
  });

  gsap.from(".h1", 1.5, {
    delay: 4,
    y: 700,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
  });

  gsap.from(".hero", 2, {
    delay: 4.5,
    y: 400,
    ease: "power4.inOut",
  });

  gsap.from(".button-86", 1.5, {
    delay: 4.5,
    y: 700,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
  });

  gsap.from(".burger", 2, {
    delay: 4.5,
    y: 10,
    ease: "power4.inOut",
  });
});

// Your loader function
function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }
    counterElement.textContent = currentValue;

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }
  updateCounter();
}
