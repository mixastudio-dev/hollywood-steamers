const header = document.querySelector('header');

if (header) {
    const toggleScrolledClass = () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', toggleScrolledClass);
    toggleScrolledClass();
}

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            const currentPath = window.location.pathname;
            const linkPath = this.pathname;

            if (linkPath !== '' && linkPath !== currentPath) {
                const url = linkPath + targetId;
                window.location.href = url;
            } else {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const windowHeight = window.innerHeight;
                const elementHeight = targetElement.offsetHeight;

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (windowHeight / 2) + (elementHeight / 2);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                history.pushState(null, null, targetId);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var modalButtons = document.querySelectorAll('.open-modal-dialog'),
        overlay = document.querySelector('body'),
        closeButtons = document.querySelectorAll('.modal-dialog .modal-close');

    var currentOpenModal = null;

    async function openModal(modalBtn) {
        return new Promise(resolve => {
            var modalId = modalBtn.getAttribute('data-src'),
                modalElem = document.querySelector('.modal-dialog.' + modalId);

            if (currentOpenModal && currentOpenModal !== modalElem) {
                closeModalDirectly(currentOpenModal);
            }

            overlay.classList.add('modal-open');
            modalElem.style.display = 'flex';

            setTimeout(function() {
                modalElem.classList.add('modal-opening');
                currentOpenModal = modalElem;
                resolve();
            }, 0);
        });
    }

    async function closeModal(closeBtn) {
        return new Promise(resolve => {
            var modal = closeBtn.closest('.modal-dialog');
            modal.classList.remove('modal-opening');
            modal.classList.add('modal-closing');

            setTimeout(function() {
                modal.classList.remove('modal-closing');
                modal.style.display = 'none';
                overlay.classList.remove('modal-open');
                if (currentOpenModal === modal) {
                    currentOpenModal = null;
                }
                resolve();
            }, 500);
        });
    }

    function closeModalDirectly(modalElem) {
        modalElem.classList.remove('modal-opening');
        modalElem.style.display = 'none';

        if (currentOpenModal === modalElem) {
            currentOpenModal = null;
        }

        var anyModalOpen = document.querySelector('.modal-dialog[style*="display: flex"]');
        if (!anyModalOpen) {
            overlay.classList.remove('modal-open');
        }
    }

    /* open modal */
    modalButtons.forEach(function(modalBtn) {
        modalBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            await openModal(modalBtn);
        });
    });

    /* close modal */
    closeButtons.forEach(function(closeBtn) {
        closeBtn.addEventListener('click', async function(e) {
            await closeModal(closeBtn);
        });
    });

    document.querySelectorAll('.modal-dialog').forEach(function(modal) {
        modal.addEventListener('click', async function(e) {
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody && !modalBody.contains(e.target)) {
                await closeModal(modal);
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const headerNav = document.querySelector('.header-nav');

    function isMobileView() {
        return window.innerWidth <= 1024;
    }

    function toggleMenu() {
        if (!isMobileView()) return;

        if (headerNav.classList.contains('show')) {
            headerNav.classList.remove('show');
            document.body.style.overflow = '';
        } else {
            headerNav.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        headerNav.classList.remove('show');
        document.body.style.overflow = '';
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    const menuLinks = document.querySelectorAll('.main-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobileView() && headerNav.classList.contains('show')) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
});

function checkVisibility() {
    const blocks = document.querySelectorAll('.animate-block');

    blocks.forEach(block => {
        if (block.hasAttribute('data-animated')) {
            return;
        }

        const rect = block.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const isInFooter = block.closest('footer');
        const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

        const isVisible = rect.top <= windowHeight - offset && rect.bottom >= 0;

        if (isVisible) {
            const delay = block.getAttribute('data-delay') || 0;
            setTimeout(() => {
                block.classList.add('animated');
                block.setAttribute('data-animated', 'true');
            }, parseInt(delay));
        }
    });
}

function checkAllBlocks() {
    const blocks = document.querySelectorAll('.animate-block');

    blocks.forEach(block => {
        if (block.hasAttribute('data-animated')) {
            return;
        }

        const rect = block.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const isInFooter = block.closest('footer');
        const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

        if (rect.top <= windowHeight - offset && rect.bottom >= 0) {
            const delay = block.getAttribute('data-delay') || 0;
            setTimeout(() => {
                block.classList.add('animated');
                block.setAttribute('data-animated', 'true');
            }, parseInt(delay));
        }
    });
}

window.addEventListener('load', function() {
    checkVisibility();
    setTimeout(checkAllBlocks, 500);
});

window.addEventListener('scroll', checkVisibility);

window.addEventListener('resize', function() {
    setTimeout(checkAllBlocks, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider-before-after');

    sliders.forEach(slider => {
        let animationFrame;

        slider.addEventListener('mouseleave', function() {
            const startValue = parseFloat(this.value) || 50;
            const startTime = performance.now();
            const duration = 300;

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const currentValue = startValue + (50 - startValue) * progress;
                slider.value = currentValue;

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(animate);
        });

        slider.addEventListener('mouseenter', function() {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        });
    });
});

var swiper1 = new Swiper(".before-after-slider", {
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    slidesPerView: 2,
    spaceBetween: 30,
    watchSlidesProgress: true,
    noSwiping: true,
    noSwipingSelector: 'img-comparison-slider, .comparison-slider',

    navigation: {
        nextEl: ".before-after-section .swiper-button-next",
        prevEl: ".before-after-section .swiper-button-prev",
    },
    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        601: {
            slidesPerView: 1.5,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
    }
});

var swiper2 = new Swiper(".examples-slider", {
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    slidesPerView: 2,
    spaceBetween: 30,
    watchSlidesProgress: true,

    navigation: {
        nextEl: ".service-examples-section .swiper-button-next",
        prevEl: ".service-examples-section .swiper-button-prev",
    },
    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        601: {
            slidesPerView: 1.5,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
    }
});

class CustomVideoPlayer {
    constructor(container) {
        this.container = container;
        this.video = container.querySelector('video');
        this.playButton = container.querySelector('.btn-play');

        if (!this.video || !this.playButton) return;

        this.init();
    }

    init() {
        this.video.removeAttribute('controls');
        this.video.setAttribute('playsinline', '');
        this.video.setAttribute('webkit-playsinline', '');
        this.video.setAttribute('preload', 'metadata');
        this.video.muted = true;

        this.poster = this.video.getAttribute('poster');

        if (!this.poster) {
            this.showPlayButton();
        } else {
            this.video.addEventListener('loadeddata', () => {
                this.showPlayButton();
            });
        }

        this.bindEvents();
    }

    showPlayButton() {
        this.playButton.style.opacity = '1';
        this.playButton.style.transition = 'opacity 0.3s ease';
        this.playButton.style.pointerEvents = 'auto';
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            e.stopPropagation();

            if (this.video.readyState === 0) {
                this.video.load();
                this.showPlayButton();
                return;
            }

            this.toggleVideo(e);
        });

        this.playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleVideo(e);
        });

        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
        this.video.addEventListener('ended', () => this.onEnded());

        this.video.addEventListener('error', () => {
            console.log('Ошибка загрузки видео');
            this.container.style.background = '#f0f0f0';
            this.playButton.style.display = 'flex';
        });
    }

    toggleVideo(e) {
        e.stopPropagation();

        if (this.video.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    play() {
        if (this.video.paused) {
            this.video.muted = true;

            const playPromise = this.video.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Видео не может быть воспроизведено автоматически');
                    this.video.setAttribute('controls', '');
                    this.playButton.style.display = 'none';
                });
            }
        }
    }

    pause() {
        if (!this.video.paused) {
            this.video.pause();
        }
    }

    onPlay() {
        this.playButton.style.opacity = '0';
        this.playButton.style.pointerEvents = 'none';
    }

    onPause() {
        this.playButton.style.opacity = '1';
        this.playButton.style.pointerEvents = 'auto';
    }

    onEnded() {
        this.playButton.style.opacity = '1';
        this.playButton.style.pointerEvents = 'auto';
        this.video.currentTime = 0;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.card-video');

    videoCards.forEach(container => {
        new CustomVideoPlayer(container);
    });
});

class TabsManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.tabButtons = this.container.querySelectorAll('.nav-button');
        this.tabPanels = this.container.querySelectorAll('.tab-panel');
        this.isAnimating = false;
        this.swipers = new Map();

        this.init();
    }

    init() {
        if (this.tabButtons.length > 0) {
            this.tabButtons[0].classList.add('active');
        }
        if (this.tabPanels.length > 0) {
            this.tabPanels[0].classList.add('active');

            const firstTabId = this.tabPanels[0].dataset.tabId;
            if (firstTabId) {
                this.initSwiper(parseInt(firstTabId));
            }
        }

        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (this.isAnimating) return;

                const button = e.currentTarget;
                const tabId = button.dataset.tabId;

                if (tabId) {
                    this.switchTab(parseInt(tabId));
                }
            });
        });
    }

    initSwiper(tabId) {
        if (this.swipers.has(tabId)) return;

        const panel = this.container.querySelector(`.tab-panel[data-tab-id="${tabId}"]`);
        if (!panel) return;

        const sliderWrapper = panel.querySelector('.swiper-wrapper');
        if (!sliderWrapper || sliderWrapper.children.length === 0) return;

        // Конфигурация для видео слайдера
        const swiperConfig = {
            slidesPerView: 1,
            spaceBetween: 16,
            navigation: {
                nextEl: panel.querySelector('.swiper-button-next'),
                prevEl: panel.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 2.9,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            }
        };

        const swiper = new Swiper(panel.querySelector('.slider-wrapper'), swiperConfig);
        this.swipers.set(tabId, swiper);
    }

    switchTab(targetTabId) {
        const targetButton = this.container.querySelector(`.nav-button[data-tab-id="${targetTabId}"]`);
        const targetPanel = this.container.querySelector(`.tab-panel[data-tab-id="${targetTabId}"]`);

        if (!targetButton || !targetPanel) return;
        if (targetButton.classList.contains('active')) return;

        this.isAnimating = true;

        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanels.forEach(panel => panel.classList.remove('active'));

        targetButton.classList.add('active');
        targetPanel.classList.add('active');

        this.initSwiper(targetTabId);

        setTimeout(() => {
            const swiper = this.swipers.get(targetTabId);
            if (swiper && swiper.update) {
                swiper.update();
            }
            this.isAnimating = false;
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TabsManager('.testimonials');
});


class CatalogSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.swiper = null;
        this.wrapper = this.container.querySelector('.swiper-wrapper');
        this.pagination = this.container.querySelector('.swiper-pagination');

        this.init();

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    init() {
        if (window.innerWidth <= 1024) {
            this.initSwiper();
        }
    }

    initSwiper() {
        this.container.classList.add('swiper');
        this.wrapper?.classList.add('swiper-wrapper');

        this.swiper = new Swiper(this.container, {
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: this.pagination,
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            }
        });
    }

    destroySwiper() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
        }
    }

    handleResize() {
        if (window.innerWidth <= 1024 && !this.swiper) {
            this.initSwiper();
        } else if (window.innerWidth > 1024 && this.swiper) {
            this.destroySwiper();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CatalogSlider('.catalog-slider');
});


class BlogSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.swiper = null;
        this.wrapper = this.container.querySelector('.swiper-wrapper');
        this.pagination = this.container.querySelector('.swiper-pagination');

        this.init();

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    init() {
        if (window.innerWidth <= 1024) {
            this.initSwiper();
        }
    }

    initSwiper() {
        this.container.classList.add('swiper');
        this.wrapper?.classList.add('swiper-wrapper');

        this.swiper = new Swiper(this.container, {
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: this.pagination,
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            }
        });
    }

    destroySwiper() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
        }
    }

    handleResize() {
        if (window.innerWidth <= 1024 && !this.swiper) {
            this.initSwiper();
        } else if (window.innerWidth > 1024 && this.swiper) {
            this.destroySwiper();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CatalogSlider('.blog-slider');
});


document.addEventListener('DOMContentLoaded', function () {
    const statItems = document.querySelectorAll('.block-stats-js .stat-item .item-title');

    function animateNumber(element, target, suffix, duration) {
        let start = null;
        let startValue = 0;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const current = Math.floor(progress * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent.trim();
                const match = text.match(/^([\d.]+)(.*)$/);

                if (match && !element.hasAttribute('data-animated')) {
                    const target = parseFloat(match[1]);
                    const suffix = match[2];
                    const duration = parseInt(element.dataset.duration) || 2000;

                    animateNumber(element, target, suffix, duration);
                    element.setAttribute('data-animated', 'true');
                    observer.unobserve(element);
                }
            }
        });
    }, {threshold: 0.5});

    statItems.forEach(item => observer.observe(item));
});
