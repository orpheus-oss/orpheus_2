document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 2. Countdown Timer
    // Wedding Date: 2099-12-26 12:00:00
    const weddingDate = new Date('2099-12-26T12:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add leading zero
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// 3. Copy Account Number Function
window.copyAccount = function(elementId) {
    const accountNum = document.getElementById(elementId).innerText;
    
    // Create a temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = accountNum;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Failed to copy', err);
        alert('복사에 실패했습니다. 직접 복사해주세요.');
    } finally {
        document.body.removeChild(textarea);
    }
};

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
