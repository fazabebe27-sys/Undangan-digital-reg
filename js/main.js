        const bgAudio = document.getElementById('bg-audio');
        const vinylDisc = document.getElementById('vinyl-disc');
        const musicIndicator = document.getElementById('music-indicator');
        const vinylContainer = document.getElementById('vinyl-music-container');
        let isPlaying = false;
        let fireworksActive = false;

        function openCurtains() {
        playAudio();

        const ticket = document.getElementById('welcome-ticket');
        if (ticket) {
            ticket.style.transform = 'scale(0.5) rotate(-15deg)';
            ticket.style.opacity = '0';
        }

        document.getElementById('curtain-overlay').classList.add('curtains-open');

        const mainContent = document.getElementById('main-content');
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            mainContent.classList.remove('opacity-0');
            mainContent.classList.add('opacity-100');
            triggerHeroAnimations();

            setTimeout(() => {
            document.getElementById('curtain-overlay').style.display = 'none';
            vinylContainer.classList.add('vinyl-show');
            startFireworks();
            initScrollReveal();
            startCountdown();
            }, 1500);
        }, 300);
        }

        function triggerHeroAnimations() {
        const logos = document.getElementById('hero-logos');
        const badge = document.getElementById('hero-badge');
        const title = document.getElementById('hero-title');
        const subtitle = document.getElementById('hero-subtitle');
        const countdown = document.getElementById('hero-countdown');
        const desc = document.getElementById('hero-desc');
        const btns = document.getElementById('hero-btns');

        setTimeout(() => {
            if (logos) logos.classList.remove('opacity-0', 'translate-y-4');
            if (logos) logos.classList.add('opacity-100', 'translate-y-0');
        }, 100);
        setTimeout(() => {
            if (badge) badge.classList.remove('opacity-0', 'translate-y-4');
            if (badge) badge.classList.add('opacity-100', 'translate-y-0');
        }, 250);
        setTimeout(() => {
            if (title) title.classList.remove('opacity-0', 'translate-y-6');
            if (title) title.classList.add('opacity-100', 'translate-y-0');
        }, 400);
        setTimeout(() => {
            if (subtitle) subtitle.classList.remove('opacity-0', 'translate-y-6');
            if (subtitle) subtitle.classList.add('opacity-100', 'translate-y-0');
        }, 550);
        setTimeout(() => {
            if (countdown) countdown.classList.remove('opacity-0', 'translate-y-6');
            if (countdown) countdown.classList.add('opacity-100', 'translate-y-0');
        }, 700);
        setTimeout(() => {
            if (desc) desc.classList.remove('opacity-0', 'translate-y-6');
            if (desc) desc.classList.add('opacity-100', 'translate-y-0');
        }, 850);
        setTimeout(() => {
            if (btns) btns.classList.remove('opacity-0', 'translate-y-6');
            if (btns) btns.classList.add('opacity-100', 'translate-y-0');
        }, 1000);
        }

        function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal-on-scroll');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
            });
        }, observerOptions);

        reveals.forEach(reveal => observer.observe(reveal));
        }

        function startCountdown() {
        const targetDate = new Date('2026-08-28T17:50:00').getTime();

        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
            clearInterval(timerInterval);
            ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerText = '00';
            });
            return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const format = value => (value < 10 ? `0${value}` : `${value}`);

            const values = { days, hours, minutes, seconds };
            Object.entries(values).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.innerText = format(value);
            });
        }, 1000);
        }

        function playAudio() {
        if (!bgAudio) return;
        bgAudio.volume = 0.5;
        bgAudio.play().then(() => {
            isPlaying = true;
            vinylDisc.classList.add('playing', 'playing-pulse');
            if (musicIndicator) musicIndicator.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }).catch(() => {
            console.log('Audio autoplay dicegah.');
        });
        }

        function toggleAudio() {
        if (!bgAudio) return;
        if (isPlaying) {
            bgAudio.pause();
            isPlaying = false;
            vinylDisc.classList.remove('playing', 'playing-pulse');
            if (musicIndicator) musicIndicator.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            playAudio();
        }
        }

        function openTwibbonModal() {
        const modal = document.getElementById('twibbon-modal');
        if (modal) modal.classList.add('open');
        }

        function closeTwibbonModal() {
        const modal = document.getElementById('twibbon-modal');
        if (modal) modal.classList.remove('open');
        }

        function simulateDownload(twibbonType) {
        const loaderId = twibbonType === 'Senior Asisten' ? 'loader-asisten' : 'loader-junior';
        const btnId = twibbonType === 'Senior Asisten' ? 'btn-dl-asisten' : 'btn-dl-junior';
        const loader = document.getElementById(loaderId);
        const btn = document.getElementById(btnId);

        if (!loader || !btn) return;

        btn.style.pointerEvents = 'none';
        loader.style.transform = 'translateX(0)';

        setTimeout(() => {
            closeTwibbonModal();

            let fileUrl = '';
            if (twibbonType === 'Senior Asisten') {
            fileUrl = 'assets/images/SENIOR.png';
            } else {
            fileUrl = 'assets/images/JUNIOR.png';
            }

            const link = document.createElement('a');
            link.download = `Twibbon_${twibbonType.replace(/\s+/g, '_')}_Regenerasi2026.png`;
            link.href = fileUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
            const messageElement = document.getElementById('success-message');
            if (messageElement) {
                messageElement.innerHTML = `Twibbon resmi <strong>${twibbonType}</strong> berhasil diunduh secara instan! Silakan pasang foto terbaik Anda menggunakan aplikasi edit foto pilihan Anda.`;
            }
            const successPopup = document.getElementById('success-popup');
            if (successPopup) successPopup.classList.add('open');

            setTimeout(() => {
                btn.style.pointerEvents = 'auto';
                loader.style.transition = 'none';
                loader.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                loader.style.transition = 'transform 2s cubic-bezier(0.1, 0.8, 0.2, 1)';
                }, 50);
            }, 500);
            }, 400);
        }, 2000);
        }

        function closeSuccessPopup() {
        const successPopup = document.getElementById('success-popup');
        if (successPopup) successPopup.classList.remove('open');
        }

        function startFireworks() {
        const canvas = document.getElementById('fireworks-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        fireworksActive = true;

        class Particle {
            constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 6 + 2;
            this.dx = Math.cos(angle) * velocity;
            this.dy = Math.sin(angle) * velocity;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            }

            draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
            }

            update() {
            this.x += this.dx;
            this.y += this.dy;
            this.dy += 0.04;
            this.alpha -= this.decay;
            }
        }

        const colors = ['#F3E3F8', '#FFF4C8', '#4DB4C8', '#E96A9A', '#F2C84B', '#EEA06E'];

        function launchFirework() {
            const targetX = Math.random() * width;
            const targetY = Math.random() * (height * 0.5) + 50;
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 40; i += 1) {
            particles.push(new Particle(targetX, targetY, color));
            }
        }

        let lastLaunch = 0;
        function animateLoop(now) {
            if (!fireworksActive) return;
            requestAnimationFrame(animateLoop);
            ctx.clearRect(0, 0, width, height);

            if (now - lastLaunch > 1800) {
            launchFirework();
            lastLaunch = now;
            }

            for (let i = particles.length - 1; i >= 0; i -= 1) {
            const p = particles[i];
            p.update();
            p.draw();
            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
            }
        }

        requestAnimationFrame(animateLoop);
        }

        function openImageModal(imageSrc, captionText) {
        const imgModal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-full-img');
        const modalCaption = document.getElementById('modal-img-caption');
        if (!imgModal || !modalImg) return;

        modalImg.src = imageSrc;
        if (modalCaption) modalCaption.innerText = captionText || '';
        imgModal.classList.remove('hidden');
        imgModal.style.display = 'flex';
        }

        function closeImageModal() {
        const imgModal = document.getElementById('image-modal');
        if (!imgModal) return;
        imgModal.style.display = 'none';
        imgModal.classList.add('hidden');
        }

        document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('click', (e) => {
            const polaroidCard = e.target.closest('.polaroid');
            if (polaroidCard) {
            const imgSrc = polaroidCard.getAttribute('data-img');
            const imgCaption = polaroidCard.getAttribute('data-caption');
            if (imgSrc) openImageModal(imgSrc, imgCaption);
            }
        });

        const imageModal = document.getElementById('image-modal');
        if (imageModal) {
            imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImageModal();
            });
        }
        });
