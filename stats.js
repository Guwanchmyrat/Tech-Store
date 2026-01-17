// Statistics Page JavaScript - DÜZELTİLMİŞ
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Animated Counter - DÜZELTİLMİŞ
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    function startCounter(counter) {
        const target = +counter.dataset.target;
        const count = +counter.innerText;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / (target / increment)), 30);

        if (count < target) {
            const updateCount = () => {
                const currentCount = +counter.innerText;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount + increment);
                    setTimeout(updateCount, stepTime);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        } else {
            counter.innerText = target;
        }
    }

    // Animated Bars - DÜZELTİLMİŞ
    const bars = document.querySelectorAll('.bar');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetHeight = bar.style.getPropertyValue('--bar-height');
                bar.style.height = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'height 1.5s ease-in-out';
                    bar.style.height = targetHeight;
                }, 300);
                
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => {
        barObserver.observe(bar);
    });

    // Pie Chart Animation
    const pieChart = document.querySelector('.pie-chart');
    if (pieChart) {
        const pieObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pieChart.style.transform = 'scale(1)';
                    pieChart.style.opacity = '1';
                    pieObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        pieChart.style.transform = 'scale(0.8)';
        pieChart.style.opacity = '0';
        pieChart.style.transition = 'all 1s ease-in-out';
        
        pieObserver.observe(pieChart);
    }
});

// Add fade-in animation to stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});