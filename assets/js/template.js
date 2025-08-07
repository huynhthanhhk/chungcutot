// Thêm đoạn mã này vào tệp assets/js/template.js

document.addEventListener('DOMContentLoaded', function() {

    // Data mới dựa trên Hoang_Oc.js và Dien_Giai.js
    const hoangOcLookup = {
        10: "Nhất Cát", 11: "Nhì Nghi", 12: "Tam Địa Sát", 13: "Tứ Tấn Tài", 14: "Ngũ Thọ Tử", 15: "Lục Hoang Ốc",
        16: "Nhất Cát", 17: "Nhì Nghi", 18: "Tam Địa Sát", 19: "Tứ Tấn Tài", 20: "Nhì Nghi", 21: "Tam Địa Sát",
        22: "Tứ Tấn Tài", 23: "Ngũ Thọ Tử", 24: "Lục Hoang Ốc", 25: "Nhất Cát", 26: "Nhì Nghi", 27: "Tam Địa Sát",
        28: "Tứ Tấn Tài", 29: "Ngũ Thọ Tử", 30: "Tam Địa Sát", 31: "Tứ Tấn Tài", 32: "Ngũ Thọ Tử", 33: "Lục Hoang Ốc",
        34: "Nhất Cát", 35: "Nhì Nghi", 36: "Tam Địa Sát", 37: "Tứ Tấn Tài", 38: "Ngũ Thọ Tử", 39: "Lục Hoang Ốc",
        40: "Tứ Tấn Tài", 41: "Ngũ Thọ Tử", 42: "Lục Hoang Ốc", 43: "Nhất Cát", 44: "Nhì Nghi", 45: "Tam Địa Sát",
        46: "Tứ Tấn Tài", 47: "Ngũ Thọ Tử", 48: "Lục Hoang Ốc", 49: "Nhất Cát", 50: "Ngũ Thọ Tử", 51: "Lục Hoang Ốc",
        52: "Nhất Cát", 53: "Nhì Nghi", 54: "Tam Địa Sát", 55: "Tứ Tấn Tài", 56: "Ngũ Thọ Tử", 57: "Lục Hoang Ốc",
        58: "Nhất Cát", 59: "Nhì Nghi", 60: "Lục Hoang Ốc", 61: "Nhất Cát", 62: "Nhì Nghi", 63: "Tam Địa Sát",
        64: "Tứ Tấn Tài", 65: "Ngũ Thọ Tử", 66: "Lục Hoang Ốc", 67: "Nhất Cát", 68: "Nhì Nghi", 69: "Tam Địa Sát"
    };

    const hoangOcDienGiai = {
        "Nhất Cát": { isTot: true, yNghia: "Đây là cung tốt, làm nhà gặp cung này sẽ có được sự ổn định, mọi việc thuận lợi, tài lộc dồi dào." },
        "Nhì Nghi": { isTot: true, yNghia: "Cung tốt, mang lại tiền bạc, giúp gia chủ làm ăn thuận lợi, phát đạt, giàu sang, phú quý." },
        "Tam Địa Sát": { isTot: false, yNghia: "Cung xấu. Khi làm nhà phạm vào cung này gia chủ dễ sinh bệnh tật, hao tốn tài sản hoặc mất mạng." },
        "Tứ Tấn Tài": { isTot: true, yNghia: "Đây cũng là 1 cung tốt. Làm nhà gặp cung này gia chủ sẽ gặp được phúc lộc, làm ăn phát tài." },
        "Ngũ Thọ Tử": { isTot: false, yNghia: "Là một cung xấu, khi phạm phải cung này gia cảnh trên dưới sẽ lục đục, bất hòa." },
        "Lục Hoang Ốc": { isTot: false, yNghia: "Là một trong 3 cung xấu. Khi gặp cung này vận hạn sẽ khó thăng tiến, công danh dễ lụi bại." }
    };


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
            // ==========================================================
            // == THAY ĐỔI: Vô hiệu hóa dòng này để giữ lại thông tin   ==
            // ==========================================================
            // form.reset(); 
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

        const cungTen = hoangOcLookup[tuoiKiemTra];
        let isHoangOcPham = true;
        let hoangOcKetLuan = "Không xác định";
        let hoangOcDienGiaiKetQua = "Tuổi của gia chủ không nằm trong phạm vi tra cứu phổ biến.";

        if (cungTen && hoangOcDienGiai[cungTen]) {
            const cungChiTiet = hoangOcDienGiai[cungTen];
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

    initReusableModal('nam-mua-nha-modal', 'open-nam-mua-nha-modal');
    initNamMuaNhaModal();

});