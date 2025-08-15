document.addEventListener('DOMContentLoaded', function () {

    // Gộp dữ liệu bán và cho thuê vào một nguồn duy nhất để tra cứu
    const allData = {
        ...(typeof allProductsData !== 'undefined' ? allProductsData : {}),
        ...(typeof allRentalProductsData !== 'undefined' ? allRentalProductsData : {})
    };

    // Hàm helper để chuyển chuỗi thành dạng slug
    const toSlug = (str) => {
        if (!str) return '';
        let s = str.toLowerCase();
        if (s === 'hồ chí minh') return 'tp-ho-chi-minh';
        if (s === 'hà nội') return 'tp-ha-noi';
        s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        s = s.replace(/[đĐ]/g, 'd');
        s = s.replace(/([^0-9a-z-\s])/g, '');
        s = s.replace(/(\s+)/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        return s;
    };

    // Hàm chính khởi tạo trang
    function initPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId || !allData[productId]) {
            console.error("Lỗi: Không tìm thấy ID sản phẩm hoặc dữ liệu không tồn tại.");
            document.querySelector('.product-detail-layout').innerHTML = '<div style="padding: 40px; text-align: center;"><h1>Lỗi: Không tìm thấy sản phẩm</h1><p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p></div>';
            return;
        }

        const product = allData[productId];
        const isRental = product.propertyType === 'Cho thuê';

        populatePageWithProductData(product, isRental);
        initHeroSlider(product);
        setupProductGallery(product); // Sử dụng hàm mới để gán sự kiện cho gallery
        initContactModal(product);
        initInlineContactForm(product);
        initProductDetailFavorites(product);
        if (typeof initFavoritesDrawer === 'function') initFavoritesDrawer();
        if (typeof updateFavoriteCounter === 'function') updateFavoriteCounter();
        initNearbyComparison(product, isRental);
        initSimilarListings(product); // BỔ SUNG: Khởi tạo mục tin đăng tương tự
        initShareButton(product);
        const loanCalculatorSection = document.querySelector('.loan-calculator');
        const priceHistorySection = document.querySelector('.price-history-section-detail');

        if (isRental) {
            if (loanCalculatorSection) loanCalculatorSection.style.display = 'none';
            if (priceHistorySection) priceHistorySection.style.display = 'block';
            initProductDetailChartForRent(product);
        } else {
            if (loanCalculatorSection) loanCalculatorSection.style.display = 'block';
            if (priceHistorySection) priceHistorySection.style.display = 'block';
            initLoanCalculator(product);
            initProductPriceHistoryChart(product);
        }
        initFengShuiModal(); // <-- DÒNG MÃ MỚI THÊM VÀO
    }

    function populatePageWithProductData(product, isRental) {
        document.title = `${product.title} - Chung Cư Tốt`;

        // --- CẬP NHẬT BREADCRUMB ---
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (breadcrumbContainer) {
            const propertyTypeText = isRental ? 'Cho thuê' : 'Mua bán';
            const listingPage = isRental ? 'listing-thue.html' : 'listing-ban.html';
            const categorySlug = toSlug(product.productCategory);
            const citySlug = toSlug(product.city);
            const wardSlug = toSlug(product.ward);
            const streetSlug = toSlug(product.street);

            const breadcrumbParts = [];

            // 1. Gộp Tên menu và Loại hình thành một mục không link
            let firstCrumbText = propertyTypeText;
            if (product.productCategory) {
                firstCrumbText += ` ${product.productCategory}`;
            }
            breadcrumbParts.push(`<span class="breadcrumb-item-no-link">${firstCrumbText}</span>`);

            // 2. Tạo các cấp tiếp theo là link
            if (product.city && citySlug) {
                breadcrumbParts.push(`<a href="${listingPage}?loaihinh=${categorySlug}&thanhpho=${citySlug}">${product.city}</a>`);
            }
            if (product.ward && wardSlug) {
                breadcrumbParts.push(`<a href="${listingPage}?loaihinh=${categorySlug}&thanhpho=${citySlug}&phuong=${wardSlug}">${product.ward}</a>`);
            }

            // Cấp cuối cùng là Tên sản phẩm, luôn là text tĩnh
            breadcrumbParts.push(`<span class="breadcrumb-item-no-link">${product.title}</span>`);

            breadcrumbContainer.innerHTML = breadcrumbParts.join(' > ');
        }

        // --- CÁC PHẦN CẬP NHẬT GIAO DIỆN KHÁC (GIỮ NGUYÊN) ---
        const address = `${product.street}, ${product.ward}, ${product.city}`;
        document.querySelector('h1').textContent = product.title;
        const addressLine = document.querySelector('.address-line');
        if (addressLine) addressLine.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> ${address}`;

        const priceValueEl = document.querySelector('.price-value'),
            priceUnitEl = document.querySelector('.info-unit-price');
        if (isRental) {
            priceValueEl.textContent = `${product.price.toLocaleString('vi-VN')} triệu/tháng`;
            if (priceUnitEl) priceUnitEl.style.display = 'none';
        } else {
            priceValueEl.textContent = `${product.price.toLocaleString('vi-VN')} tỷ`;
            if (priceUnitEl) {
                const pricePerSqM = (product.price * 1000 / product.area).toFixed(1);
                priceUnitEl.textContent = `~ ${pricePerSqM} triệu/m²`;
                priceUnitEl.style.display = 'inline';
            }
        }
        const specs = document.querySelectorAll('.other-specs-group .info-value');
        if (specs.length === 3) {
            specs[0].textContent = `${product.area} m²`;
            specs[1].textContent = `${product.bedrooms}`;
            specs[2].textContent = `${product.wc}`;
        }

        const descriptionContent = document.querySelector('.description-content');
        if (descriptionContent) descriptionContent.innerHTML = `<h2>Mô tả chi tiết</h2><p>${product.description.replace(/\n/g, '</p><p>')}</p>`;

        const tbody = document.getElementById('product-detail-tbody');
        if (tbody) {
            let detailMap = isRental ?
                [{
                    label: "Nội thất",
                    value: product.furniture
                }, {
                    label: "Phòng ngủ",
                    value: product.bedrooms
                }, {
                    label: "WC",
                    value: product.wc
                }, {
                    label: "Tầng",
                    value: product.floor
                }, {
                    label: "View",
                    value: product.view
                }, {
                    label: "Hướng cửa",
                    value: `${product.doorDirection} <a href="#" id="phong-thuy-trigger" style="text-decoration: underline; font-weight: 500; margin-left: 8px;">Phong thuỷ theo tuổi</a>`
                }, {
                    label: "Hướng ban công",
                    value: product.balconyDirection || '-'
                }, {
                    label: "Giá điện/nước",
                    value: product.utilitiesPrice || "Giá nhà nước"
                }, {
                    label: "Thời hạn thuê",
                    value: product.leaseTerm
                }, {
                    label: "Ngày đăng",
                    value: product.publishedAt
                }, {
                    label: "Mã tin",
                    value: product.id
                }] :
                [{
                    label: "Pháp lý",
                    value: product.legal
                }, {
                    label: "Nội thất",
                    value: product.furniture
                }, {
                    label: "Phòng ngủ",
                    value: product.bedrooms
                }, {
                    label: "WC",
                    value: product.wc
                }, {
                    label: "Tầng",
                    value: product.floor
                }, {
                    label: "View",
                    value: product.view
                }, {
                    label: "Hướng cửa",
                    value: `${product.doorDirection} <a href="#" id="phong-thuy-trigger" style="text-decoration: underline; font-weight: 500; margin-left: 8px;">Phong thuỷ theo tuổi</a>`
                }, {
                    label: "Hướng ban công",
                    value: product.balconyDirection || '-'
                }, {
                    label: "Ngày đăng",
                    value: product.publishedAt
                }, {
                    label: "Mã tin",
                    value: product.id
                }];
            tbody.innerHTML = detailMap.map(item => `<tr><th>${item.label}</th><td>${(item.value && item.value.toString().trim() !== '') ? item.value : '-'}</td></tr>`).join('');
        }

        const similarWardNameEl = document.getElementById('similar-ward-name'),
            similarListingsLinkEl = document.getElementById('similar-listings-cta-link');
        if (similarWardNameEl && similarListingsLinkEl) {
            similarWardNameEl.textContent = `${product.ward}, ${product.city}`;
            similarListingsLinkEl.href = `${isRental ? 'listing-thue.html' : 'listing-ban.html'}?loaihinh=${toSlug(product.productCategory)}&thanhpho=${toSlug(product.city)}&phuong=${toSlug(product.ward)}`;
        }

        const projectLinkCard = document.querySelector('.project-card-link');
        if (projectLinkCard && product.project) {
            projectLinkCard.style.display = 'flex';
            projectLinkCard.querySelector('.project-thumbnail').src = `assets/images/${product.projectImage || 'project-overview.jpg'}`;
            projectLinkCard.querySelector('.project-thumbnail').alt = `Thumbnail dự án ${product.project}`;
            const projectLink = projectLinkCard.querySelector('.project-content a');
            projectLink.textContent = product.project;
        } else if (projectLinkCard) {
            projectLinkCard.style.display = 'none';
        }

        const mapFrame = document.querySelector('.map-container iframe');
        if (mapFrame) {
            mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }

        if (!isRental) {
            const propertyValueInput = document.getElementById('lc-property-value');
            if (propertyValueInput) {
                propertyValueInput.value = product.price;
                propertyValueInput.dispatchEvent(new Event('input', {
                    bubbles: true
                }));
            }
        }

        const contactInfoElements = [{
            selector: '.contact-sidebar .broker-card',
            avatar: '.broker-avatar',
            name: '.broker-name',
            call: '.btn-call',
            zalo: '.btn-zalo'
        }, {
            selector: '.mobile-cta-bar',
            call: '.btn-call',
            zalo: '.btn-zalo'
        }];
        contactInfoElements.forEach(config => {
            const container = document.querySelector(config.selector);
            if (container) {
                if (config.avatar) container.querySelector(config.avatar).src = `assets/images/${product.brokerAvatar}`;
                if (config.name) container.querySelector(config.name).textContent = product.brokerName;
                const callBtn = container.querySelector(config.call);
                if (callBtn) callBtn.href = `tel:${product.brokerPhone}`;
                const zaloBtn = container.querySelector(config.zalo);
                if (zaloBtn) zaloBtn.href = `https://zalo.me/${product.brokerPhone.replace(/^0/, '')}`;
            }
        });
        const modalCallBtn = document.querySelector('#contact-modal .modal-phone-link');
        if (modalCallBtn) {
            modalCallBtn.href = `tel:${product.brokerPhone}`;
            modalCallBtn.querySelector('span').textContent = `Gọi ngay: ${product.brokerPhone}`;
        }
    }

    function initHeroSlider(product) {
        const slider = document.querySelector('.hero-slider');
        if (!slider || !product || !product.images || product.images.length === 0) return;
        const track = slider.querySelector('.slider-track');
        track.innerHTML = '';
        product.images.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="assets/images/${img}" alt="${product.title} - ảnh ${index + 1}">`;
            track.appendChild(slide);
        });
        const slides = Array.from(track.children),
            dotsContainer = document.querySelector('.slider-dots'),
            playPauseBtn = document.querySelector('.play-pause-btn');
        if (!track || !dotsContainer || !playPauseBtn || slides.length === 0) return;
        let currentIndex = 0,
            isPaused = false,
            slideInterval;
        const dots = [];
        dotsContainer.innerHTML = '';
        const dotsToShow = Math.min(slides.length, 5); // Hiển thị tối đa 5 dots
        for (let i = 0; i < dotsToShow; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }

        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach(s => s.classList.remove('active'));
            slides[currentIndex].classList.add('active');
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
            if (!isPaused) resetInterval();
        }
        const nextSlide = () => goToSlide(currentIndex + 1),
            startInterval = () => {
                if (slides.length > 1) {
                    slideInterval = setInterval(nextSlide, 5000);
                }
            },
            resetInterval = () => {
                clearInterval(slideInterval);
                startInterval();
            };
        playPauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            track.classList.toggle('paused', isPaused);
            playPauseBtn.classList.toggle('paused', isPaused);
            isPaused ? clearInterval(slideInterval) : resetInterval();
        });
        goToSlide(0);
    }

    function setupProductGallery(product) {
        if (typeof window.openCustomLightbox !== 'function' || !product.images || product.images.length === 0) {
            const viewAllBtn = document.querySelector('.view-all-btn');
            if (viewAllBtn) viewAllBtn.style.display = 'none';
            return;
        }

        const galleryData = product.images.map((imgSrc, index) => ({
            src: `assets/images/${imgSrc}`,
            caption: `${product.title} - ảnh ${index + 1}`
        }));

        const viewAllBtn = document.querySelector('.view-all-btn');
        if (viewAllBtn) {
            const buttonTextSpan = viewAllBtn.querySelector('span');
            if (buttonTextSpan) buttonTextSpan.textContent = `${galleryData.length} Ảnh`;
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.openCustomLightbox(galleryData, 0);
            });
        }

        const slideTriggers = document.querySelectorAll('.hero-slider .slide');
        slideTriggers.forEach((slide, index) => {
            slide.addEventListener('click', (e) => {
                e.preventDefault();
                window.openCustomLightbox(galleryData, index);
            });
        });
    }

    function initContactModal(product) {
        const openBtn = document.getElementById('sidebar-contact-btn'),
            modal = document.getElementById('contact-modal');
        if (!openBtn || !modal || !product) return;
        const modalContent = modal.querySelector('.modal-content'),
            form = modal.querySelector('.contact-form'),
            closeBtn = modal.querySelector('.modal-close-btn');
        const telLink = `tel:${product.brokerPhone}`,
            modalPhoneLink = document.querySelector('.modal-phone-link');
        if (modalPhoneLink) {
            modalPhoneLink.href = telLink;
            modalPhoneLink.querySelector('span').textContent = `Gọi ngay: ${product.brokerPhone}`;
        }
        const closeModal = () => {
            modal.style.display = 'none';
        };
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
        if (form && modalContent) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const nameInput = form.querySelector('input[name="name"]'),
                    phoneInput = form.querySelector('input[name="phone"]');
                if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
                    alert('Vui lòng nhập đầy đủ họ tên và số điện thoại.');
                    return;
                }
                const originalChildren = Array.from(modalContent.children);
                originalChildren.forEach(child => {
                    if (!child.classList.contains('form-success-message')) {
                        child.style.display = 'none';
                    }
                });
                let successMessage = modalContent.querySelector('.form-success-message');
                if (!successMessage) {
                    successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    modalContent.appendChild(successMessage);
                }
                successMessage.innerHTML = `<h3>Cảm ơn bạn!</h3><p>Chúng tôi đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất.</p>`;
                successMessage.style.display = 'block';
                setTimeout(() => {
                    closeModal();
                    originalChildren.forEach(child => {
                        child.style.display = '';
                    });
                    successMessage.style.display = 'none';
                    form.reset();
                }, 3000);
            });
        }
    }

    function initInlineContactForm() {
        const form = document.getElementById('inline-contact-form');
        if (!form) return;
        const container = form.parentElement;
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const nameInput = form.querySelector('input[name="name"]'),
                phoneInput = form.querySelector('input[name="phone"]');
            if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
                alert('Vui lòng nhập đầy đủ họ tên và số điện thoại.');
                return;
            }
            form.style.display = 'none';
            let successMessage = container.querySelector('.form-success-message');
            if (!successMessage) {
                successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                container.appendChild(successMessage);
            }
            successMessage.innerHTML = `<h3>Cảm ơn bạn!</h3><p>Chuyên gia của chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>`;
            successMessage.style.display = 'block';
        });
    }

    function initProductDetailFavorites(product) {
        const favoriteBtn = document.querySelector('.hero-actions .favorite-btn');
        if (!favoriteBtn) return;
        favoriteBtn.dataset.itemId = product.id;
        updateAllFavoriteButtons();
        updateFavoriteCounter();

    }

    function initNearbyComparison(product, isRental) {
        const container = document.getElementById('nearby-comparison-container');
        const grid = document.getElementById('comparison-grid');
        const titleEl = document.getElementById('nearby-comparison-title');
        if (!container || !grid || !titleEl || typeof nearbyData === 'undefined') {
            return;
        }
        let neighbors = [];
        let isProjectComparison = false;
        if (product.project && nearbyData.projects && nearbyData.projects[product.project]) {
            neighbors = nearbyData.projects[product.project];
            titleEl.textContent = 'So sánh giá các dự án lân cận';
            isProjectComparison = true;
        } else if (product.ward && nearbyData.wards && nearbyData.wards[product.ward]) {
            neighbors = nearbyData.wards[product.ward];
            titleEl.textContent = 'So sánh giá các phường lân cận';
            isProjectComparison = false;
        }
        if (neighbors.length === 0) {
            container.style.display = 'none';
            return;
        }
        const targetPage = isRental ? 'listing-thue.html' : 'listing-ban.html';
        let cardsHTML = '';
        neighbors.forEach(name => {
            const avgPrice = isRental ? (Math.random() * (25 - 8) + 8).toFixed(0) + ' triệu/tháng' : (Math.random() * (8.5 - 2.5) + 2.5).toFixed(1) + ' tỷ';
            const listingsCount = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            const slug = toSlug(name);
            const linkParam = isProjectComparison ? `duan=${slug}` : `phuong=${slug}`;
            const link = `${targetPage}?${linkParam}`;
            cardsHTML += `<a href="${link}" class="comparison-card"><div class="card-content"><h4 class="card-title">${name}</h4><p class="card-price">Giá trung bình: ${avgPrice}</p><p class="card-listings">Có ${listingsCount} tin đăng</p></div><div class="card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg></div></a>`;
        });
        grid.innerHTML = cardsHTML;
        container.style.display = 'block';
    }
    // ========================================================================
    // == HÀM MỚI: KHỞI TẠO MODAL POPUP PHONG THỦY
    // ========================================================================
    
    function initFengShuiModal() {
    if (typeof phongThuyData === 'undefined') {
        console.error('Lỗi: Dữ liệu phong thủy (phongThuyData) không được tải. Hãy kiểm tra lại thứ tự tải tệp script trong HTML.');
        return;
    }

     const openBtn = document.getElementById('phong-thuy-trigger');
    const modal = document.getElementById('feng-shui-modal');
    if (!openBtn || !modal) return;

    const closeBtn = modal.querySelector('.modal-close-btn');
    const inputWrapper = document.getElementById('feng-shui-input-wrapper');
    const resultWrapper = document.getElementById('feng-shui-result-wrapper');
    const form = document.getElementById('feng-shui-form');
    const errorDiv = document.getElementById('feng-shui-error');
    const backBtn = document.getElementById('feng-shui-back-btn');

    const showInputView = () => {
        resultWrapper.style.display = 'none';
        inputWrapper.style.display = 'block';
        // THAY ĐỔI: Xóa dòng form.reset() để giữ lại thông tin đã nhập.
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    openBtn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', closeModal);
    backBtn.addEventListener('click', showInputView);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorDiv.style.display = 'none';

        const birthYear = parseInt(form.querySelector('input[name="birth_year"]').value, 10);
        const gender = form.querySelector('select[name="gender"]').value;
        const birthYearStr = form.querySelector('input[name="birth_year"]').value.trim();
        
        if (!/^\d{4}$/.test(birthYearStr) || birthYear < 1000) {
            errorDiv.textContent = 'Lỗi: Vui lòng nhập năm sinh hợp lệ (4 chữ số, từ 1000 trở đi).';
            errorDiv.style.display = 'block';
            return;
        }
        if (!gender) {
            errorDiv.textContent = 'Lỗi: Vui lòng chọn giới tính.';
            errorDiv.style.display = 'block';
            return;
        }

        const results = calculateFengShui(birthYear, gender);
        if (!results) {
             errorDiv.textContent = 'Lỗi: Không thể tính toán với dữ liệu được cung cấp.';
             errorDiv.style.display = 'block';
             return;
        }

        displayResults(results);
        inputWrapper.style.display = 'none';
        resultWrapper.style.display = 'block';
    });

    function calculateFengShui(birthYear, gender) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear + 1;

        const lastDigit = birthYear % 10;
        const thienCan = phongThuyData.thien_can.find(c => c.so_cuoi === lastDigit)?.can;
        const chiRemainder = birthYear % 12;
        const diaChiObj = phongThuyData.dia_chi.find(c => c.so_du === chiRemainder);
        if (!thienCan || !diaChiObj) return null;
        const diaChi = diaChiObj.dia_chi;
        const diaChiImg = diaChiObj.url;
        const lunarYearName = `${thienCan} ${diaChi}`;

        const nguHanhNapAm = phongThuyData.ngu_hanh_nap_am.find(item => item.can_chi === lunarYearName)?.ngu_hanh;

        const sumOfDigits = birthYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        let cungRemainder = sumOfDigits % 9;
        if (cungRemainder === 0) cungRemainder = 9;
        const traCuuCungObj = phongThuyData.cung_menh.tra_cuu_cung.find(c => c.so_du === cungRemainder);
        if (!traCuuCungObj) return null;
        const cung = (gender === 'Nam') ? traCuuCungObj.nam : traCuuCungObj.nu;
        
        const hanhCung = phongThuyData.cung_menh.hanh_theo_cung.find(h => h.cung === cung)?.hanh;
        
        const huongObj = phongThuyData.huong.find(h => h.cung === cung);
        if (!huongObj) return null;

        const getExplanation = (y_nghia) => phongThuyData.dien_giai_huong.find(d => d.y_nghia === y_nghia)?.giai_thich || '';

        const goodDirections = [
            { name: 'Sinh khí', direction: huongObj.sinh_khi, explanation: getExplanation('Sinh khí') },
            { name: 'Thiên y', direction: huongObj.thien_y, explanation: getExplanation('Thiên y') },
            { name: 'Diên niên', direction: huongObj.dien_nien, explanation: getExplanation('Diên niên') },
            { name: 'Phục vị', direction: huongObj.phuc_vi, explanation: getExplanation('Phục vị') }
        ];

        const badDirections = [
            { name: 'Tuyệt mệnh', direction: huongObj.tuyet_menh, explanation: getExplanation('Tuyệt mệnh') },
            { name: 'Ngũ quỷ', direction: huongObj.ngu_quy, explanation: getExplanation('Ngũ quỷ') },
            { name: 'Lục sát', direction: huongObj.luc_sat, explanation: getExplanation('Lục sát') },
            { name: 'Hoạ hại', direction: huongObj.hoa_hai, explanation: getExplanation('Hoạ hại') }
        ];

        const dongTuTrachHuong = ['Đông', 'Đông Nam', 'Nam', 'Bắc'];
        const isDongTuTrach = goodDirections.some(h => dongTuTrachHuong.includes(h.direction));
        const trach = isDongTuTrach ? 'Đông Tứ Trạch' : 'Tây Tứ Trạch';

        const mauSacObj = phongThuyData.mau_sac.find(m => m.hanh === hanhCung);
        const colors = mauSacObj ? {
            tuong_sinh: mauSacObj.tuong_sinh,
            hoa_hop: mauSacObj.hoa_hop,
            che_khac: mauSacObj.che_khac,
            bi_khac: mauSacObj.bi_khac
        } : null;

        return { birthYear, gender, age, thienCan, diaChi, diaChiImg, lunarYearName, nguHanhNapAm, cung, hanhCung, goodDirections, badDirections, trach, colors };
    }

   function displayResults(data) {
    const { birthYear, gender, age, lunarYearName, hanhCung, trach, colors } = data;
    
    const hopMau = colors ? `${colors.tuong_sinh}, ${colors.hoa_hop}` : "N/A";
    const newTitleHTML = `${gender} ${age} tuổi (${lunarYearName} ${birthYear}) Mệnh ${hanhCung}. Hợp hướng: <strong>${trach}</strong>, hợp màu: <strong>${hopMau}</strong>`;
    document.getElementById('feng-shui-result-title').innerHTML = newTitleHTML;

    const { diaChi, diaChiImg, nguHanhNapAm, cung, thienCan } = data;
    const infoCol = document.getElementById('feng-shui-info-col');
    infoCol.innerHTML = `
        <p><strong>Sinh năm:</strong> ${lunarYearName}</p>
        <p><strong>Giới tính:</strong> ${gender}</p>
        <p><strong>Tuổi âm lịch:</strong> ${age}</p>
        <p><strong>Ngũ hành:</strong> ${nguHanhNapAm || 'N/A'}</p>
        <p><strong>Thiên can:</strong> ${thienCan}</p>
        <p><strong>Địa chi:</strong> ${diaChi}</p>
        <p><strong>Cung – Mệnh:</strong> ${cung} – ${hanhCung}</p>
    `;

    const imageCol = document.getElementById('feng-shui-image-col');
    imageCol.innerHTML = `<img src="assets/images/phong-thuy/${diaChiImg}" alt="${diaChi}">`;

    const { goodDirections, badDirections } = data;
    const huongContainer = document.getElementById('feng-shui-huong-results');
    let huongHTML = `<p style="font-size: 16px; margin-bottom: 15px;"><strong>Thuộc:</strong> <strong style="color: var(--primary-color);">${trach}</strong></p>`;
    
    const goodIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>`;
    const badIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f44336"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>`;
    
    huongHTML += '<h5>HƯỚNG TỐT</h5>';
    goodDirections.forEach(h => {
        huongHTML += `<div class="analysis-item good">
                        <div class="analysis-icon">${goodIconSVG}</div>
                        <div class="analysis-content">
                            <h5>${h.name} (${h.direction})</h5>
                            <p>${h.explanation}</p>
                        </div>
                     </div>`;
    });

    if (colors) {
        huongHTML += '<h5>MÀU HỢP MỆNH</h5>';
        huongHTML += `<div class="analysis-item good">
                        <div class="analysis-icon">${goodIconSVG}</div>
                        <div class="analysis-content">
                            <h5>Tương sinh</h5>
                            <p>${colors.tuong_sinh}</p>
                        </div>
                     </div>`;
        huongHTML += `<div class="analysis-item good">
                        <div class="analysis-icon">${goodIconSVG}</div>
                        <div class="analysis-content">
                            <h5>Hoà hợp</h5>
                            <p>${colors.hoa_hop}</p>
                        </div>
                     </div>`;
    }

    huongHTML += '<h5>HƯỚNG XẤU</h5>';
    badDirections.forEach(h => {
        huongHTML += `<div class="analysis-item bad">
                        <div class="analysis-icon">${badIconSVG}</div>
                        <div class="analysis-content">
                            <h5>${h.name} (${h.direction})</h5>
                            <p>${h.explanation}</p>
                        </div>
                     </div>`;
    });

    if (colors) {
        huongHTML += '<h5>MÀU KỴ MỆNH</h5>';
        huongHTML += `<div class="analysis-item bad">
                        <div class="analysis-icon">${badIconSVG}</div>
                        <div class="analysis-content">
                            <h5>Chế khắc</h5>
                            <p>${colors.che_khac}</p>
                        </div>
                     </div>`;
        huongHTML += `<div class="analysis-item bad">
                        <div class="analysis-icon">${badIconSVG}</div>
                        <div class="analysis-content">
                            <h5>Bị khắc</h5>
                            <p>${colors.bi_khac}</p>
                        </div>
                     </div>`;
    }
    
    huongContainer.innerHTML = huongHTML;
}
}
    /**
     * BỔ SUNG: Tìm và hiển thị các tin đăng tương tự dựa trên một bộ quy tắc.
     * @param {object} currentProduct - Đối tượng sản phẩm cho trang hiện tại.
     */
    function initSimilarListings(currentProduct) {
        if (!currentProduct) return;

        const currentProductId = currentProduct.id;

        /**
         * Tìm các tin đăng tương tự dựa trên giá, loại, danh mục và vị trí.
         * @returns {Array} Một mảng các đối tượng sản phẩm tương tự.
         */
        function findSimilarListings() {
            const priceLowerBound = currentProduct.price * 0.8;
            const priceUpperBound = currentProduct.price * 1.2;
            const allListings = Object.values(allData);

            const filtered = allListings.filter(item => {
                // Loại bỏ chính nó và các sản phẩm không hợp lệ
                if (item.id === currentProductId || !item.price || !item.propertyType || !item.productCategory) {
                    return false;
                }

                // Điều kiện bắt buộc
                const isSameType = item.propertyType === currentProduct.propertyType;
                const isSameCategory = item.productCategory === currentProduct.productCategory;
                const isAvailable = item.status !== "Đã bán" && item.status !== "Đã cho thuê";
                const isInPriceRange = item.price >= priceLowerBound && item.price <= priceUpperBound;

                return isSameType && isSameCategory && isAvailable && isInPriceRange;
            });

            // Chấm điểm ưu tiên vị trí
            const scored = filtered.map(item => {
                let score = 0;
                if (currentProduct.project && item.project === currentProduct.project) {
                    score = 3; // Ưu tiên 1: Cùng dự án
                } else if (currentProduct.street && item.street === currentProduct.street) {
                    score = 2; // Ưu tiên 2: Cùng đường
                } else if (currentProduct.ward && item.ward === currentProduct.ward) {
                    score = 1; // Ưu tiên 3: Cùng phường
                }
                return { ...item,
                    score
                };
            });

            // Sắp xếp và chọn kết quả
            const sorted = scored
                .filter(item => item.score > 0) // Chỉ lấy các sản phẩm có chung vị trí
                .sort((a, b) => {
                    // Ưu tiên điểm cao hơn, sau đó là tin mới hơn
                    if (b.score !== a.score) {
                        return b.score - a.score;
                    }
                    return new Date(b.publishedAt) - new Date(a.publishedAt);
                });

            return sorted.slice(0, 4); // Lấy tối đa 4 tin
        }

        /**
         * Hiển thị các tin đăng tương tự đã tìm thấy vào DOM.
         * @param {Array} listings - Một mảng các đối tượng sản phẩm để hiển thị.
         */
        function renderSimilarListings(listings) {
            const gridContainer = document.querySelector('.similar-listings-grid');
            const sectionContainer = document.querySelector('.similar-listings-section');

            if (!gridContainer || !sectionContainer) return;

            if (listings.length === 0) {
                sectionContainer.style.display = 'none';
                return;
            }

            gridContainer.innerHTML = listings.map(item => {
                const address = `${item.street}, ${item.ward}, ${item.city}`;
                const priceDisplay = (item.propertyType === 'Cho thuê') ?
                    `${item.price.toLocaleString('vi-VN')} triệu/tháng` :
                    `${item.price.toLocaleString('vi-VN')} tỷ`;

                // Logic tạo nhãn trạng thái
                let labelHTML = '';
                if (item.status && item.status.trim() !== '') {
                    let labelClass = '';
                    const statusLower = item.status.toLowerCase();
                    if (statusLower.includes('giá tốt') || statusLower.includes('duy nhất')) {
                        labelClass = 'label-good-price';
                    }
                    if (labelClass) {
                        labelHTML = `<span class="product-label ${labelClass}">${item.status}</span>`;
                    }
                }

                const imageUrl = (item.images && item.images.length > 0) ? item.images[0] : 'placeholder.jpg';
                const imageCount = (item.images) ? item.images.length : 0;

                return `
                 <a href="product-detail.html?id=${item.id}" class="product-list-card">
                     <div class="product-card-image">
                         <img src="assets/images/${imageUrl}" alt="${item.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e2e8f0/e2e8f0?text=Lỗi+Ảnh';">
                         ${labelHTML}
                         <div class="image-overlay-top">
                             <button class="favorite-btn" data-item-id="${item.id}" title="Thêm vào yêu thích">
                                 <svg class="heart-outline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>
                                 <svg class="heart-solid" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                             </button>
                         </div>
                         <div class="image-overlay-bottom">
                             <div class="image-count"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path></svg><span>${imageCount}</span></div>
                         </div>
                     </div>
                     <div class="product-card-content">
                         <h3 class="product-card-title">${item.title}</h3>
                         <p class="product-card-address">${address}</p>
                         <div class="product-price-specs-wrapper">
                             <div class="product-card-price">${priceDisplay}</div>
                             <div class="product-card-specs-inline">
                                 <span>${item.bedrooms} PN</span>
                                 <span>${item.wc} WC</span>
                                 <span>${item.area} m²</span>
                             </div>
                         </div>
                     </div>
                 </a>
             `;
            }).join('');

            // Kích hoạt lại chức năng cho các nút yêu thích vừa tạo
            if (typeof updateAllFavoriteButtons === 'function') {
                updateAllFavoriteButtons();
            }
        }

        // Chạy logic tìm và hiển thị
        const similarListings = findSimilarListings();
        renderSimilarListings(similarListings);
    }

    function initLoanCalculator(product) {
        const form = document.getElementById('loan-calculator-form');
        if (!form) return;
        const propertyValueEl = document.getElementById('lc-property-value'),
            loanAmountEl = document.getElementById('lc-loan-amount'),
            loanSliderEl = document.getElementById('lc-loan-slider'),
            loanPercentageEl = document.getElementById('lc-loan-percentage'),
            loanTermEl = document.getElementById('lc-loan-term'),
            promoMonthsEl = document.getElementById('lc-promo-months'),
            promoRateEl = document.getElementById('lc-promo-rate'),
            annualRateEl = document.getElementById('lc-annual-rate'),
            methodEl = document.getElementById('lc-method'),
            resultsWrapperEl = document.getElementById('lc-results-wrapper'),
            showScheduleBtn = document.getElementById('lc-show-schedule-btn'),
            scheduleModal = document.getElementById('lc-schedule-modal'),
            closeModalBtn = document.getElementById('lc-modal-close-btn');
        if (product && propertyValueEl) {
            propertyValueEl.value = product.price;
            propertyValueEl.dispatchEvent(new Event('input', {
                bubbles: true
            }));
        }
        const parseNum = (str) => parseFloat(str) || 0,
            formatCurrency = (num) => Math.round(num).toLocaleString('vi-VN');
        const updateLoanAmount = () => {
            const propertyValue = parseNum(propertyValueEl.value),
                percentage = parseNum(loanSliderEl.value);
            loanAmountEl.value = (propertyValue * (percentage / 100)).toFixed(2);
        };
        const updateSliderAndPercentage = () => {
            const propertyValue = parseNum(propertyValueEl.value);
            let loanAmount = parseNum(loanAmountEl.value);
            if (loanAmount > propertyValue) {
                loanAmount = propertyValue;
                loanAmountEl.value = loanAmount.toFixed(2);
            }
            const percentage = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
            loanSliderEl.value = percentage;
            loanPercentageEl.textContent = `Vay ${Math.round(percentage)}%`;
        };
        propertyValueEl.addEventListener('input', updateLoanAmount);
        loanAmountEl.addEventListener('input', updateSliderAndPercentage);
        loanSliderEl.addEventListener('input', () => {
            updateLoanAmount();
            loanPercentageEl.textContent = `Vay ${loanSliderEl.value}%`;
        });
        
        const validateLoanTerms = () => {
        const loanTerm = parseInt(loanTermEl.value, 10) || 0;
        let promoMonths = parseInt(promoMonthsEl.value, 10) || 0;

        if (promoMonths > loanTerm) {
            alert("Số tháng ưu đãi không được lớn hơn thời gian vay. Đã tự động điều chỉnh.");
            promoMonthsEl.value = loanTerm;
        }
        };

        const validateLoanRates = () => {
            const annualRate = parseFloat(annualRateEl.value) || 0;
            let promoRate = parseFloat(promoRateEl.value) || 0;

            if (promoRate > annualRate) {
                alert("Lãi suất ưu đãi không được cao hơn lãi suất thông thường. Đã tự động điều chỉnh.");
                promoRateEl.value = annualRate;
            }
        };
        loanTermEl.addEventListener('input', validateLoanTerms);
    promoMonthsEl.addEventListener('input', validateLoanTerms);
    annualRateEl.addEventListener('input', validateLoanRates);
    promoRateEl.addEventListener('input', validateLoanRates);
        showScheduleBtn.addEventListener('click', () => {
            scheduleModal.style.display = 'flex';
        });
        closeModalBtn.addEventListener('click', () => {
            scheduleModal.style.display = 'none';
        });
        scheduleModal.addEventListener('click', (e) => {
            if (e.target === scheduleModal) {
                scheduleModal.style.display = 'none';
            }
        });
        const calculateReducingBalance = (p, n, m, r_month, r_promo_month, annual_rate, promo_rate) => {
            const schedule = [],
                principalPayment = p / n;
            let totalInterest = 0;
            for (let k = 1; k <= n; k++) {
                const openingBalance = p - (k - 1) * principalPayment;
                let applicableMonthlyRate, displayAnnualRate;
                if (k <= m) {
                    applicableMonthlyRate = r_promo_month;
                    displayAnnualRate = promo_rate;
                } else {
                    applicableMonthlyRate = r_month;
                    displayAnnualRate = annual_rate;
                }
                const interestPayment = openingBalance * applicableMonthlyRate,
                    totalPayment = principalPayment + interestPayment,
                    closingBalance = openingBalance - principalPayment;
                totalInterest += interestPayment;
                schedule.push({
                    period: k,
                    openingBalance,
                    annualRateDisplay: displayAnnualRate,
                    interestPayment,
                    principalPayment,
                    totalPayment,
                    closingBalance
                });
            }
            return {
                schedule,
                totalInterest
            };
        };
        const calculateAnnuity = (p, n, m, r_month, r_promo_month, annual_rate, promo_rate) => {
            const schedule = [];
            let totalInterest = 0,
                currentBalance = p;
            const A1 = m > 0 ? p * (r_promo_month * Math.pow(1 + r_promo_month, n)) / (Math.pow(1 + r_promo_month, n) - 1) : 0;
            const p_remaining = m > 0 ? p * Math.pow(1 + r_promo_month, m) - A1 * (Math.pow(1 + r_promo_month, m) - 1) / r_promo_month : p;
            const A2 = (n - m > 0) ? p_remaining * (r_month * Math.pow(1 + r_month, n - m)) / (Math.pow(1 + r_month, n - m) - 1) : 0;
            for (let k = 1; k <= n; k++) {
                const openingBalance = currentBalance;
                let totalPayment, applicableMonthlyRate, displayAnnualRate;
                if (k <= m) {
                    totalPayment = A1;
                    applicableMonthlyRate = r_promo_month;
                    displayAnnualRate = promo_rate;
                } else {
                    totalPayment = A2;
                    applicableMonthlyRate = r_month;
                    displayAnnualRate = annual_rate;
                }
                const interestPayment = openingBalance * applicableMonthlyRate,
                    principalPayment = totalPayment - interestPayment,
                    closingBalance = openingBalance - principalPayment;
                totalInterest += interestPayment;
                currentBalance = closingBalance;
                schedule.push({
                    period: k,
                    openingBalance,
                    annualRateDisplay: displayAnnualRate,
                    interestPayment,
                    principalPayment,
                    totalPayment,
                    closingBalance
                });
            }
            return {
                schedule,
                totalInterest
            };
        };
        const displayResults = (results, propertyValue, loanAmount) => {
            const monthlyPaymentEl = document.getElementById('lc-monthly-payment-result'),
                totalInterestEl = document.getElementById('lc-total-interest-result'),
                chartEl = document.getElementById('lc-payment-chart'),
                legendEl = document.getElementById('lc-chart-legend'),
                tableContainerEl = document.getElementById('lc-schedule-table-container');
            if (!monthlyPaymentEl || !totalInterestEl || !chartEl || !legendEl || !tableContainerEl) return;
            const {
                schedule,
                totalInterest
            } = results, payments = schedule.map(item => item.totalPayment), minPayment = Math.min(...payments), maxPayment = Math.max(...payments);
            monthlyPaymentEl.innerHTML = (Math.round(minPayment) === Math.round(maxPayment)) ? `${formatCurrency(minPayment)} VNĐ` : `<span class="light-text">Từ</span> ${formatCurrency(minPayment)} VNĐ <span class="light-text">đến</span> ${formatCurrency(maxPayment)} VNĐ`;
            totalInterestEl.textContent = `${formatCurrency(totalInterest)} VNĐ`;
            const downPayment = propertyValue - loanAmount,
                principal = loanAmount,
                interest = totalInterest,
                totalPaymentValue = downPayment + principal + interest,
                principalColor = '#004238',
                interestColor = '#53b966',
                downPaymentColor = '#f0ad4e';
            let gradientStops = [],
                legendHTML = '';
            if (downPayment > 0) {
                const downPaymentPercent = (downPayment / totalPaymentValue) * 100,
                    principalPercent = (principal / totalPaymentValue) * 100;
                gradientStops.push(`${downPaymentColor} 0% ${downPaymentPercent}%`);
                gradientStops.push(`${principalColor} ${downPaymentPercent}% ${downPaymentPercent + principalPercent}%`);
                gradientStops.push(`${interestColor} ${downPaymentPercent + principalPercent}% 100%`);
                legendHTML += `<div class="legend-item"><div class="legend-color" style="background-color: ${downPaymentColor};"></div><span class="legend-label">Cần trả trước</span><span class="legend-value">${formatCurrency(downPayment)}</span></div>`;
            } else {
                const principalPercent = (principal / totalPaymentValue) * 100;
                gradientStops.push(`${principalColor} 0% ${principalPercent}%`);
                gradientStops.push(`${interestColor} ${principalPercent}% 100%`);
            }
            legendHTML += `<div class="legend-item"><div class="legend-color" style="background-color: ${principalColor};"></div><span class="legend-label">Gốc cần trả</span><span class="legend-value">${formatCurrency(principal)}</span></div>`;
            legendHTML += `<div class="legend-item"><div class="legend-color" style="background-color: ${interestColor};"></div><span class="legend-label">Lãi cần trả</span><span class="legend-value">${formatCurrency(interest)}</span></div>`;
            chartEl.style.background = `conic-gradient(${gradientStops.join(', ')})`;
            legendEl.innerHTML = legendHTML;
            let tableHTML = `<table><thead><tr><th>Kỳ trả</th><th>Dư nợ đầu kỳ<br>(VND)</th><th>Lãi suất áp dụng<br>(%/năm)</th><th>Tiền lãi<br>(VND)</th><th>Tiền gốc<br>(VND)</th><th>Tổng trả<br>(VND)</th><th>Dư nợ cuối kỳ<br>(VND)</th></tr></thead><tbody>`;
            schedule.forEach(row => {
                tableHTML += `<tr><td>${row.period}</td><td>${formatCurrency(row.openingBalance)}</td><td>${row.annualRateDisplay.toFixed(2)}%</td><td>${formatCurrency(row.interestPayment)}</td><td>${formatCurrency(row.principalPayment)}</td><td>${formatCurrency(row.totalPayment)}</td><td>${formatCurrency(Math.abs(row.closingBalance))}</td></tr>`;
            });
            tableHTML += `</tbody><tfoot><tr style="font-weight: 700;"><td colspan="3" style="text-align: center;">TỔNG CỘNG</td><td>${formatCurrency(totalInterest)}</td><td>${formatCurrency(loanAmount)}</td><td>${formatCurrency(loanAmount + totalInterest)}</td><td></td></tr></tfoot></table>`;
            tableContainerEl.innerHTML = tableHTML;
            resultsWrapperEl.style.display = 'flex';
        };
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const propertyValue = parseNum(propertyValueEl.value) * 1e9,
                p = parseNum(loanAmountEl.value) * 1e9,
                n = parseInt(loanTermEl.value),
                m = parseInt(promoMonthsEl.value),
                annual_rate = parseNum(annualRateEl.value),
                promo_rate = parseNum(promoRateEl.value);
            if (p <= 0 || n <= 0 || annual_rate < 0) {
                alert("Vui lòng nhập đầy đủ và chính xác các thông tin bắt buộc (Số tiền vay, Thời gian vay, Lãi suất).");
                return;
            }
            const r_month = annual_rate / 1200,
                r_promo_month = m > 0 ? promo_rate / 1200 : r_month,
                method = methodEl.value;
            let results;
            if (method === 'reducing_balance') {
                results = calculateReducingBalance(p, n, m, r_month, r_promo_month, annual_rate, promo_rate);
            } else {
                results = calculateAnnuity(p, n, m, r_month, r_promo_month, annual_rate, promo_rate);
            }
            displayResults(results, propertyValue, p);
        });
    }

    function initProductPriceHistoryChart(product) {
        const ctx = document.getElementById('product-price-history-chart')?.getContext('2d'),
            yearFiltersContainer = document.getElementById('detail-chart-year-filters'),
            chartTitleElement = document.getElementById('detail-chart-dynamic-title');
        if (!ctx || !yearFiltersContainer || !chartTitleElement || typeof priceHistoryData === 'undefined' || !product) {
            const chartSection = document.querySelector('.price-history-section-detail');
            if (chartSection) chartSection.style.display = 'none';
            return;
        }
        const YEAR_COLORS = {
            '2025': {
                border: 'rgba(54, 162, 235, 1)',
                bg: 'rgba(54, 162, 235, 0.2)'
            },
            '2024': {
                border: 'rgba(255, 99, 132, 1)',
                bg: 'rgba(255, 99, 132, 0.2)'
            },
            '2023': {
                border: 'rgba(75, 192, 192, 1)',
                bg: 'rgba(75, 192, 192, 0.2)'
            },
            '2022': {
                border: 'rgba(255, 159, 64, 1)',
                bg: 'rgba(255, 159, 64, 0.2)'
            },
        };
        const areaGroups = {
            'Dưới 50m²': {
                min: 0,
                max: 49.9
            },
            '50 - 80m²': {
                min: 50,
                max: 79.9
            },
            '80 - 120m²': {
                min: 80,
                max: 119.9
            },
            'Trên 120m²': {
                min: 120,
                max: Infinity
            }
        };
        let productAreaGroupKey = '';
        for (const key in areaGroups) {
            if (product.area >= areaGroups[key].min && product.area <= areaGroups[key].max) {
                productAreaGroupKey = key;
                break;
            }
        }
        if (!productAreaGroupKey) return;
        const category = product.productCategory || 'BĐS';
        const location = product.project ? `tại dự án ${product.project}` : `tại P. ${product.ward}`;
        chartTitleElement.textContent = `Biểu đồ biến động đơn giá ${category} (${productAreaGroupKey}) ${location}`;
        let priceChart;

        function updateChart() {
            const selectedYears = Array.from(yearFiltersContainer.querySelectorAll('button.active')).map(btn => btn.dataset.year).sort((a, b) => b - a);
            const chartData = processChartDataForYears(selectedYears, productAreaGroupKey, product);
            const summaries = calculateSummaries(chartData);
            document.getElementById('summary-card-current').textContent = summaries.current;
            document.getElementById('summary-card-avg').textContent = summaries.avg;
            const currentCardValueEl = document.getElementById('summary-card-current');
            if (currentCardValueEl && currentCardValueEl.parentElement) {
                const currentCardLabelEl = currentCardValueEl.parentElement.querySelector('.card-label');
                if (currentCardLabelEl) {
                    if (summaries.latestMonth && summaries.latestYear) {
                        currentCardLabelEl.textContent = `Giá phổ biến (T${summaries.latestMonth}/${summaries.latestYear})`;
                    } else {
                        currentCardLabelEl.textContent = 'Giá phổ biến (Tháng gần nhất)';
                    }
                }
            }
            const avgCardValueEl = document.getElementById('summary-card-avg');
            if (avgCardValueEl && avgCardValueEl.parentElement) {
                const avgCardLabelEl = avgCardValueEl.parentElement.querySelector('.card-label');
                if (avgCardLabelEl) {
                    if (summaries.startMonth && summaries.startYear && summaries.latestMonth && summaries.latestYear) {
                        // Xử lý trường hợp chỉ có dữ liệu trong 1 tháng
                        if (summaries.startYear === summaries.latestYear && summaries.startMonth === summaries.latestMonth) {
                             avgCardLabelEl.textContent = `Trung bình (T${summaries.startMonth}/${summaries.startYear})`;
                        } else {
                             avgCardLabelEl.textContent = `Trung bình 12 tháng (T${summaries.startMonth}/${summaries.startYear} - T${summaries.latestMonth}/${summaries.latestYear})`;
                        }
                    } else {
                        avgCardLabelEl.textContent = 'Trung bình 12 tháng';
                    }
                }
            }
            const yoyEl = document.getElementById('summary-card-yoy');
            yoyEl.textContent = summaries.yoy;
            yoyEl.className = 'card-value';
            if (summaries.yoyClass) yoyEl.classList.add(summaries.yoyClass);
            if (yoyEl && yoyEl.parentElement) {
                const yoyLabelEl = yoyEl.parentElement.querySelector('.card-label');
                if (yoyLabelEl) {
                    // Kiểm tra xem phép tính có thành công không và có đủ thông tin ngày tháng không
                    if (summaries.yoy !== '--' && summaries.latestMonth && summaries.latestYear) {
                        const previousYear = parseInt(summaries.latestYear, 10) - 1;
                        yoyLabelEl.textContent = `Biến động giá (T${summaries.latestMonth}/${previousYear} - T${summaries.latestMonth}/${summaries.latestYear})`;
                    } else {
                        yoyLabelEl.textContent = 'Biến động giá / 1 năm';
                    }
                }
            }
            const productpublishedAt = new Date(product.publishedAt),
                productMonthIndex = productpublishedAt.getMonth(),
                productUnitPrice = (product.price * 1000 / product.area),
                productDataPoint = Array(12).fill(null);
            productDataPoint[productMonthIndex] = productUnitPrice.toFixed(1);
            const datasets = [];
            selectedYears.forEach(year => {
                const color = YEAR_COLORS[year] || {
                    border: '#ccc',
                    bg: 'rgba(204,204,204,0.2)'
                };
                datasets.push({
                    type: 'line',
                    label: `TB ${year}`,
                    data: chartData[year].avg,
                    borderColor: color.border,
                    backgroundColor: color.bg,
                    fill: 'start',
                    tension: 0.4,
                    borderWidth: 3,
                });
                datasets.push({
                    type: 'line',
                    label: `Cao nhất ${year}`,
                    data: chartData[year].max,
                    borderColor: color.border,
                    borderWidth: 1.5,
                    borderDash: [5, 5],
                    fill: false,
                    hidden: true
                });
                datasets.push({
                    type: 'line',
                    label: `Thấp nhất ${year}`,
                    data: chartData[year].min,
                    borderColor: color.border,
                    borderWidth: 1.5,
                    borderDash: [5, 5],
                    fill: false,
                    hidden: true
                });
            });
            datasets.push({
                type: 'line',
                label: 'Sản phẩm này',
                data: productDataPoint,
                pointStyle: 'star',
                pointRadius: 10,
                pointHoverRadius: 15,
                backgroundColor: '#ef4444',
                borderColor: '#ef4444'
            });
            if (!priceChart) {
                priceChart = new Chart(ctx, {
                    data: {
                        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                        datasets: datasets
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        plugins: {
                            legend: {
                                position: 'bottom'
                            },
                            tooltip: {
                                callbacks: {
                                    title: function (context) {
                                        return `Tháng ${parseInt(context[0].label.replace('T', ''))}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Đơn giá (triệu/m²)'
                                }
                            }
                        }
                    }
                });
            } else {
                priceChart.data.datasets = datasets;
                priceChart.update();
            }
        }

        function setupFilters() {
            const years = Object.keys(priceHistoryData).sort((a, b) => b - a);
            const currentProductYear = new Date(product.publishedAt).getFullYear().toString();
            yearFiltersContainer.innerHTML = '';
            years.forEach((year) => {
                const button = document.createElement('button');
                button.dataset.year = year;
                button.textContent = year;
                if (year === currentProductYear || parseInt(year) === parseInt(currentProductYear) - 1) {
                    button.classList.add('active');
                }
                button.addEventListener('click', function () {
                    this.classList.toggle('active');
                    updateChart();
                });
                yearFiltersContainer.appendChild(button);
            });
        }
        const processChartDataForYears = (years, areaKey, currentProduct) => {
            const processedData = {};
            years.forEach(year => {
                processedData[year] = {
                    avg: Array(12).fill(null),
                    min: Array(12).fill(null),
                    max: Array(12).fill(null)
                };
                const yearData = priceHistoryData[year] || [];
                const monthlyData = Array(12).fill(null).map(() => ({
                    prices: []
                }));
                yearData.forEach(tx => {
                    const isInAreaGroup = (tx.area >= areaGroups[areaKey].min && tx.area <= areaGroups[areaKey].max);
                    if (!isInAreaGroup) {
                        return;
                    }
                    let isLocationMatch = false;
                    if (currentProduct.project) {
                        isLocationMatch = (tx.project === currentProduct.project);
                    } else {
                        isLocationMatch = (tx.ward === currentProduct.ward);
                    }
                    if (isLocationMatch) {
                        const monthIndex = new Date(tx.publishedAt).getMonth();
                        monthlyData[monthIndex].prices.push(tx.unitPrice);
                    }
                });
                monthlyData.forEach((month, i) => {
                    if (month.prices.length > 0) {
                        const sum = month.prices.reduce((a, b) => a + b, 0);
                        processedData[year].avg[i] = parseFloat((sum / month.prices.length).toFixed(1));
                        processedData[year].min[i] = Math.min(...month.prices);
                        processedData[year].max[i] = Math.max(...month.prices);
                    }
                });
            });
            return processedData;
        };
        const calculateSummaries = (chartData) => {
            const allPricesLast12Months = [];
            let latestMonthData = null,
                previousYearLatestMonthData = null;
            const sortedYears = Object.keys(chartData).sort((a, b) => b - a);
            if (sortedYears.length === 0) return {
                current: '--',
                avg: '--',
                yoy: '--'
            };
            const latestYear = sortedYears[0];
            let latestMonthIndex = -1;
            let latestYearStr = '';
            for (let i = 11; i >= 0; i--) {
                if (chartData[latestYear] && chartData[latestYear].avg[i] !== null) {
                    latestMonthIndex = i;
                    latestMonthData = chartData[latestYear].avg[i];
                    latestYearStr = latestYear;
                    break;
                }
            }
            if (latestMonthIndex !== -1 && sortedYears.length > 1) {
                const previousYearStr = (parseInt(latestYear) - 1).toString();
                if (chartData[previousYearStr] && chartData[previousYearStr].avg[latestMonthIndex] !== null) {
                    previousYearLatestMonthData = chartData[previousYearStr].avg[latestMonthIndex];
                }
            }
            let count = 0;
            let startMonth = null, startYear = null; // <-- Dòng mới
            for (const year of sortedYears) {
                for (let i = 11; i >= 0; i--) {
                    if (count >= 12) break;
                    if (chartData[year] && chartData[year].avg[i] !== null) {
                        allPricesLast12Months.push(chartData[year].avg[i]);
                        startMonth = i + 1; // <-- Dòng mới
                        startYear = parseInt(year, 10); // <-- Dòng mới
                        count++;
                    }
                }
                if (count >= 12) break;
            }
            const current = latestMonthData ? `${latestMonthData.toLocaleString('vi-VN')} tr/m²` : '--';
            const avg = allPricesLast12Months.length > 0 ? `${(allPricesLast12Months.reduce((a, b) => a + b, 0) / allPricesLast12Months.length).toFixed(1).toLocaleString('vi-VN')} tr/m²` : '--';
            let yoy = '--',
                yoyClass = '';
            if (latestMonthData && previousYearLatestMonthData) {
                const change = ((latestMonthData - previousYearLatestMonthData) / previousYearLatestMonthData * 100);
                yoy = (change >= 0 ? '▲' : '▼') + ` ${Math.abs(change).toFixed(1)}%`;
                yoyClass = change >= 0 ? 'positive' : 'negative';
            }
            return {
                current,
                avg,
                yoy,
                yoyClass,
                latestMonth: latestMonthIndex !== -1 ? latestMonthIndex + 1 : null,
                latestYear: latestYearStr || null,
                startMonth: startMonth, // <-- Dòng mới
                startYear: startYear // <-- Dòng mới
            };
        };
        setupFilters();
        updateChart();
    }

    function initProductDetailChartForRent(product) {
        const chartSection = document.querySelector('.price-history-section-detail');
        if (!chartSection) return;
        const ctx = document.getElementById('product-price-history-chart')?.getContext('2d');
        const titleElement = document.getElementById('detail-chart-dynamic-title');
        if (!ctx || !titleElement || typeof priceHistoryData === 'undefined' || !product) {
            chartSection.style.display = 'none';
            return;
        }
        const priceHistoryDataSource = typeof priceHistoryData_Thue !== 'undefined' ? priceHistoryData_Thue : priceHistoryData;
        const allTransactions = Object.values(priceHistoryDataSource).flat();
        allTransactions.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        let comparableData = [];
        const category = product.productCategory || 'BĐS';
        const bedroomsText = product.bedrooms ? `${product.bedrooms}PN` : '';
        const location = product.project ? `tại dự án ${product.project}` : `tại phường ${product.ward}`;
        titleElement.textContent = `Biểu đồ giá thuê ${category} ${bedroomsText} ${location}`.replace(/\s+/g, ' ').trim();
        if (product.project) {
            comparableData = allTransactions.filter(item =>
                item.project === product.project &&
                item.bedrooms === product.bedrooms &&
                item.productCategory === product.productCategory &&
                item.leaseTerm === product.leaseTerm &&
                item.id !== product.id
            ).slice(0, 20);
        } else {
            comparableData = allTransactions.filter(item =>
                item.ward === product.ward &&
                item.bedrooms === product.bedrooms &&
                item.productCategory === product.productCategory &&
                item.leaseTerm === product.leaseTerm &&
                item.id !== product.id
            ).slice(0, 20);
        }
        const currentProductPoint = { ...product,
            isCurrent: true
        };
        comparableData.push(currentProductPoint);
        if (comparableData.length <= 1) {
            chartSection.innerHTML = `<h2 class="section-title">Phân tích giá thuê</h2><p class="chart-disclaimer">Không có đủ dữ liệu để tạo biểu đồ so sánh cho sản phẩm này.</p>`;
            return;
        }
        const FURNITURE_COLORS = {
            'Cơ bản': 'rgba(54, 162, 235, 0.7)',
            'Đầy đủ': 'rgba(75, 192, 192, 0.7)',
            'Bàn giao thô': 'rgba(255, 99, 132, 0.7)',
            'Nhà thô': 'rgba(255, 99, 132, 0.7)',
            'Không nội thất': 'rgba(153, 102, 255, 0.7)',
            'Default': 'rgba(201, 203, 207, 0.7)'
        };
        let priceChart;
        const datasets = [];
        const groupedByFurniture = {};
        comparableData.forEach(item => {
            const furniture = item.furniture || 'Default';
            if (!groupedByFurniture[furniture]) {
                groupedByFurniture[furniture] = [];
            }
            groupedByFurniture[furniture].push(item);
        });
        for (const furniture in groupedByFurniture) {
            datasets.push({
                label: furniture,
                data: groupedByFurniture[furniture].map(item => ({
                    x: item.area,
                    y: item.price,
                    details: item
                })),
                backgroundColor: FURNITURE_COLORS[furniture] || FURNITURE_COLORS['Default'],
                borderColor: groupedByFurniture[furniture].map(item => item.isCurrent ? '#FFD700' : 'transparent'),
                borderWidth: 2,
                radius: groupedByFurniture[furniture].map(item => item.isCurrent ? 10 : 6),
                hoverRadius: 9
            });
        }
        const config = {
            type: 'scatter',
            data: {
                datasets: datasets
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Diện tích (m²)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Giá thuê (triệu VNĐ / tháng)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const details = context.raw.details;
                                if (!details) return '';
                                const date = new Date(details.publishedAt);
                                const month = date.getMonth() + 1;
                                const year = date.getFullYear();
                                let label = details.isCurrent ? "SẢN PHẨM NÀY\n" : `Mã tin: ${details.id}\n`;
                                label += `Giá: ${details.price} triệu/tháng\n`;
                                label += `Diện tích: ${details.area} m²\n`;
                                label += `Đăng: T${month}/${year}`;
                                return label.split('\n');
                            }
                        }
                    }
                }
            }
        };
        const summaryCards = chartSection.querySelector('.price-summary-cards');
        const yearFilters = chartSection.querySelector('.chart-header-detail');
        if (summaryCards) summaryCards.style.display = 'none';
        if (yearFilters) yearFilters.style.display = 'none';
        if (priceChart) {
            priceChart.destroy();
        }
        priceChart = new Chart(ctx, config);
    }
    // Đặt hàm này ở khu vực chung của mã, bên ngoài các hàm init... khác
function initGlobalFavoriteSystem() {
        document.addEventListener('click', function(event) {
            const favoriteBtn = event.target.closest('.favorite-btn');
            if (!favoriteBtn) return;

            // --- ĐÃ THÊM: Ngăn chặn chuyển trang ---
            event.preventDefault();
            event.stopPropagation();
            // --- KẾT THÚC PHẦN THÊM MỚI ---

            const itemId = favoriteBtn.dataset.itemId;
            if (!itemId || !allData[itemId]) {
                console.error('Không tìm thấy dữ liệu cho item ID:', itemId);
                return;
            }

            const product = allData[itemId];
            const itemData = {
                id: itemId,
                title: product.title,
                thumbnail: (product.images && product.images.length > 0) ? `assets/images/${product.images[0]}` : '',
                url: `product-detail.html?id=${itemId}`
            };

            let favorites = getFavorites();

            if (isFavorite(itemId)) {
                favorites = favorites.filter(item => item.id !== itemId);
            } else {
                favorites.push(itemData);
            }

            saveFavorites(favorites);
            updateAllFavoriteButtons();
            updateFavoriteCounter();
        });
        
    } 
   function initShareButton(product) {
    const shareBtn = document.querySelector('.hero-actions .share-btn');
    const sharePopup = document.getElementById('share-popup');
    if (!shareBtn || !sharePopup) return;

    // --- LOGIC CHÍNH KHI CLICK NÚT CHIA SẺ ---
    shareBtn.addEventListener('click', async (event) => { // Thêm async
        event.stopPropagation();
        
        // Ưu tiên Web Share API trên mobile
        if (navigator.share) {
            shareBtn.disabled = true; // Vô hiệu hóa nút để chống click nhanh
            try {
                await navigator.share({
                    title: product.title,
                    text: `Hãy xem bất động sản này: ${product.title}`,
                    url: window.location.href
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Lỗi khi chia sẻ:', error);
                }
            } finally {
                shareBtn.disabled = false; // Luôn kích hoạt lại nút sau khi xong
            }
        } else {
            // Hiển thị popup trên desktop
            updateShareLinks(product);
            sharePopup.style.display = 'block';
        }
    });

    // --- CÁC LOGIC CÒN LẠI GIỮ NGUYÊN ---
    const closePopupBtn = document.getElementById('close-share-popup');
    const copyLinkBtn = document.getElementById('copy-link-btn');

    closePopupBtn.addEventListener('click', () => {
        sharePopup.style.display = 'none';
    });

    copyLinkBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const span = copyLinkBtn.querySelector('span');
            span.textContent = 'Đã sao chép!';
            setTimeout(() => {
                span.textContent = 'Sao chép liên kết';
            }, 2000);
        });
    });

    function updateShareLinks(product) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(product.title);
        document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        document.getElementById('share-zalo').href = `https://zalo.me/share/d/desktop?id=${url}&page=1`;
        document.getElementById('share-telegram').href = `https://t.me/share/url?url=${url}&text=${title}`;
        document.getElementById('share-email').href = `mailto:?subject=${title}&body=${url}`;
    }

    document.addEventListener('click', (event) => {
        if (!shareBtn.contains(event.target) && !sharePopup.contains(event.target)) {
            sharePopup.style.display = 'none';
        }
    });
}
    // Gọi các hàm khởi tạo
    initPage();
    initGlobalFavoriteSystem(); 
});