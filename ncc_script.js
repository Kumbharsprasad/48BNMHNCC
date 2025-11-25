// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update date and time every second - Indian Standard Time (IST)
    function updateDateTime() {
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        
        // Convert to IST
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
        const istTime = new Date(utcTime + istOffset);
        
        // Format date
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const dayName = days[istTime.getDay()];
        const day = istTime.getDate();
        const month = months[istTime.getMonth()];
        const year = istTime.getFullYear();
        
        const dateString = `${dayName}, ${day} ${month} ${year}`;
        
        // Format time as HH:MM:SS AM/PM
        let hours = istTime.getHours();
        const minutes = istTime.getMinutes().toString().padStart(2, '0');
        const seconds = istTime.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        const hoursStr = hours.toString().padStart(2, '0');
        
        const timeString = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
        
        // Update DOM elements
        const dateElement = document.getElementById('currentDate');
        const timeElement = document.getElementById('currentTime');
        
        if (dateElement) {
            dateElement.textContent = dateString;
        }
        
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    // Update date/time immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Image Slider
let slideIndex = 1;
let slideTimer;

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startAutoSlide();
});

// Auto slide every 5 seconds
function startAutoSlide() {
    slideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Stop auto slide
function stopAutoSlide() {
    clearInterval(slideTimer);
}

// Change slide
function changeSlide(n) {
    stopAutoSlide();
    showSlides(slideIndex += n);
    startAutoSlide();
}

// Go to specific slide
function currentSlide(n) {
    stopAutoSlide();
    showSlides(slideIndex = n);
    startAutoSlide();
}

// Show slides
function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove active from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show current slide
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}
