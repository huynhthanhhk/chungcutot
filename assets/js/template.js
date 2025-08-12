// Thêm đoạn mã này vào tệp assets/js/template.js

document.addEventListener('DOMContentLoaded', function() {


    /**
     * Hàm chung để khởi tạo một modal có thể tái sử dụng.
     */
    function initReusableModal(modalId, openTriggerClass) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const closeBtn = modal.querySelector('.modal-close-btn');
        const openTriggers = document.querySelectorAll(`.${openTriggerClass}`);

        const openModal = () => {
             if(modal.classList.contains('open')) return;
             modal.style.display = 'flex';
             setTimeout(() => modal.classList.add('open'), 10);
        }

        const closeModal = () => {
            modal.classList.remove('open');
            setTimeout(() => modal.style.display = 'none', 300);
        }

        openTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    /**
     * Hàm khởi tạo logic riêng cho modal "Xem năm mua/xây nhà".
     */
    function initNamMuaNhaModal() {
        const modal = document.getElementById('nam-mua-nha-modal');
        if (!modal) return;

        const inputWrapper = document.getElementById('xay-nha-input-wrapper');
        const resultWrapper = document.getElementById('xay-nha-result-wrapper');
        const form = document.getElementById('xay-nha-form');
        const errorDiv = document.getElementById('xay-nha-error');
        const backBtn = document.getElementById('xay-nha-back-btn');

        const infoCol1 = document.getElementById('xay-nha-info-col-1');
        const infoCol2 = document.getElementById('xay-nha-info-col-2');
        const resultTitle = document.getElementById('xay-nha-result-title');
        const detailContainer = document.getElementById('xay-nha-details');
        const suggestionsContainer = document.getElementById('xay-nha-suggestions');

        const showInputView = () => {
            resultWrapper.style.display = 'none';
            inputWrapper.style.display = 'block';
            errorDiv.style.display = 'none';
        };

        if(backBtn) backBtn.addEventListener('click', showInputView);

        if(form) form.addEventListener('submit', (e) => {
            e.preventDefault();
            errorDiv.style.display = 'none';

            const birthYear = parseInt(form.querySelector('input[name="birth_year"]').value, 10);
            const buildYear = parseInt(form.querySelector('input[name="build_year"]').value, 10);
            const gender = form.querySelector('select[name="gender"]').value;

            if (!birthYear || !gender || !buildYear || birthYear < 1900 || buildYear < 1900) {
                errorDiv.textContent = 'Vui lòng nhập đầy đủ thông tin hợp lệ.';
                errorDiv.style.display = 'block';
                return;
            }

            if (buildYear <= birthYear) {
                errorDiv.textContent = 'Năm xây nhà phải lớn hơn năm sinh.';
                errorDiv.style.display = 'block';
                return;
            }

            const results = calculateGiaChuInfo(birthYear, gender);
            const analysis = analyzeBuildYear(birthYear, buildYear);

            if (!results) {
                 errorDiv.textContent = 'Lỗi: Không thể tính toán với dữ liệu được cung cấp.';
                 errorDiv.style.display = 'block';
                 return;
            }

            if(resultTitle) {
                const isBadYear = analysis.tamTai.isPham || analysis.kimLau.isPham || analysis.hoangOc.isPham;
                const loiNhac = isBadYear ? "Cần cân nhắc thêm" : "Rất tốt";
                const lunarNameForBuildYear = getLunarYearName(buildYear);

                const titleHtml = `
                    ${results.gender} ${analysis.tuoiAmLich} tuổi ${results.lunarYearName} (${results.birthYear}) Mệnh ${results.hanhCung},
                    mua/xây nhà ${buildYear} (${lunarNameForBuildYear}) -
                    <span class="${isBadYear ? 'bad-year' : 'good-year'}">${loiNhac}</span>
                `;
                resultTitle.innerHTML = titleHtml;
            }

            if(infoCol1) {
                infoCol1.innerHTML = `
                    <h4>I. Tổng quan về gia chủ</h4>
                    <div class="info-details">
                        <p><strong>Năm sinh:</strong> ${results.birthYear} (${results.lunarYearName})</p>
                        <p><strong>Giới tính:</strong> ${results.gender}</p>
                        <p><strong>Tuổi âm lịch:</strong> ${analysis.tuoiAmLich}</p>
                        <p><strong>Thiên can:</strong> ${results.thienCan}</p>
                        <p><strong>Địa chi:</strong> ${results.diaChi}</p>
                        <p><strong>Cung – Mệnh:</strong> ${results.cung} – ${results.hanhCung}</p>
                        <p><strong>Ngũ hành:</strong> ${results.nguHanhNapAm}</p>
                        <p style="font-size: 16px; margin-bottom: 15px;"><strong>Thuộc:</strong> <strong style="color: var(--primary-color);">${results.trach}</strong></p>
                    </div>
                `;
            }

            if (infoCol2 && results.diaChiImg) {
                infoCol2.innerHTML = `<img src="assets/images/phong-thuy/${results.diaChiImg}" alt="Ảnh con giáp ${results.diaChi}" class="zodiac-image">`;
            }

             if(detailContainer) {
                 detailContainer.innerHTML = `
                    <h4 class="analysis-title">II. Phân tích các hạn chính</h4>
                    ${generateAnalysisBlock('Tam Tai', analysis.tamTai)}
                    ${generateAnalysisBlock('Kim Lâu', analysis.kimLau)}
                    ${generateAnalysisBlock('Hoang Ốc', analysis.hoangOc)}
                 `;
             }

             if(suggestionsContainer) {
                 const isBadYear = analysis.tamTai.isPham || analysis.kimLau.isPham || analysis.hoangOc.isPham;
                 let finalConclusion = "Năm " + buildYear;
                 let advice = "";

                 if (!isBadYear) {
                     finalConclusion += " là một năm <strong class='good-year'>RẤT TỐT</strong> để xây nhà.";
                     advice = "Gia chủ có thể an tâm tiến hành các công việc trọng đại liên quan đến nhà cửa trong năm này để mọi việc được hanh thông, thuận lợi.";
                 } else {
                     finalConclusion += " là một năm <strong class='bad-year'>KHÔNG TỐT</strong> để xây nhà do đã phạm phải một trong các hạn lớn.";
                     advice = "Gia chủ nên cân nhắc hoãn việc xây dựng sang một năm khác tốt hơn hoặc tìm phương pháp mượn tuổi để hóa giải, tránh những điều không may mắn.";
                 }

                 let suggestedAgesHTML = '';
                 if (isBadYear) {
                    const suggestedAges = findGoodAgesToBorrow(birthYear, buildYear);
                    suggestedAgesHTML = `
                        <div class="borrow-age-suggestions">
                            <h4>IV. Đề xuất tuổi tốt mượn làm nhà năm ${buildYear}</h4>
                    `;
                    if (suggestedAges.older.length > 0 || suggestedAges.younger.length > 0) {
                        suggestedAgesHTML += '<p>Nếu gia chủ vẫn muốn tiến hành trong năm, có thể tham khảo mượn tuổi của những người có năm sinh sau đây (không phạm cả 3 hạn):</p><ul class="suggested-ages-list">';

                        const allSuggestions = [...suggestedAges.older, ...suggestedAges.younger];
                        allSuggestions.forEach(age => {
                            const tuoiAm = buildYear - age.year + 1;
                            suggestedAgesHTML += `<li>${age.year} (${getLunarYearName(age.year)}) - ${tuoiAm} tuổi</li>`;
                        });

                        suggestedAgesHTML += '</ul>';
                    } else {
                        suggestedAgesHTML += '<p>Không tìm thấy tuổi nào thực sự phù hợp để mượn trong các năm lân cận.</p>';
                    }
                    suggestedAgesHTML += '</div>';
                 }

                 const nextGoodYears = findNextGoodYears(birthYear, buildYear);
                 let nextGoodYearsHTML = '';
                 if (nextGoodYears.length > 0) {
                     nextGoodYearsHTML = `
                        <div class="next-good-years">
                            <h4>${isBadYear ? 'V' : 'IV'}. Các năm tốt tiếp theo để mua/xây nhà</h4>
                            <p>Nếu không muốn mượn tuổi, gia chủ có thể đợi đến các năm tốt sau đây để tiến hành:</p>
                            <div class="good-years-list">
                     `;
                     nextGoodYears.forEach(year => {
                        const tuoiAm = year - birthYear + 1;
                        nextGoodYearsHTML += `<span>${year} (${tuoiAm} tuổi)</span>`;
                     });
                     nextGoodYearsHTML += '</div></div>';
                 }

                 suggestionsContainer.innerHTML = `
                    <div class="final-conclusion">
                        <h4>III. Kết luận & Gợi ý</h4>
                        <p><strong>${finalConclusion}</strong></p>
                        <p>${advice}</p>
                    </div>
                    ${suggestedAgesHTML}
                    ${nextGoodYearsHTML}
                 `;
             }

            inputWrapper.style.display = 'none';
            resultWrapper.style.display = 'block';
        });
    }

    function generateAnalysisBlock(title, data) {
        const isGood = !data.isPham;
        const icon = isGood
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f44336"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;

        return `
            <div class="analysis-item ${isGood ? 'good' : 'bad'}">
                <div class="analysis-icon">${icon}</div>
                <div class="analysis-content">
                    <h5>${title}: <span class="result-text">${data.ketLuan}</span></h5>
                    <p>${data.dienGiai}</p>
                </div>
            </div>
        `;
    }

    function calculateGiaChuInfo(birthYear, gender) {
        if (typeof phongThuyData === 'undefined') {
            console.error('Lỗi: Dữ liệu phong thủy (phongThuyData) không được tải.');
            return null;
        }

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
        const goodDirections = [huongObj.sinh_khi, huongObj.thien_y, huongObj.dien_nien, huongObj.phuc_vi];
        const isDongTuTrach = goodDirections.some(h => ['Đông', 'Đông Nam', 'Nam', 'Bắc'].includes(h));
        const trach = isDongTuTrach ? 'Đông Tứ Trạch' : 'Tây Tứ Trạch';

        return { birthYear, gender, thienCan, diaChi, diaChiImg, lunarYearName, nguHanhNapAm, cung, hanhCung, trach };
    }

    function getLunarYearName(year) {
        if (typeof phongThuyData === 'undefined') return '';
        const lastDigit = year % 10;
        const thienCan = phongThuyData.thien_can.find(c => c.so_cuoi === lastDigit)?.can;
        const chiRemainder = year % 12;
        const diaChiObj = phongThuyData.dia_chi.find(c => c.so_du === chiRemainder);
        if (!thienCan || !diaChiObj) return '';
        return `${thienCan} ${diaChiObj.dia_chi}`;
    }

     function analyzeBuildYear(birthYear, buildYear) {
    const tuoiAmLich = buildYear - birthYear + 1;
    // Giả sử phongThuyData đã được nạp từ tệp phong_thuy_data.js
    const chiGiaChu = phongThuyData.dia_chi.find(item => item.so_du === birthYear % 12).dia_chi;
    const chiNamXay = phongThuyData.dia_chi.find(item => item.so_du === buildYear % 12).dia_chi;

    const tamTaiNhom = {
        'Thân Tý Thìn': ['Dần', 'Mão', 'Thìn'],
        'Dần Ngọ Tuất': ['Thân', 'Dậu', 'Tuất'],
        'Hợi Mão Mùi': ['Tỵ', 'Ngọ', 'Mùi'],
        'Tỵ Dậu Sửu': ['Hợi', 'Tý', 'Sửu']
    };
    let isTamTai = false;
    for (const nhom in tamTaiNhom) {
        if (nhom.includes(chiGiaChu)) {
            if (tamTaiNhom[nhom] && tamTaiNhom[nhom].includes(chiNamXay)) {
                isTamTai = true;
            }
            break;
        }
    }

    const kimLauSoDu = tuoiAmLich % 9;
    const isKimLau = [1, 3, 6, 8].includes(kimLauSoDu);
    const kimLauDienGiai = { 1: "Kim Lâu Thân", 3: "Kim Lâu Thê", 6: "Kim Lâu Tử", 8: "Kim Lâu Súc" };

    let tuoiKiemTra = tuoiAmLich;
    if (tuoiAmLich > 69) {
        tuoiKiemTra = tuoiAmLich - 60;
    }

    const cungTen = phongThuyData.hoangOc.lookup[tuoiKiemTra];
    let isHoangOcPham = true;
    let hoangOcKetLuan = "Không xác định";
    let hoangOcDienGiaiKetQua = "Tuổi của gia chủ không nằm trong phạm vi tra cứu phổ biến.";

    if (cungTen && phongThuyData.hoangOc.dienGiai[cungTen]) {
        const cungChiTiet = phongThuyData.hoangOc.dienGiai[cungTen];
        isHoangOcPham = !cungChiTiet.isTot;
        hoangOcKetLuan = cungChiTiet.isTot ? `Tốt (${cungTen})` : `Phạm (${cungTen})`;
        hoangOcDienGiaiKetQua = cungChiTiet.yNghia;
    }

    return {
        tuoiAmLich: tuoiAmLich,
        tamTai: {
            isPham: isTamTai,
            ketLuan: isTamTai ? "Phạm Tam Tai" : "Không phạm",
            dienGiai: `Tuổi ${chiGiaChu} sẽ gặp hạn Tam Tai vào các năm Dần, Mão, Thìn. Năm ${buildYear} (${chiNamXay}) ${isTamTai ? 'phạm' : 'không phạm'} hạn này.`
        },
        kimLau: {
            isPham: isKimLau,
            ketLuan: isKimLau ? `Phạm ${kimLauDienGiai[kimLauSoDu]}` : "Không phạm",
            dienGiai: `Năm ${buildYear}, gia chủ ${tuoiAmLich} tuổi (âm lịch). Theo cách tính, tuổi này ${isKimLau ? `phạm vào hạn ${kimLauDienGiai[kimLauSoDu]}.` : 'không phạm vào hạn Kim Lâu.'}`
        },
        hoangOc: {
            isPham: isHoangOcPham,
            ketLuan: hoangOcKetLuan,
            dienGiai: hoangOcDienGiaiKetQua
        }
    };
}
    function findGoodAgesToBorrow(userBirthYear, buildYear) {
        const youngerAges = [];
        const olderAges = [];
        const maxSuggestions = 5;

        let currentOlderYear = userBirthYear + 1;
        while (olderAges.length < maxSuggestions && currentOlderYear < buildYear - 18) {
            const analysis = analyzeBuildYear(currentOlderYear, buildYear);
            if (!analysis.tamTai.isPham && !analysis.kimLau.isPham && !analysis.hoangOc.isPham) {
                olderAges.push({ year: currentOlderYear });
            }
            currentOlderYear++;
        }

        let currentYoungerYear = userBirthYear - 1;
        while (youngerAges.length < maxSuggestions && currentYoungerYear > 1920) {
            const analysis = analyzeBuildYear(currentYoungerYear, buildYear);
            if (!analysis.tamTai.isPham && !analysis.kimLau.isPham && !analysis.hoangOc.isPham) {
                youngerAges.push({ year: currentYoungerYear });
            }
            currentYoungerYear--;
        }

        return { younger: youngerAges, older: olderAges };
    }

    function findNextGoodYears(birthYear, startBuildYear) {
        const goodYears = [];
        const maxSuggestions = 5;
        const maxYearsToCheck = 10;
        let yearsChecked = 0;
        let currentYear = startBuildYear + 1;

        while (goodYears.length < maxSuggestions && yearsChecked < maxYearsToCheck) {
            const analysis = analyzeBuildYear(birthYear, currentYear);
            if (!analysis.tamTai.isPham && !analysis.kimLau.isPham && !analysis.hoangOc.isPham) {
                goodYears.push(currentYear);
            }
            yearsChecked++;
            currentYear++;
        }
        return goodYears;
    }

    // =================================================================================
    // == BẮT ĐẦU NÂNG CẤP CHỨC NĂNG KHAI TOÁN XÂY DỰNG                              ==
    // =================================================================================
    function initKhaiToanXayDung() {
        // --- 1. KHAI BÁO BIẾN & CHỌN PHẦN TỬ ---
        const modalContainer = document.getElementById('khai-toan-xay-dung-modal');
        if (!modalContainer) return;

        let estimationData = {};

        let currentStep = 1;
        const totalSteps = 3;

        const steps = [modalContainer.querySelector('#step-1'), modalContainer.querySelector('#step-2'), modalContainer.querySelector('#step-3')];
        const stepperItems = [modalContainer.querySelector('#step-item-1'), modalContainer.querySelector('#step-item-2'), modalContainer.querySelector('#step-item-3')];
        const nextBtn = modalContainer.querySelector('#next-btn');
        const backBtn = modalContainer.querySelector('#back-btn');
        const navButtons = modalContainer.querySelector('#navigation-buttons');
        const restartBtn = modalContainer.querySelector('#restart-btn');
        const backBtnStep3 = modalContainer.querySelector('#back-btn-step3');

        const step2ContentWrapper = modalContainer.querySelector('#step-2 .table-scroll-wrapper');
        const step3ResultWrapper = modalContainer.querySelector('#step-3-result-wrapper');

        const imageZoomModal = document.getElementById('image-zoom-modal');
        const closeZoomModal = document.getElementById('close-zoom-modal');
        const zoomedImage = document.getElementById('zoomed-image');

        const congTrinhImage = modalContainer.querySelector('#cong-trinh-image');

        const imageContainer = congTrinhImage ? congTrinhImage.parentElement : null;
        if (imageContainer && !imageContainer.querySelector('.zoom-icon')) {
            imageContainer.style.position = 'relative';
            const zoomIconEl = document.createElement('i');
            zoomIconEl.className = 'zoom-icon';
            zoomIconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`;
            Object.assign(zoomIconEl.style, {
                position: 'absolute', top: '10px', right: '10px', zIndex: '10', cursor: 'zoom-in',
                background: 'rgba(0,0,0,0.4)', borderRadius: '50%', padding: '5px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            });
            imageContainer.appendChild(zoomIconEl);
        }
        const zoomIcon = modalContainer.querySelector('.zoom-icon');

        let zoomPrevBtn, zoomNextBtn;
        if (imageZoomModal && !imageZoomModal.querySelector('.zoom-nav-btn')) {
            zoomPrevBtn = document.createElement('i');
            zoomNextBtn = document.createElement('i');
            zoomPrevBtn.className = 'zoom-nav-btn zoom-prev';
            zoomNextBtn.className = 'zoom-nav-btn zoom-next';
            zoomPrevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>`;
            zoomNextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M6.49 20.13l1.77 1.77L18.16 12 8.26 2.11l-1.77 1.77L14.62 12l-8.13 8.13z"/></svg>`;
            const btnStyle = {
                position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: '1500', cursor: 'pointer',
                background: 'rgba(0,0,0,0.3)', borderRadius: '50%', padding: '10px', display: 'none',
                alignItems: 'center', justifyContent: 'center'
            };
            Object.assign(zoomPrevBtn.style, btnStyle, { left: '20px' });
            Object.assign(zoomNextBtn.style, btnStyle, { right: '20px' });
            imageZoomModal.appendChild(zoomPrevBtn);
            imageZoomModal.appendChild(zoomNextBtn);
        }

        const loaiCongTrinhSelect = modalContainer.querySelector('#loai-cong-trinh');
        const congTrinhCaption = modalContainer.querySelector('#cong-trinh-caption');
        const soTangInput = modalContainer.querySelector('#so-tang');
        const daiInput = modalContainer.querySelector('#chieu-dai');
        const rongInput = modalContainer.querySelector('#chieu-rong');
        const dienTichInput = modalContainer.querySelector('#dien-tich');
        const soTangError = modalContainer.querySelector('#so-tang-error');
        const chieuDaiError = modalContainer.querySelector('#chieu-dai-error');
        const chieuRongError = modalContainer.querySelector('#chieu-rong-error');
        const bcTruocToggle = modalContainer.querySelector('#ban-cong-truoc-toggle');
        const bcTruocContainer = modalContainer.querySelector('#dien-tich-bc-truoc-container');
        const bcSauToggle = modalContainer.querySelector('#ban-cong-sau-toggle');
        const bcSauContainer = modalContainer.querySelector('#dien-tich-bc-sau-container');
        const dtBcTruocInput = modalContainer.querySelector('#dien-tich-bc-truoc');
        const dtBcSauInput = modalContainer.querySelector('#dien-tich-bc-sau');
        const dtBcTruocError = modalContainer.querySelector('#dt-bc-truoc-error');
        const dtBcSauError = modalContainer.querySelector('#dt-bc-sau-error');
        const hangMucMoRongFieldset = modalContainer.querySelector('#hang-muc-mo-rong-fieldset');
        const maiOnlyFieldset = modalContainer.querySelector('#mai-only-fieldset');
        const combinedAreaError = modalContainer.querySelector('#combined-area-error');
        const sanThuongSelect = modalContainer.querySelector('#san-thuong');
        const dienTichTumInput = modalContainer.querySelector('#dien-tich-tum');
        const dienTichStTrongInput = modalContainer.querySelector('#dien-tich-st-trong');
        const dienTichGianHoaInput = modalContainer.querySelector('#dien-tich-gian-hoa');
        const dienTichPhongInput = modalContainer.querySelector('#dien-tich-phong');
        const dienTichMaiInput = modalContainer.querySelector('#dien-tich-mai');
        const loaiMaiInput = modalContainer.querySelector('#loai-mai');
        const dienTichMaiSotang1Input = modalContainer.querySelector('#dien-tich-mai-sotang-1');
        const loaiMaiSotang1Input = modalContainer.querySelector('#loai-mai-sotang-1');
        const tumContainer = modalContainer.querySelector('#dien-tich-tum-container');
        const stTrongContainer = modalContainer.querySelector('#dien-tich-st-trong-container');
        const gianHoaContainer = modalContainer.querySelector('#dien-tich-gian-hoa-container');
        const maiNgoiContainer = modalContainer.querySelector('#dien-tich-mai-ngoi-container');
        const loaiPhongContainer = modalContainer.querySelector('#loai-phong-container');
        const dienTichPhongContainer = modalContainer.querySelector('#dien-tich-phong-container');
        const loaiMaiContainer = modalContainer.querySelector('#loai-mai-container');
        const dienTichMaiContainer = modalContainer.querySelector('#dien-tich-mai-container');
        const dtMaiSotang1Error = modalContainer.querySelector('#dt-mai-sotang-1-error');
        const dtMaiError = modalContainer.querySelector('#dt-mai-error');
        const loaiPhongSelect = modalContainer.querySelector('#loai-phong');
        const khuVucSelect = modalContainer.querySelector('#khu-vuc');
        const khuVucDonGiaSpan = modalContainer.querySelector('#khu-vuc-don-gia');
        const extendedAreaInputs = [
            { input: dienTichTumInput, error: modalContainer.querySelector('#dt-tum-error'), container: tumContainer },
            { input: dienTichStTrongInput, error: modalContainer.querySelector('#dt-st-trong-error'), container: stTrongContainer },
            { input: dienTichGianHoaInput, error: modalContainer.querySelector('#dt-gian-hoa-error'), container: gianHoaContainer },
            { input: modalContainer.querySelector('#dien-tich-mai-ngoi'), error: modalContainer.querySelector('#dt-mai-ngoi-error'), container: maiNgoiContainer },
            { input: dienTichPhongInput, error: modalContainer.querySelector('#dt-phong-error'), container: dienTichPhongContainer },
        ];

        const prevButton = document.getElementById('prev-image');
        const nextButton = document.getElementById('next-image');
        const imageIndexDisplay = document.getElementById('image-index');
        const sliderControls = modalContainer.querySelector('.slider-controls');

        let currentImageList = [];
        let currentImageBasePath = ''; // <-- Thêm biến lưu trữ basePath
        let currentImageIndex = 0;

        // --- 2. CÁC HÀM HỖ TRỢ (HELPER FUNCTIONS) ---

        const formatCurrency = (num) => {
            if (typeof num !== 'number' || isNaN(num)) return '-';
            return new Intl.NumberFormat('vi-VN').format(Math.round(num));
        };
        
        function calculateAndRenderConvertedArea() {
            if (typeof estimatorConfig === 'undefined' || !estimationData) {
                console.error("Dữ liệu cấu hình hoặc dữ liệu dự toán không tồn tại.");
                return;
            }
        
            const { heSoMong, heSoQuyDoi } = estimatorConfig;
            const { loaiMong, soTang, dienTich, tangHam } = estimationData;
        
            let heSoCongThem = 0;
            const heSoCoBan = heSoMong.heSoCoBan || 0.35;
        
            if (loaiMong === 'Móng đơn/băng' && heSoMong['Móng đơn/băng']) {
                const config = heSoMong['Móng đơn/băng'];
                if (soTang < 6) {
                    heSoCongThem = (soTang - 1) * config.nhoHon6TangMultiplier;
                } else {
                    heSoCongThem = (5 * config.nhoHon6TangMultiplier) + (soTang - 5) * config.lonHon6TangAdder;
                }
            } else if (loaiMong === 'Móng cọc' && heSoMong['Móng cọc']) {
                const config = heSoMong['Móng cọc'];
                if (soTang < 6) {
                    heSoCongThem = (soTang - 1) * config.nhoHon6TangMultiplier;
                } else {
                    heSoCongThem = (5 * config.nhoHon6TangMultiplier) + (soTang - 5) * config.lonHon6TangAdder;
                }
            }
            const heSoMongFinal = heSoCoBan + heSoCongThem;
        
            const bangDienTichQuyDoi = [];
            let tongDienTichQuyDoi = 0;
        
            const addItem = (tenHangMuc, dienTichThuc, heSo) => {
                if (dienTichThuc > 0 && heSo > 0) {
                    const dienTichQuyDoi = dienTichThuc * heSo;
                    bangDienTichQuyDoi.push({
                        hangMuc: tenHangMuc,
                        dienTichThuc: dienTichThuc,
                        heSo: heSo,
                        dienTichQuyDoi: dienTichQuyDoi
                    });
                    tongDienTichQuyDoi += dienTichQuyDoi;
                }
            };
        
            const dienTichSan = estimationData.dienTich || 0;
            
            addItem('Loại móng', dienTichSan, heSoMongFinal);
        
            if (tangHam && tangHam !== 'Không') {
                addItem('Tầng hầm', dienTichSan, heSoQuyDoi[tangHam] || 0);
            }
            
            addItem('Sàn trệt', dienTichSan, heSoQuyDoi['Sàn trệt'] || 1.0);
            
            const loaiSanThuongValue = estimationData.sanThuong;
            let soLauMultiplier;

            if (loaiSanThuongValue === 'khong') {
                soLauMultiplier = soTang - 1;
            } else {
                soLauMultiplier = soTang;
            }

            if (soLauMultiplier > 0) {
                addItem('Sàn các lầu', dienTichSan * soLauMultiplier, heSoQuyDoi['Sàn các lầu'] || 1.0);
            }
        
            if (bcTruocToggle.checked) {
                addItem('Ban công trước', parseFloat(dtBcTruocInput.value) || 0, heSoQuyDoi['Ban công trước'] || 1.0);
            }
            if (bcSauToggle.checked) {
                addItem('Ban công sau', parseFloat(dtBcSauInput.value) || 0, heSoQuyDoi['Ban công sau'] || 1.0);
            }
            
            if (!tumContainer.classList.contains('hidden')) {
                addItem('Tum thang', parseFloat(dienTichTumInput.value) || 0, heSoQuyDoi['Tum thang'] || 1.0);
            }
            
            if (soTang === 1) {
                const tenMai = loaiMaiSotang1Input.options[loaiMaiSotang1Input.selectedIndex].text;
                addItem(`Loại mái (${tenMai})`, parseFloat(dienTichMaiSotang1Input.value) || 0, heSoQuyDoi[tenMai] || 0);
            } 
            else if (estimationData.sanThuong === 'khong') {
                const tenMai = loaiMaiInput.options[loaiMaiInput.selectedIndex].text;
                addItem(`Loại mái (${tenMai})`, parseFloat(dienTichMaiInput.value) || 0, heSoQuyDoi[tenMai] || 0);
            }
            
            if (!stTrongContainer.classList.contains('hidden')) {
                addItem('Sân thượng', parseFloat(dienTichStTrongInput.value) || 0, heSoQuyDoi['Sân thượng'] || 0.3);
            }
        
            if (!gianHoaContainer.classList.contains('hidden')) {
                 addItem('Giàn hoa hoặc mái tôn trên sân thượng', parseFloat(dienTichGianHoaInput.value) || 0, heSoQuyDoi['Giàn hoa/mái tôn trên sân thượng'] || 0.7);
            }
        
            if (!maiNgoiContainer.classList.contains('hidden')) {
                addItem('Mái ngói trên sân thượng', parseFloat(modalContainer.querySelector('#dien-tich-mai-ngoi').value) || 0, heSoQuyDoi['Mái ngói trên sân thượng'] || 0.9);
            }
        
            if (!dienTichPhongContainer.classList.contains('hidden')) {
                const tenPhong = loaiPhongSelect.options[loaiPhongSelect.selectedIndex].text;
                addItem(`Phòng trên ST`, parseFloat(dienTichPhongInput.value) || 0, heSoQuyDoi[tenPhong] || 0);
            }
            
            const container = modalContainer.querySelector('#converted-area-table-container');
            const totalSpan = modalContainer.querySelector('#total-converted-area-span');
        
            if (!container || !totalSpan) return;
        
            let tableRows = '';
            bangDienTichQuyDoi.forEach((item, index) => {
                tableRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.hangMuc}</td>
                        <td>m²</td>
                        <td>${item.dienTichThuc.toFixed(2)}</td>
                        <td>${item.heSo.toFixed(2)}</td>
                        <td>${item.dienTichQuyDoi.toFixed(2)}</td>
                    </tr>
                `;
            });
        
            container.innerHTML = `
                <div class="table-scroll-wrapper">
                    <table class="payment-schedule-table">
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Hạng mục</th>
                                <th>ĐVT</th>
                                <th>Diện tích thực</th>
                                <th>Hệ số</th>
                                <th>Diện tích quy đổi</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            `;
        
            totalSpan.innerHTML = `Tổng: <strong>${tongDienTichQuyDoi.toFixed(2)} m²</strong>`;
            
            estimationData.tongDienTichQuyDoi = tongDienTichQuyDoi;
        }

        function renderTotalCostSummary() {
            const container = modalContainer.querySelector('#total-cost-summary-container');
            if (!container || !estimationData.finalPackages) {
                container.innerHTML = '';
                return;
            };
        
            const [nhanCongPkg, phanThoPkg, tronGoiPkg] = estimationData.finalPackages;
                
            const goiVatLieuDisplay = { 'Thuong': 'Thường', 'Kha': 'Khá', 'Tot': 'Tốt' };
            const goiVatLieuText = goiVatLieuDisplay[estimationData.goiVatLieu] || estimationData.goiVatLieu;
        
            container.innerHTML = `
                <div class="total-cost-summary-grid">
                    <div class="summary-cost-item">
                        <h4>Chi phí Nhân công</h4>
                        <p>${nhanCongPkg.tongChiPhi} <span>VNĐ</span></p>
                    </div>
                    <div class="summary-cost-item">
                        <h4>Chi phí Phần thô</h4>
                        <p>${phanThoPkg.tongChiPhi} <span>VNĐ</span></p>
                    </div>
                    <div class="summary-cost-item">
                        <h4>Chi phí Trọn gói (Gói ${goiVatLieuText})</h4>
                        <p>${tronGoiPkg.tongChiPhi} <span>VNĐ</span></p>
                    </div>
                </div>
            `;
        }
       
        function calculateDetailedBreakdown() {
            const priceInputs = modalContainer.querySelectorAll('#step-2 .don-gia-input');
            const bangGiaDaDieuChinh = {};
            priceInputs.forEach(input => {
                bangGiaDaDieuChinh[input.dataset.id] = parseFloat(input.value) || 0;
            });
            estimationData.bangGiaDaDieuChinh = bangGiaDaDieuChinh;

            const dinhMucHaoPhi = (typeof dataHaoPhi !== 'undefined' && dataHaoPhi[estimationData.loaiCongTrinh])
                ? dataHaoPhi[estimationData.loaiCongTrinh]
                : (typeof dataHaoPhi !== 'undefined' ? dataHaoPhi['nha_pho_thong_thuong'] : {});

            let bangTongHopDonGia = [
                { id: 'cat_do_be_tong', stt: '1', ten: 'Cát đổ bê tông', dvt: 'm3' },
                { id: 'cat_xay_to', stt: '2', ten: 'Cát xây tô', dvt: 'm3' },
                { id: 'cot_thep', stt: '3', ten: 'Cốt thép', dvt: 'kg' },
                { id: 'da_1x2', stt: '4', ten: 'Đá 1x2', dvt: 'm3' },
                { id: 'gach_xay', stt: '5', ten: 'Gạch xây', dvt: 'viên' },
                { id: 'thep_buoc', stt: '6', ten: 'Thép buộc', dvt: 'kg' },
                { id: 'xi_mang_be_tong', stt: '7', ten: 'Xi măng bê tông', dvt: 'kg' },
                { id: 'xi_mang_xay_to', stt: '8', ten: 'Xi măng xây tô', dvt: 'kg' },
                { id: 'vl_dien_nuoc_khac', stt: '9', ten: 'VL điện nước và các VT khác', dvt: '%' },
                { id: 'cong_tho_trung_binh', stt: '10', ten: 'Công thợ trung bình', dvt: 'công' },
                { id: 'van_khuon_thiet_bi', stt: '11', ten: 'Ván khuôn thiết bị', dvt: 'm2' },
            ];

            let tongThanhTienVatTu = 0;
            bangTongHopDonGia.forEach(item => {
                if (item.id === 'van_khuon_thiet_bi') {
                    item.kl = 1; 
                    item.donGia = dinhMucHaoPhi[item.id] || 0; 
                } else {
                    item.kl = dinhMucHaoPhi[item.id] || 0;
                    item.donGia = bangGiaDaDieuChinh[item.id] || 0;
                }

                if (item.dvt !== '%') {
                    item.thanhTien = item.kl * item.donGia;
                } else {
                    item.thanhTien = 0;
                }
                if (parseInt(item.stt) >= 1 && parseInt(item.stt) <= 8) {
                    tongThanhTienVatTu += item.thanhTien;
                }
            });

            const itemVLDienNuoc = bangTongHopDonGia.find(i => i.id === 'vl_dien_nuoc_khac');
            if(itemVLDienNuoc) {
                itemVLDienNuoc.thanhTien = itemVLDienNuoc.kl * tongThanhTienVatTu;
            }

            const qlln = (bangGiaDaDieuChinh['loi_nhuan'] / 100) || 0;
            const thanhTienCongTho = bangTongHopDonGia.find(i => i.id === 'cong_tho_trung_binh')?.thanhTien || 0;
            const thanhTienVanKhuon = bangTongHopDonGia.find(i => i.id === 'van_khuon_thiet_bi')?.thanhTien || 0;

            const tongThanhTienPhanThoTruocLoiNhuan = bangTongHopDonGia.reduce((sum, item) => sum + item.thanhTien, 0);

            const donGiaNhanCongVanKhuon = (thanhTienCongTho + thanhTienVanKhuon) * (1 + qlln);
            const donGiaPhanTho = tongThanhTienPhanThoTruocLoiNhuan * (1 + qlln);

            const goiVatLieu = estimationData.goiVatLieu || 'Kha';
            const heSo = (typeof estimatorConfig !== 'undefined') ? estimatorConfig.heSoHoanThien[goiVatLieu] : { min: 0.9, max: 1.2 };
            const donGiaTronGoiMin = donGiaPhanTho * (1 + heSo.min);
            const donGiaTronGoiMax = donGiaPhanTho * (1 + heSo.max);

            estimationData.bangPhanTich = bangTongHopDonGia;
            
            const totalArea = estimationData.tongDienTichQuyDoi || estimationData.dienTich;

            estimationData.finalPackages = [
                { ten: 'Nhân công & Ván khuôn', donGia: formatCurrency(donGiaNhanCongVanKhuon) + ' / m²', tongChiPhi: formatCurrency(donGiaNhanCongVanKhuon * totalArea) },
                { ten: 'Phần thô', donGia: formatCurrency(donGiaPhanTho) + ' / m²', tongChiPhi: formatCurrency(donGiaPhanTho * totalArea) },
                { ten: `Trọn gói (gói ${goiVatLieu})`, donGia: `${formatCurrency(donGiaTronGoiMin)} - ${formatCurrency(donGiaTronGoiMax)} / m²`, tongChiPhi: `${formatCurrency(donGiaTronGoiMin * totalArea)} - ${formatCurrency(donGiaTronGoiMax * totalArea)}` }
            ];
        }

        function renderFinalResults() {
            if (!step3ResultWrapper || !estimationData.bangPhanTich || !estimationData.finalPackages) return;

            let breakdownTableRows = '';
            let tongChiPhiTruocLoiNhuan = 0;

            estimationData.bangPhanTich.forEach(item => {
                breakdownTableRows += `
                    <tr>
                        <td>${item.stt}</td>
                        <td>${item.ten}</td>
                        <td>${item.dvt}</td>
                        <td>${item.kl ? item.kl.toFixed(3) : '-'}</td>
                        <td>${formatCurrency(item.donGia)}</td>
                        <td>${formatCurrency(item.thanhTien)}</td>
                    </tr>
                `;
                tongChiPhiTruocLoiNhuan += item.thanhTien;
            });
            
            const qllnPercentage = estimationData.bangGiaDaDieuChinh['loi_nhuan'] || 0;
            
            breakdownTableRows += `
                <tr>
                    <td>12</td>
                    <td>Quản lý lợi nhuận</td>
                    <td>%</td>
                    <td>${qllnPercentage}</td>
                    <td>-</td>
                    <td>-</td> 
                </tr>
            `;

            const [nhanCongPkg, phanThoPkg, tronGoiPkg] = estimationData.finalPackages;

            breakdownTableRows += `
                <tr class="summary-row-background">
                    <td class="summary-cell"><strong>I</strong></td>
                    <td class="summary-cell"><strong>Nhân công, ván khuôn = (10+11)*(1+QLLN)</strong></td>
                    <td class="summary-cell">VND/m2</td>
                    <td class="summary-cell">-</td>
                    <td class="summary-cell">-</td>
                    <td class="summary-cell"><strong>${nhanCongPkg.donGia.replace(' / m²', '')}</strong></td>
                </tr>
            `;

            breakdownTableRows += `
                <tr class="summary-row-background">
                    <td class="summary-cell"><strong>II</strong></td>
                    <td class="summary-cell"><strong>Phần thô = (1+2+…+11)*(1+QLLN)</strong></td>
                    <td class="summary-cell">VND/m2</td>
                    <td class="summary-cell">-</td>
                    <td class="summary-cell">-</td>
                    <td class="summary-cell"><strong>${phanThoPkg.donGia.replace(' / m²', '')}</strong></td>
                </tr>
            `;
            
            const breakdownTableHtml = `
                <table class="payment-schedule-table">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Tên VTNC</th>
                            <th>ĐVT</th>
                            <th>KL/ĐM</th>
                            <th>Đơn Giá (VNĐ/ĐVT)</th>
                            <th>Thành Tiền (VNĐ/m²)</th>
                        </tr>
                    </thead>
                    <tbody>${breakdownTableRows}</tbody>
                </table>
            `;
            
            const goiVatLieuDisplay = { 'Thuong': 'Thường', 'Kha': 'Khá', 'Tot': 'Tốt' };
            const goiVatLieuText = goiVatLieuDisplay[estimationData.goiVatLieu] || estimationData.goiVatLieu;

            const donGiaVND = tronGoiPkg.donGia.replace(' / m²', ' VNĐ / m²');

            const tronGoiHtml = `
                 <h4>Báo giá Gói Xây nhà Trọn gói</h4>
                 <p>Dựa trên chi phí phần thô và gói vật liệu hoàn thiện <strong>${goiVatLieuText}</strong> bạn đã chọn, chi phí trọn gói ước tính là:</p>
                 <div class="package-container">
                    <div class="package-card">
                        <div class="package-body">
                            <div class="package-price-per-sqm">
                                <span>Đơn giá:</span>
                                <strong>${donGiaVND}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const finalHtml = `
                <h4>Bảng dự toán chi phí Phần Thô / m² xây dựng</h4>
                <div class="table-scroll-wrapper">
                   ${breakdownTableHtml}
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                ${tronGoiHtml}
                 <p class="disclaimer">Ghi chú quan trọng:<br>
                    - Tổng chi phí của các gói được ước tính dựa trên <strong>tổng diện tích quy đổi (${(estimationData.tongDienTichQuyDoi || 0).toFixed(2)} m²)</strong>. Báo giá chi tiết sẽ được cung cấp sau khi có bản vẽ thiết kế và bóc tách khối lượng chính xác.<br>
                    - Đơn giá Phần thô và Nhân công, ván khuôn được tính trên mỗi m² xây dựng.
                </p>
            `;

            step3ResultWrapper.innerHTML = finalHtml;
        }

        function renderPriceTable(priceData) {
            if (!step2ContentWrapper) return;
            step2ContentWrapper.innerHTML = '';

            const table = document.createElement('table');
            table.className = 'payment-schedule-table';
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tên VTNC</th>
                        <th>Đơn vị tính</th>
                        <th>Đơn giá</th>
                        <th>Quy cách</th>
                    </tr>
                </thead>
                <tbody id="bang-gia-body"></tbody>
            `;

            const tableBody = table.querySelector('#bang-gia-body');
            priceData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.ten}</td>
                    <td>${item.don_vi_tinh}</td>
                    <td><input type="number" class="don-gia-input" data-id="${item.id}" value="${item.don_gia}" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;"></td>
                    <td>${item.quy_cach || '-'}</td>
                `;
                tableBody.appendChild(row);
            });

            const profitRow = document.createElement('tr');
            profitRow.innerHTML = `
                <td>${priceData.length + 1}</td>
                <td>Quản lý, lợi nhuận</td>
                <td>%</td>
                <td><input type="number" class="don-gia-input" data-id="loi_nhuan" value="15" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;"></td>
                <td>Tính trên tổng chi phí vật tư, nhân công</td>
            `;
            tableBody.appendChild(profitRow);
            step2ContentWrapper.appendChild(table);
        }

        // Cập nhật hàm updateSlider để sử dụng basePath
        function updateSlider(index) {
            if (!currentImageList || currentImageList.length === 0 || !congTrinhImage || !imageIndexDisplay || !prevButton || !nextButton) {
                if(sliderControls) sliderControls.style.display = 'none';
                if(congTrinhImage) congTrinhImage.style.cursor = 'default';
                return;
            };

            currentImageIndex = index;
            // Ghép basePath với tên file
            const imagePath = `assets/images/cong_trinh/${currentImageBasePath}${currentImageList[currentImageIndex]}`;
            congTrinhImage.src = imagePath;
            imageIndexDisplay.textContent = `${currentImageIndex + 1}/${currentImageList.length}`;
            prevButton.disabled = (currentImageIndex === 0);
            nextButton.disabled = (currentImageIndex >= currentImageList.length - 1);
            congTrinhImage.style.cursor = currentImageList.length > 1 ? 'pointer' : 'default';
        }

        // Cập nhật hàm updateCaseImage để lưu basePath
        function updateCaseImage() {
            if (typeof estimatorData === 'undefined' || !estimatorData.caseImages) {
                console.error("Lỗi: estimatorData.caseImages không tồn tại.");
                return;
            }

            const floors = parseInt(soTangInput.value, 10);
            let key = '';

            if (floors === 1) {
                key = `1__${loaiMaiSotang1Input.value}`;
            } else if (floors > 1) {
                let tangPrefix = '2'; 
                const sanThuong = sanThuongSelect.value;

                if (sanThuong === 'khong') {
                    key = `${tangPrefix}__khong__${loaiMaiInput.value}`;
                } else if (['trong', 'gian_hoa_mai_ton', 'mai_ngoi'].includes(sanThuong)) {
                    key = `${tangPrefix}__${sanThuong}`;
                } else if (['phong', 'phong_gian_hoa'].includes(sanThuong)) {
                    key = `${tangPrefix}__${sanThuong}__${loaiPhongSelect.value}`;
                }
            }

            const imageData = estimatorData.caseImages[key];

            if (imageData && imageData.images && imageData.images.length > 0) {
                currentImageList = imageData.images;
                currentImageBasePath = imageData.basePath || ''; // <-- Lưu basePath
                if(sliderControls) sliderControls.style.display = currentImageList.length > 1 ? 'flex' : 'none';
                updateSlider(0);
            } else {
                currentImageList = [];
                currentImageBasePath = ''; // <-- Reset basePath
                congTrinhImage.src = 'https://placehold.co/800x600/cccccc/FFFFFF?text=Chọn+đủ+thông+tin';
                if(sliderControls) sliderControls.style.display = 'none';
                if(congTrinhImage) congTrinhImage.style.cursor = 'default';
            }

            updateImageCaption();
        }

        function populateSelectWithOptions(selectElement, options) {
            if (!selectElement || !options) return;
            selectElement.innerHTML = '';
            options.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                selectElement.appendChild(option);
            });
        }

        function updateImageCaption() {
            const floors = soTangInput.value || '...';
            let captionText = `Nhà ${floors} tầng`;
            const floorsInt = parseInt(floors, 10);

            if (floorsInt === 1) {
                const selectedOption = loaiMaiSotang1Input.options[loaiMaiSotang1Input.selectedIndex];
                if (selectedOption) captionText += ` - ${selectedOption.text}`;
            } else if (floorsInt > 1) {
                const sanThuongSelectedOption = sanThuongSelect.options[sanThuongSelect.selectedIndex];
                if (!sanThuongSelectedOption) return;

                captionText += ` - ${sanThuongSelectedOption.text}`;
                if (sanThuongSelect.value === 'khong') {
                     const loaiMaiSelectedOption = loaiMaiInput.options[loaiMaiInput.selectedIndex];
                     if(loaiMaiSelectedOption) captionText = `Nhà ${floors} tầng - ${loaiMaiSelectedOption.text}`;
                } else if (sanThuongSelect.value.includes('phong')) {
                     const loaiPhongSelectedOption = loaiPhongSelect.options[loaiPhongSelect.selectedIndex];
                     if(loaiPhongSelectedOption) captionText += ` (${loaiPhongSelectedOption.text})`;
                }
            }
            congTrinhCaption.textContent = captionText;
        }

        function validateForm() {
            let isValid = true;
            [soTangError, chieuDaiError, chieuRongError, dtBcTruocError, dtBcSauError, dtMaiSotang1Error, dtMaiError, combinedAreaError].forEach(el => el.classList.add('hidden'));
            extendedAreaInputs.forEach(item => { if (item.error) item.error.classList.add('hidden'); });
            const floors = parseInt(soTangInput.value, 10);
            const length = parseFloat(daiInput.value);
            const width = parseFloat(rongInput.value);
            const baseArea = parseFloat(dienTichInput.value) || 0;
            if (isNaN(floors) || floors < 1 || floors > 10) {
                soTangError.textContent = 'Số tầng phải từ 1 đến 10.';
                soTangError.classList.remove('hidden');
                isValid = false;
            }
            if (isNaN(width) || width < 3) {
                chieuRongError.textContent = 'Chiều rộng phải lớn hơn hoặc bằng 3m.';
                chieuRongError.classList.remove('hidden');
                isValid = false;
            }
            if (isNaN(length) || length < 5) {
                chieuDaiError.textContent = 'Chiều dài phải lớn hơn hoặc bằng 5m.';
                chieuDaiError.classList.remove('hidden');
                isValid = false;
            } else if (length <= width) {
                chieuDaiError.textContent = 'Chiều dài phải lớn hơn chiều rộng.';
                chieuDaiError.classList.remove('hidden');
                isValid = false;
            }
            if (bcTruocToggle.checked) {
                const dtBcTruoc = parseFloat(dtBcTruocInput.value);
                if (isNaN(dtBcTruoc) || dtBcTruoc < 1) {
                    dtBcTruocError.textContent = 'Diện tích phải >= 1m².';
                    dtBcTruocError.classList.remove('hidden');
                    isValid = false;
                }
            }
            if (bcSauToggle.checked) {
                const dtBcSau = parseFloat(dtBcSauInput.value);
                if (isNaN(dtBcSau) || dtBcSau < 1) {
                    dtBcSauError.textContent = 'Diện tích phải >= 1m².';
                    dtBcSauError.classList.remove('hidden');
                    isValid = false;
                }
            }
            extendedAreaInputs.forEach(item => {
                if (item.container && !item.container.classList.contains('hidden')) {
                    const value = parseFloat(item.input.value);
                    if (isNaN(value) || value < 1) {
                        item.error.textContent = 'Diện tích phải >= 1m².';
                        item.error.classList.remove('hidden');
                        isValid = false;
                    }
                }
            });
            if (!maiOnlyFieldset.classList.contains('hidden')) {
                const dtMai1 = parseFloat(dienTichMaiSotang1Input.value);
                if (isNaN(dtMai1) || dtMai1 < 1) {
                    dtMaiSotang1Error.textContent = 'Diện tích phải >= 1m².';
                    dtMaiSotang1Error.classList.remove('hidden');
                    isValid = false;
                }
            }
            if (!dienTichMaiContainer.classList.contains('hidden')) {
                const dtMai = parseFloat(dienTichMaiInput.value);
                if (isNaN(dtMai) || dtMai < 1) {
                    dtMaiError.textContent = 'Diện tích phải >= 1m².';
                    dtMaiError.classList.remove('hidden');
                    isValid = false;
                }
            }
            if (!hangMucMoRongFieldset.classList.contains('hidden')) {
                const tumArea = tumContainer.classList.contains('hidden') ? 0 : (parseFloat(dienTichTumInput.value) || 0);
                const gianHoaArea = gianHoaContainer.classList.contains('hidden') ? 0 : (parseFloat(dienTichGianHoaInput.value) || 0);
                const phongArea = dienTichPhongContainer.classList.contains('hidden') ? 0 : (parseFloat(dienTichPhongInput.value) || 0);
                const totalExtendedArea = tumArea + gianHoaArea + phongArea;
                const maxAllowedArea = baseArea * 1.1;
                if (totalExtendedArea > maxAllowedArea) {
                    combinedAreaError.textContent = `Tổng diện tích các hạng mục mở rộng (${totalExtendedArea.toFixed(2)}m²) không được vượt quá 110% diện tích xây dựng (${maxAllowedArea.toFixed(2)}m²).`;
                    combinedAreaError.classList.remove('hidden');
                    isValid = false;
                }
            }
            nextBtn.disabled = !isValid;
            return isValid;
        }

        function calculateBaseArea() {
            const dai = parseFloat(daiInput.value) || 0;
            const rong = parseFloat(rongInput.value) || 0;
            dienTichInput.value = (dai * rong).toFixed(2);
        }

        function updateDefaultValues() {
            const baseArea = parseFloat(dienTichInput.value) || 0;
            if (baseArea === 0) return;
            const tumArea = baseArea * 0.3;
            const stTrongArea = baseArea - tumArea;
            dienTichTumInput.value = tumArea.toFixed(2);
            dienTichStTrongInput.value = stTrongArea.toFixed(2);
            if (!maiOnlyFieldset.classList.contains('hidden')) {
                const loaiMaiValue = loaiMaiSotang1Input.value;
                dienTichMaiSotang1Input.value = (loaiMaiValue.includes('Mái bằng') ? baseArea : baseArea / 0.707).toFixed(2);
            }
            if (!hangMucMoRongFieldset.classList.contains('hidden') && sanThuongSelect.value === 'khong') {
                const loaiMaiValue = loaiMaiInput.value;
                dienTichMaiInput.value = (loaiMaiValue.includes('Mái bằng') ? baseArea : baseArea / 0.707).toFixed(2);
            }
        }

        function toggleVisibility(toggle, container) {
            container.classList.toggle('hidden', !toggle.checked);
            validateForm();
        }

        function handleFloorChange() {
            const floors = parseInt(soTangInput.value, 10) || 0;
            const isValidFloor = !isNaN(floors) && floors >= 1 && floors <= 10;
            if (isValidFloor && floors === 1) {
                hangMucMoRongFieldset.classList.add('hidden');
                maiOnlyFieldset.classList.remove('hidden');
            } else {
                hangMucMoRongFieldset.classList.remove('hidden');
                maiOnlyFieldset.classList.add('hidden');
                handleSanThuongChange();
            }
            updateDefaultValues();
            updateCaseImage();
            validateForm();
        }

        function handleSanThuongChange() {
            const selectedValue = sanThuongSelect.value;
            if (hangMucMoRongFieldset.classList.contains('hidden')) return;
            [tumContainer, stTrongContainer, gianHoaContainer, maiNgoiContainer, loaiPhongContainer, dienTichPhongContainer, loaiMaiContainer, dienTichMaiContainer].forEach(el => el.classList.add('hidden'));
            if (selectedValue === 'khong') {
                loaiMaiContainer.classList.remove('hidden');
                dienTichMaiContainer.classList.remove('hidden');
            } else {
                tumContainer.classList.remove('hidden');
                stTrongContainer.classList.remove('hidden');
                switch (selectedValue) {
                    case 'gian_hoa_mai_ton': gianHoaContainer.classList.remove('hidden'); break;
                    case 'mai_ngoi': maiNgoiContainer.classList.remove('hidden'); break;
                    case 'phong':
                        loaiPhongContainer.classList.remove('hidden');
                        dienTichPhongContainer.classList.remove('hidden');
                        break;
                    case 'phong_gian_hoa':
                        gianHoaContainer.classList.remove('hidden');
                        loaiPhongContainer.classList.remove('hidden');
                        dienTichPhongContainer.classList.remove('hidden');
                        break;
                }
            }
            updateDefaultValues();
            updateCaseImage();
            validateForm();
        }

        function updateUI() {
            steps.forEach((step, index) => {
                if(step) step.classList.toggle('hidden', index + 1 !== currentStep);
            });
            stepperItems.forEach((item, index) => {
                if(!item) return;
                const circle = item.querySelector('.step-circle');
                item.classList.remove('active', 'completed');
                if (index + 1 < currentStep) {
                    item.classList.add('completed');
                    circle.innerHTML = '✓';
                } else if (index + 1 === currentStep) {
                    item.classList.add('active');
                    circle.innerHTML = index + 1;
                } else {
                    circle.innerHTML = index + 1;
                }
            });
            backBtn.disabled = currentStep === 1;
            nextBtn.textContent = (currentStep === totalSteps) ? 'Hoàn tất' : 'Tiếp tục';

            if (currentStep === totalSteps) {
                if(navButtons) navButtons.classList.add('hidden');
            } else {
                if(navButtons) navButtons.classList.remove('hidden');
            }
        }

        if (typeof estimatorData !== 'undefined') {
            populateSelectWithOptions(loaiCongTrinhSelect, estimatorData.loaiCongTrinh);
            populateSelectWithOptions(sanThuongSelect, estimatorData.loaiSanThuong);
            populateSelectWithOptions(loaiPhongSelect, estimatorData.loaiPhongSanThuong);
            populateSelectWithOptions(loaiMaiInput, estimatorData.loaiMai);
            populateSelectWithOptions(loaiMaiSotang1Input, estimatorData.loaiMai);
        }

        if (restartBtn) { restartBtn.addEventListener('click', () => { currentStep = 1; updateUI(); if(navButtons) navButtons.classList.remove('hidden'); }); }
        if (backBtnStep3) { backBtnStep3.addEventListener('click', () => { if (currentStep > 1) { currentStep--; updateUI(); if(navButtons) navButtons.classList.remove('hidden'); modalContainer.querySelector('.modal-content').scrollTo(0, 0); } }); }

        nextBtn.addEventListener('click', () => {
             if (currentStep >= totalSteps) return;

            if (currentStep === 1) {
                if (!validateForm()) return;

                const goiVatLieuChecked = modalContainer.querySelector('input[name="vat-lieu"]:checked');
                const loaiMongChecked = modalContainer.querySelector('input[name="mong"]:checked');
                const tangHamSelect = modalContainer.querySelector('#tang-ham');

                estimationData = {
                    khuVuc: khuVucSelect.value,
                    loaiCongTrinh: loaiCongTrinhSelect.value,
                    goiVatLieu: goiVatLieuChecked ? goiVatLieuChecked.value : 'Thường',
                    loaiMong: loaiMongChecked ? loaiMongChecked.value : 'Móng đơn/băng',
                    tangHam: tangHamSelect ? tangHamSelect.value : 'Không',
                    soTang: parseInt(soTangInput.value, 10),
                    chieuDai: parseFloat(daiInput.value),
                    chieuRong: parseFloat(rongInput.value),
                    dienTich: parseFloat(dienTichInput.value),
                    sanThuong: sanThuongSelect.value,
                    loaiMai: loaiMaiInput.value,
                    loaiMaiSotang1: loaiMaiSotang1Input.value
                };

                const bangGiaHienTai = (typeof donGiaVatTuTheoKhuVuc !== 'undefined' && donGiaVatTuTheoKhuVuc[estimationData.khuVuc])
                    ? donGiaVatTuTheoKhuVuc[estimationData.khuVuc]
                    : (typeof donGiaVatTuTheoKhuVuc !== 'undefined' ? donGiaVatTuTheoKhuVuc['Khác'] : []);

                estimationData.bangGiaGoc = bangGiaHienTai;

                if(khuVucDonGiaSpan) khuVucDonGiaSpan.textContent = estimationData.khuVuc;
                renderPriceTable(bangGiaHienTai);

            } else if (currentStep === 2) {
                calculateAndRenderConvertedArea();
                calculateDetailedBreakdown();
                renderTotalCostSummary(); 
                renderFinalResults();
            }

            currentStep++;
            updateUI();
            modalContainer.querySelector('.modal-content').scrollTo(0, 0);
        });

        backBtn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; updateUI(); modalContainer.querySelector('.modal-content').scrollTo(0, 0); } });

        if (prevButton) prevButton.addEventListener('click', () => { if (currentImageIndex > 0) updateSlider(currentImageIndex - 1); });
        if (nextButton) nextButton.addEventListener('click', () => { if (currentImageIndex < currentImageList.length - 1) updateSlider(currentImageIndex + 1); });

        if (congTrinhImage) {
            congTrinhImage.addEventListener('click', (event) => {
                if (currentImageList.length <= 1) return;
                const rect = congTrinhImage.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                if (clickX > rect.width / 2) {
                    const nextIndex = (currentImageIndex + 1) % currentImageList.length;
                    updateSlider(nextIndex);
                } else {
                    const prevIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
                    updateSlider(prevIndex);
                }
            });

            congTrinhImage.addEventListener('mousemove', (event) => {
                if (currentImageList.length <= 1) { congTrinhImage.style.cursor = 'default'; return; };
                const rect = congTrinhImage.getBoundingClientRect();
                const hoverX = event.clientX - rect.left;
                congTrinhImage.style.cursor = (hoverX > rect.width / 2) ? 'e-resize' : 'w-resize';
            });
            congTrinhImage.addEventListener('mouseleave', () => { congTrinhImage.style.cursor = currentImageList.length > 1 ? 'pointer' : 'default'; });
        }

        const allRelevantInputs = [
            soTangInput, daiInput, rongInput, dtBcTruocInput, dtBcSauInput, dienTichMaiSotang1Input, dienTichMaiInput,
            sanThuongSelect, loaiMaiInput, loaiMaiSotang1Input, loaiPhongSelect,
            ...extendedAreaInputs.map(item => item.input)
        ];

        allRelevantInputs.forEach(input => {
            if (input) {
                const eventType = input.tagName.toLowerCase() === 'select' ? 'change' : 'input';
                input.addEventListener(eventType, () => {
                    if (input === daiInput || input === rongInput) {
                        if (input === daiInput && parseFloat(daiInput.value) > 50) daiInput.value = 50;
                        if (input === rongInput && parseFloat(rongInput.value) > 20) rongInput.value = 20;
                        calculateBaseArea();
                        updateDefaultValues();
                    }
                    if (input === soTangInput) {
                        handleFloorChange();
                    } else if (input === sanThuongSelect || input === loaiMaiInput || input === loaiPhongSelect || input === loaiMaiSotang1Input) {
                        handleSanThuongChange();
                    } else {
                        updateCaseImage();
                    }
                    validateForm();
                });
            }
        });

        if(bcTruocToggle) bcTruocToggle.addEventListener('change', () => toggleVisibility(bcTruocToggle, bcTruocContainer));
        if(bcSauToggle) bcSauToggle.addEventListener('change', () => toggleVisibility(bcSauToggle, bcSauContainer));

        if (zoomIcon) {
            zoomIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (imageZoomModal) {
                    zoomedImage.src = congTrinhImage.src;
                    imageZoomModal.classList.remove('hidden');
                    const showNav = currentImageList.length > 1;
                    if(zoomPrevBtn) zoomPrevBtn.style.display = showNav ? 'flex' : 'none';
                    if(zoomNextBtn) zoomNextBtn.style.display = showNav ? 'flex' : 'none';
                }
            });
        }

        if (zoomPrevBtn) {
            zoomPrevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const prevIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
                updateSlider(prevIndex);
                if(zoomedImage) zoomedImage.src = congTrinhImage.src;
            });
        }
        if (zoomNextBtn) {
            zoomNextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const nextIndex = (currentImageIndex + 1) % currentImageList.length;
                updateSlider(nextIndex);
                if(zoomedImage) zoomedImage.src = congTrinhImage.src;
            });
        }

        if (closeZoomModal) { closeZoomModal.addEventListener('click', () => { if (imageZoomModal) imageZoomModal.classList.add('hidden'); }); }
        if (imageZoomModal) { imageZoomModal.addEventListener('click', (e) => { if (e.target === imageZoomModal) { imageZoomModal.classList.add('hidden'); } }); }

        calculateBaseArea();
        handleFloorChange();
        updateUI();
    }
    
    initReusableModal('nam-mua-nha-modal', 'open-nam-mua-nha-modal');
    initNamMuaNhaModal();
    initKhaiToanXayDung();
    initReusableModal('khai-toan-xay-dung-modal', 'open-khai-toan-modal');

});