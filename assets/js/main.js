

document.addEventListener('DOMContentLoaded', function () {
    


function initializeAdvancedPopup() {
        const imageGalleryPopup = document.getElementById('image-gallery-popup');
        if (!imageGalleryPopup) {
            console.error("Lỗi: Không tìm thấy container của thư viện ảnh #image-gallery-popup");
            return () => {};
        }

        const closeBtn = imageGalleryPopup.querySelector('.gallery-close-btn');
        const mainImage = document.getElementById('gallery-main-image');
        const imageCaption = document.getElementById('gallery-caption');
        const thumbnailList = imageGalleryPopup.querySelector('.gallery-thumbnail-strip');
        const prevBtn = imageGalleryPopup.querySelector('.gallery-nav-btn.prev');
        const nextBtn = imageGalleryPopup.querySelector('.gallery-nav-btn.next');
        const zoomInBtn = document.getElementById('lightbox-zoom-in');
        const zoomOutBtn = document.getElementById('lightbox-zoom-out');
        
        let currentGallery = [];
        let currentImageIndex = 0;
        let scale = 1, lastScale = 1, initialPinchDistance = 0;
        let translateX = 0, translateY = 0;
        let isPanning = false, isPinching = false;
        let startX = 0, startY = 0, lastX = 0;
        const swipeThreshold = 50;

        const updateZoomButtons = () => {
            if (!zoomInBtn || !zoomOutBtn) return;
            zoomOutBtn.disabled = scale <= 1;
            zoomInBtn.disabled = scale >= 3;
        };
        const updateImageTransform = () => { if(mainImage) mainImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`; };
        const resetTransform = () => {
            scale = 1; lastScale = 1;
            translateX = 0; translateY = 0;
            updateImageTransform();
            updateZoomButtons();
        };

        const adjustZoom = (amount) => {
            scale += amount;
            scale = Math.max(1, Math.min(3, scale));
            updateImageTransform();
            updateZoomButtons();
        };

        const showSlide = (index) => {
            if (!currentGallery || currentGallery.length === 0) return;
            resetTransform();
            currentImageIndex = (index + currentGallery.length) % currentGallery.length;
            const item = currentGallery[currentImageIndex];
            mainImage.src = item.src;
            imageCaption.textContent = item.caption;
            const isSingleImage = currentGallery.length <= 1;
            prevBtn.style.display = isSingleImage ? 'none' : 'flex';
            nextBtn.style.display = isSingleImage ? 'none' : 'flex';
            thumbnailList.querySelectorAll('img').forEach((thumb, idx) => {
                thumb.classList.toggle('active', idx === currentImageIndex);
                if (idx === currentImageIndex) {
                    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        };

        const openPopup = (galleryData, startIndex = 0) => {
            currentGallery = galleryData;
            thumbnailList.innerHTML = galleryData.map((item, index) => 
                `<img src="${item.src}" data-index="${index}" alt="${item.caption || ''}">`
            ).join('');
            showSlide(startIndex);
            imageGalleryPopup.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        const closePopup = () => { 
            imageGalleryPopup.classList.remove('open');
            document.body.style.overflow = 'auto';
        };

        const getPinchDistance = (e) => Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);

        mainImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                isPinching = true; isPanning = false;
                initialPinchDistance = getPinchDistance(e);
                lastScale = scale;
            } else if (e.touches.length === 1) {
                isPanning = true; isPinching = false;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
                lastX = e.touches[0].clientX;
            }
        });

        mainImage.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (isPinching && e.touches.length === 2) {
                const currentPinchDistance = getPinchDistance(e);
                scale = lastScale * (currentPinchDistance / initialPinchDistance);
                scale = Math.max(1, Math.min(3, scale));
                updateImageTransform();
                updateZoomButtons();
            } else if (isPanning && e.touches.length === 1) {
                if (scale > 1) {
                    translateX = e.touches[0].clientX - startX;
                    translateY = e.touches[0].clientY - startY;
                    updateImageTransform();
                }
            }
        }, { passive: false });

        mainImage.addEventListener('touchend', (e) => {
            if (isPinching) { isPinching = false; lastScale = scale; }
            if (isPanning) {
                isPanning = false;
                if (scale <= 1) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const swipeDistance = touchEndX - lastX;
                    if (swipeDistance > swipeThreshold) showSlide(currentImageIndex - 1);
                    else if (swipeDistance < -swipeThreshold) showSlide(currentImageIndex + 1);
                }
            }
            if (scale < 1) { resetTransform(); }
            if (e.touches.length === 1) {
                isPanning = true; isPinching = false;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
            }
        });

        mainImage.addEventListener('wheel', e => {
            e.preventDefault();
            adjustZoom(e.deltaY * -0.005);
        }, { passive: false });

        thumbnailList.addEventListener('click', (e) => { if(e.target.matches('img')) showSlide(parseInt(e.target.dataset.index)); });
        closeBtn.addEventListener('click', closePopup);
        prevBtn.addEventListener('click', () => showSlide(currentImageIndex - 1));
        nextBtn.addEventListener('click', () => showSlide(currentImageIndex + 1));
        imageGalleryPopup.addEventListener('click', (e) => { if (e.target.id === 'image-gallery-popup') closePopup(); });
        
        if (zoomInBtn) zoomInBtn.addEventListener('click', () => adjustZoom(0.25));
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => adjustZoom(-0.25));
        
        return openPopup;
    }

    window.openCustomLightbox = initializeAdvancedPopup();


    const openAdvancedGallery = initializeAdvancedPopup();

    /**
     * ========================================================================
     * CÁC HÀM SETUP VÀ KHỞI TẠO
     * ========================================================================
     */

    // [MỚI] BỔ SUNG LẠI HÀM INIT HERO GALLERY
    function initHeroGallery() {
    const heroContainer = document.querySelector('.project-hero-section');
    if (!heroContainer) return;
    
    // 1. Lấy dữ liệu từ danh sách ảnh ẩn làm nguồn dữ liệu chính
    const galleryDataList = heroContainer.querySelectorAll('.gallery-image-list a');
    const galleryData = Array.from(galleryDataList).map(item => ({
        src: item.getAttribute('href'),
        caption: item.getAttribute('data-caption') || ''
    }));

    if (galleryData.length === 0) return;

    // 2. XỬ LÝ CHO GIAO DIỆN DESKTOP
    const desktopTriggers = heroContainer.querySelectorAll('.hero-gallery-desktop .gallery-trigger');
    desktopTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(trigger.dataset.index, 10);
            if (window.openCustomLightbox) {
                window.openCustomLightbox(galleryData, index);
            }
        });
    });

    const viewAllDesktop = document.getElementById('view-all-desktop');
    if(viewAllDesktop) {
        // [MODIFIED] Cập nhật số lượng ảnh cho nút "Xem tất cả"
        const viewAllText = viewAllDesktop.querySelector('span');
        if (viewAllText) {
            viewAllText.textContent = `${galleryData.length} Ảnh`;
        }
        // [END MODIFIED]

        viewAllDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Ngăn sự kiện click vào thẻ a cha
            if (window.openCustomLightbox) {
                window.openCustomLightbox(galleryData, 0); // Mở gallery từ ảnh đầu tiên
            }
        });
    }

    // 3. XỬ LÝ CHO GIAO DIỆN MOBILE (BAO GỒM CẢ VUỐT VÀ CLICK)
    const mobileContainer = heroContainer.querySelector('.hero-gallery-mobile');
    if (mobileContainer) {
        const mainImageMobileLink = mobileContainer.querySelector('.mobile-main-image a');
        const mainImageMobile = document.getElementById('main-hero-image-mobile');
        const thumbnailScroller = mobileContainer.querySelector('.hero-thumbnail-scroller');
        
        // Kiểm tra các thành phần cần thiết cho mobile
        if (!mainImageMobile || !thumbnailScroller || !mainImageMobileLink) return;

        let currentIndex = 0;
        let touchStartX = 0;
        const swipeThreshold = 50; // Khoảng cách vuốt tối thiểu để tính là một lần vuốt (px)

        // Hàm cập nhật ảnh chính
        function updateMainImage(index) {
            const newImageSrc = galleryData[index]?.src;
            if (newImageSrc) {
                mainImageMobile.src = newImageSrc;
                mainImageMobileLink.href = newImageSrc; // Cập nhật link để lightbox mở đúng ảnh
                mainImageMobileLink.dataset.index = index;
            }
        }

        // Hàm cập nhật trạng thái của các ảnh nhỏ
        function updateThumbnails(index) {
            const allThumbnails = thumbnailScroller.querySelectorAll('.thumbnail-item');
            allThumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
            // Tự động cuộn đến thumbnail đang active
            const activeThumbnail = allThumbnails[index];
            if (activeThumbnail) {
                activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }

        // Hàm xử lý chuyển ảnh (trái hoặc phải)
        function navigate(direction) {
            const newIndex = currentIndex + direction;
            // Chỉ thay đổi nếu index mới nằm trong giới hạn của gallery
            if (newIndex >= 0 && newIndex < galleryData.length) {
                currentIndex = newIndex;
                updateMainImage(currentIndex);
                updateThumbnails(currentIndex);
            }
        }

        // Tạo các ảnh nhỏ trong thanh cuộn
        thumbnailScroller.innerHTML = ''; // Xóa các ảnh cũ (nếu có)
        galleryData.forEach((item, index) => {
            const thumbLink = document.createElement('a');
            thumbLink.href = "#";
            thumbLink.className = 'thumbnail-item';
            if (index === 0) thumbLink.classList.add('active'); // Active ảnh đầu tiên
            thumbLink.innerHTML = `<img src="${item.src}" alt="${item.caption}">`;
            
            // Gán sự kiện click cho từng ảnh nhỏ
            thumbLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = index;
                updateMainImage(currentIndex);
                updateThumbnails(currentIndex);
            });
            thumbnailScroller.appendChild(thumbLink);
        });

        // Gán sự kiện vuốt cho ảnh chính
        mainImageMobile.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        mainImageMobile.addEventListener('touchend', (e) => {
            if (touchStartX === 0) return;
            let touchEndX = e.changedTouches[0].clientX;
            let swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                // Vuốt sang phải (ảnh trước đó)
                if (swipeDistance > 0) {
                    navigate(-1);
                } 
                // Vuốt sang trái (ảnh tiếp theo)
                else {
                    navigate(1);
                }
            }
            touchStartX = 0; // Reset lại điểm bắt đầu
        });

        // Gán sự kiện mở lightbox cho ảnh chính trên mobile
        mainImageMobileLink.addEventListener('click', e => {
             e.preventDefault();
             const index = parseInt(mainImageMobileLink.dataset.index, 10);
             if (window.openCustomLightbox) {
                window.openCustomLightbox(galleryData, index);
            }
        });
    }
}
    
    function setupGalleryTriggers(containerSelector, dataListSelector, triggerSelector) {
        const galleryContainer = document.querySelector(containerSelector);
        if (!galleryContainer) return;
        const triggerButtons = galleryContainer.querySelectorAll(triggerSelector);
        const galleryDataList = galleryContainer.querySelectorAll(dataListSelector);
        const galleryData = Array.from(galleryDataList).map(item => ({
            src: item.getAttribute('href') || item.getAttribute('data-src'),
            caption: item.getAttribute('data-caption') || item.querySelector('.slide-caption')?.textContent || ''
        }));
        if (triggerButtons.length === 0 || galleryData.length === 0) return;
        triggerButtons.forEach((btn, index) => {
            if (!btn.hasAttribute('data-index')) {
                btn.dataset.index = index;
            }
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let startIndex = parseInt(btn.dataset.index, 10);
                if (isNaN(startIndex)) { startIndex = 0; }
                openAdvancedGallery(galleryData, startIndex);
            });
        });
    }

    function initSingleImageTriggers() {
        const singleTriggers = document.querySelectorAll('.lightbox-trigger:not(.gallery-trigger):not(.amenity-trigger):not(.photo-card):not(.carousel-slide)');
        singleTriggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                e.preventDefault();
                const singleImageGallery = [{
                    src: trigger.getAttribute('href') || trigger.getAttribute('data-src'),
                    caption: trigger.getAttribute('data-caption') || trigger.querySelector('img')?.alt || ''
                }];
                openAdvancedGallery(singleImageGallery, 0);
            });
        });
    }


    function init() {
       
        initFooterAccordion();
        initUptopButton();
        initAllModals();
        initAllCarousels();
        initActualPhotosSection(); 
        populateFeaturedNews()
        
        
        // [SỬA ĐỔI] Gọi lại hàm initHeroGallery để tạo thumbnail
        initHeroGallery();
   
      

        setupGalleryTriggers('.project-hero-section', '.gallery-image-list a', '.gallery-trigger, #view-all-desktop');
        setupGalleryTriggers('.amenities-section', '.amenities-image-list a', '.amenity-trigger');
        setupGalleryTriggers('.handover-standards-section', '.carousel-slide', '.carousel-slide');
        
        document.querySelectorAll('.photo-year-group').forEach((group, index) => {
            const uniqueId = `photo-group-${index}`;
            group.id = uniqueId;
            setupGalleryTriggers(`#${uniqueId}`, '.photo-data a', '.photo-card');
        });
        
        initFloorPlanSelector();
        initContactForm();
        initPageBottomForm()
        initSingleImageTriggers();
    }
    
    // --- CÁC HÀM KHÁC GIỮ NGUYÊN ---
    function initActualPhotosSection() {
        document.querySelectorAll('.photo-year-group').forEach(group => {
            const grid = group.querySelector('.photo-grid');
            const dataContainer = group.querySelector('.photo-data');
            if (!grid || !dataContainer) return;
            const allLinks = Array.from(dataContainer.querySelectorAll('a'));
            const galleryData = allLinks.map(link => ({ src: link.getAttribute('href'), caption: link.getAttribute('data-caption') || '' }));
            grid.innerHTML = '';
            const createPhotoCard = (item, index, isViewMore = false) => {
                const card = document.createElement('a');
                card.href = "#";
                card.className = isViewMore ? 'photo-card view-more' : 'photo-card';
                card.dataset.index = isViewMore ? 0 : index;
                if (isViewMore) {
                    card.innerHTML = `<img src="${item.src}" alt="Xem thêm"><div class="photo-card-overlay"><div class="view-more-content"><span>+${item.caption}</span><p>Xem tất cả</p></div></div>`;
                } else {
                    card.innerHTML = `<img src="${item.src}" alt="${item.caption}"><div class="photo-caption">${item.caption}</div>`;
                }
                grid.appendChild(card);
            };
            if (galleryData.length <= 4) {
                galleryData.forEach((item, index) => createPhotoCard(item, index, false));
            } else {
                galleryData.slice(0, 3).forEach((item, index) => createPhotoCard(item, index, false));
                const viewMoreItem = { src: galleryData[3].src, caption: galleryData.length - 3 };
                createPhotoCard(viewMoreItem, 0, true);
            }
        });
    }
    function initFooterAccordion() {
        const accordionToggles = document.querySelectorAll('.footer-widget h4.accordion-toggle');
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    toggle.classList.toggle('active');
                    const content = toggle.nextElementSibling;
                    content.style.display = content.style.display === "block" ? "none" : "block";
                }
            });
        });
    }
    function initUptopButton() {
        const uptopBtn = document.getElementById('uptop-btn');
        if (uptopBtn) {
            window.addEventListener('scroll', () => {
                uptopBtn.classList.toggle('visible', window.scrollY > 300);
            });
            uptopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    function initAllModals() {
        const setupModal = (openBtnId, modalId, closeBtnId) => {
            const modal = document.getElementById(modalId);
            const openBtn = document.getElementById(openBtnId);
            const closeBtn = document.getElementById(closeBtnId);
            if(modal && openBtn && closeBtn) {
                const closeFunc = () => modal.style.display = 'none';
                openBtn.addEventListener('click', () => modal.style.display = 'flex');
                closeBtn.addEventListener('click', closeFunc);
                modal.addEventListener('click', e => { if (e.target === modal) closeFunc(); });
            }
        };
        setupModal('floating-contact-btn', 'contact-modal', 'modal-close-btn');
    }
    function initAllCarousels() {
        document.querySelectorAll('.standards-carousel-container, .subdivision-carousel-container').forEach(container => {
            const wrapper = container.querySelector('.carousel-wrapper, .subdivision-carousel-wrapper');
            const track = container.querySelector('.carousel-track, .subdivision-carousel-track');
            const prevBtn = container.querySelector('.arrow-prev');
            const nextBtn = container.querySelector('.arrow-next');
            if (!wrapper || !track || !prevBtn || !nextBtn) return;
            const scrollBySlide = (direction) => {
                const slide = track.querySelector('.carousel-slide, .subdivision-card');
                if (slide) {
                    const gap = parseInt(window.getComputedStyle(track).gap) || 30;
                    wrapper.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: 'smooth' });
                }
            };
            nextBtn.addEventListener('click', () => scrollBySlide(1));
            prevBtn.addEventListener('click', () => scrollBySlide(-1));
        });
    }
    function initFloorPlanSelector() {
    const floorPlanSection = document.querySelector('.floor-plan-section');
    if (!floorPlanSection) return;

    // Dữ liệu Demo (Giữ nguyên)
    const floorPlanData = {
        'assets/images/matbang1.jpg': [{ code: 'A-01 (2PN)', image: 'assets/images/macan1.jpg' }, { code: 'A-02 (2PN)', image: 'assets/images/macan2.jpg' }],
        'assets/images/matbang2.jpg': [{ code: 'B-01 (1PN)', image: 'assets/images/macan4.jpg' }],
        'assets/images/matbang3.jpg': [{ code: 'C-01 (3PN)', image: 'assets/images/macan6.jpg' }],
        'assets/images/matbang4.jpg': [{ code: 'D-01 (1PN+)', image: 'assets/images/macan7.jpg' }]
    };

    const floorBtns = floorPlanSection.querySelectorAll('.floor-btn');
    const mainPlanImg = floorPlanSection.querySelector('#main-floor-plan-img');
    const mainPlanLink = floorPlanSection.querySelector('#main-floor-plan-link');
    const unitSelect = floorPlanSection.querySelector('#unit-select');
    const dropdown = floorPlanSection.querySelector('#other-floors-dropdown');

    function updateUnitSelector(planSrc) {
        if (!unitSelect) return;
        const units = floorPlanData[planSrc] || [];
        unitSelect.innerHTML = '<option value="">Chọn mã căn</option>';
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.image;
            option.textContent = unit.code;
            unitSelect.appendChild(option);
        });
    }

    // Gán sự kiện cho tất cả các nút chọn tầng (bao gồm cả trong dropdown)
    floorBtns.forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            floorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const planSrc = this.getAttribute('data-plan-src');
            if (planSrc) {
                if (mainPlanImg) mainPlanImg.src = planSrc;
                if (mainPlanLink) {
                    mainPlanLink.href = planSrc;
                    mainPlanLink.dataset.src = planSrc;
                }
                updateUnitSelector(planSrc);
            }

            // Nếu nút được click nằm trong dropdown, đóng dropdown lại
            if (this.closest('.dropdown-menu')) {
                this.closest('.dropdown-menu').classList.remove('show');
            }
        });
    });

    // Xử lý sự kiện cho nút dropdown "Tầng khác"
    if (dropdown) {
        const toggleBtn = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggleBtn && menu) {
            toggleBtn.addEventListener('click', function (event) {
                event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                menu.classList.toggle('show'); // Bật/tắt dropdown
            });
        }
    }

    // Xử lý đóng dropdown khi click ra ngoài
    window.addEventListener('click', function (event) {
        if (dropdown && !dropdown.contains(event.target)) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.remove('show');
            }
        }
    });

    // Xử lý cho select box chọn mã căn (giữ nguyên)
    if (unitSelect) {
        unitSelect.addEventListener('change', function() {
            const selectedUnitImgSrc = this.value;
            if (selectedUnitImgSrc && window.openAdvancedGallery) {
                const singleImageGallery = [{ src: selectedUnitImgSrc, caption: this.options[this.selectedIndex].text }];
                openAdvancedGallery(singleImageGallery, 0);
                this.value = "";
            }
        });
    }
    
    // Khởi tạo cho tầng active mặc định
    const initialActiveBtn = floorPlanSection.querySelector('.floor-btn.active');
    if (initialActiveBtn) {
        updateUnitSelector(initialActiveBtn.getAttribute('data-plan-src'));
    }
}
    function initContactForm() {
    const contactModal = document.getElementById('contact-modal');
    if (!contactModal) return;

    const modalContent = contactModal.querySelector('.modal-content');
    const form = contactModal.querySelector('.contact-form');
    
    if (!form || !modalContent) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn form gửi đi theo cách truyền thống

        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[name="phone"]');

        // Kiểm tra dữ liệu đầu vào
        if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
            alert('Vui lòng nhập đầy đủ họ tên và số điện thoại.');
            return;
        }

        // Ẩn tất cả các phần tử con của modal-content
        const originalChildren = Array.from(modalContent.children);
        originalChildren.forEach(child => {
            child.style.display = 'none';
        });

        // Tạo hoặc tìm và hiển thị thông báo thành công
        let successMessage = modalContent.querySelector('.form-success-message');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            modalContent.appendChild(successMessage);
        }
        successMessage.innerHTML = `
            <h3>Cảm ơn bạn!</h3>
            <p>Chúng tôi đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất.</p>
        `;
        successMessage.style.display = 'block';

        // Tự động đóng popup và khôi phục form sau 3 giây
        setTimeout(() => {
            contactModal.style.display = 'none'; // Đóng popup

            // Khôi phục lại trạng thái ban đầu của các phần tử con
            originalChildren.forEach(child => {
                child.style.display = ''; // Dùng '' để trình duyệt tự quyết định (flex, block, etc.)
            });
            successMessage.style.display = 'none';
            form.reset(); // Xóa dữ liệu đã nhập trong form
        }, 3000);
    });
}
// [MỚI] HÀM XỬ LÝ FORM LIÊN HỆ CUỐI TRANG
function initPageBottomForm() {
    const form = document.getElementById('page-bottom-contact-form');
    if (!form) return;

    const container = form.parentElement;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[name="phone"]');

        if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
            alert('Vui lòng nhập đầy đủ họ tên và số điện thoại.');
            return;
        }

        // Ẩn form đi
        form.style.display = 'none';

        // Tạo và hiển thị thông báo thành công
        let successMessage = container.querySelector('.form-success-message');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            container.appendChild(successMessage);
        }
        successMessage.innerHTML = `
            <h3>Cảm ơn bạn!</h3>
            <p>Chúng tôi đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất.</p>
        `;
        successMessage.style.display = 'block';

        // Cuộn tới thông báo để người dùng thấy
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}
function populateFeaturedNews() {
    // Chỉ chạy logic này nếu tìm thấy khu vực tin tức và có dữ liệu
    const featuredNewsContainer = document.querySelector('.featured-news-grid');
    if (!featuredNewsContainer || typeof allNewsArticles === 'undefined' || allNewsArticles.length === 0) {
        return;
    }

    const mainPostContainer = featuredNewsContainer.querySelector('.featured-post-large');
    const secondaryPostsContainer = featuredNewsContainer.querySelector('.secondary-posts');

    if (!mainPostContainer || !secondaryPostsContainer) return;

    // Lấy bài viết đầu tiên làm bài chính
    const mainArticle = allNewsArticles[0];
    // Lấy 3 bài viết tiếp theo làm bài phụ
    const secondaryArticles = allNewsArticles.slice(1, 4);

    // Hiển thị bài viết chính
    if (mainArticle) {
        const articleLink = `bai-viet-chi-tiet.html?id=${mainArticle.id}`;
        mainPostContainer.innerHTML = `
            <div class="post-thumbnail-large">
                <a href="${articleLink}">
                    <img src="${mainArticle.image}" alt="${mainArticle.title}">
                </a>
                <div class="post-content-large">
                    <h2 class="post-title-large">
                        <a href="${articleLink}">${mainArticle.title}</a>
                    </h2>
                </div>
            </div>
        `;
    }

    // Hiển thị các bài viết phụ
    secondaryPostsContainer.innerHTML = ''; // Xóa các bài viết tĩnh
    secondaryArticles.forEach(article => {
        const articleLink = `bai-viet-chi-tiet.html?id=${article.id}`;
        const articleElement = document.createElement('article');
        articleElement.className = 'secondary-post-small';
        articleElement.innerHTML = `
            <a href="${articleLink}" class="post-thumbnail-small">
                <img src="${article.image}" alt="${article.title}">
            </a>
            <div class="post-content-small">
                <h3 class="post-title-small"><a href="${articleLink}">${article.title}</a></h3>
            </div>
        `;
        secondaryPostsContainer.appendChild(articleElement);
    });
}

    
    // Bắt đầu chạy tất cả
    init();
});