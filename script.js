// =========================
// MAIN SCRIPT (index + optional on berita.html)
// =========================
document.addEventListener('DOMContentLoaded', () => {

    // ----- helper: cek apakah elemen ada ----- //
    const el = id => document.getElementById(id);
    const qAll = sel => Array.from(document.querySelectorAll(sel));

    // ----- BREAKING SLIDER DATA ----- //
    const breakingData = [
        { img: "img/news1.jpg", judul: "Anita Pemilik Tumbler Tuku yang Hilang di KRL Kini Dipecat" },
        { img: "img/news2.jpg", judul: "Harga BBM Terbaru Jumat 28 November 2025, Cek Daftar Lengkap dan Kondisi Terbarunya" },
        { img: "img/news3.jpg", judul: "Banjir Sumatera: Update Terbaru Longsor dan Banjir Bandang di Wilayah Sumut, Sumbar, dan Aceh" },
        { img: "img/news11.jpg", judul: "iPhone 17 Resmi Dirilis, Ini Fitur Canggihnya" },
        { img: "img/news12.jpg", judul: "Atlet Indonesia Hamsa Lestaluhu Jadi Pemain Terbaik Liga Minifootball Asia" },
        { img: "img/news21.jpg", judul: "5 Tempat Wisata Yang Paling Hits Di Indonesia" }
    ];

    // ----- Slider: isi wrapper jika ada ----- //
    const wrapperElement = el('breakingWrapper');
    if (wrapperElement) {
        breakingData.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("breaking-item");
            div.innerHTML = `
                <img src="${item.img}" alt="${item.judul}">
                <h4>${item.judul}</h4>
            `;
            wrapperElement.appendChild(div);
        });
    }

    // ----- Slider logic (aman jika elemen ada) ----- //
    let posisi = 0;
    const itemWidth = 310;
    const totalItems = breakingData.length;
    const itemsPerFrame = 1;
    const maxLeft = -(itemWidth * (totalItems - itemsPerFrame));

    function geserSliderNext() {
        if (!wrapperElement) return;
        posisi -= itemWidth;
        if (posisi < maxLeft) posisi = 0;
        wrapperElement.style.transform = `translateX(${posisi}px)`;
    }

    // tombol manual (cek elemen sebelum pasang listener)
    const nextBtn = el('nextSlide');
    const prevBtn = el('prevSlide');
    if (nextBtn) nextBtn.addEventListener('click', geserSliderNext);
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (!wrapperElement) return;
        posisi += itemWidth;
        if (posisi > 0) posisi = maxLeft;
        wrapperElement.style.transform = `translateX(${posisi}px)`;
    });

    // auto slider
    let autoSlider = null;
    if (wrapperElement) {
        autoSlider = setInterval(geserSliderNext, 3000);
        wrapperElement.addEventListener("mouseenter", () => clearInterval(autoSlider));
        wrapperElement.addEventListener("mouseleave", () => autoSlider = setInterval(geserSliderNext, 3000));
    }

    // ----- NEWS DATA & RENDER ----- //
    // beritaData harus didefinisikan di js/data.js (pastikan file ada)
    function tampilkanBerita(kategori) {
        if (typeof beritaData === 'undefined') return;
        const data = beritaData[kategori] || [];
        const newsList = el('news-list');
        const judulSection = el('judul-section');
        if (!newsList || !judulSection) return;

        judulSection.textContent = kategori.replace("-", " ").toUpperCase();
        newsList.innerHTML = "";

        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("news-card");
            card.innerHTML = `
                <img src="${item.img}" alt="">
                <div class="text">
                    <h3>${item.judul}</h3>
                    <p class="deskripsi">${item.deskripsi}</p>
                    <a href="berita.html?id=${item.id}" class="btn-news">Baca Selengkapnya →</a>
                </div>
            `;
            newsList.appendChild(card);
        });
    }

    // Pasang event kategori (jika navbar ada)
    qAll('.navbar a').forEach(menu => {
        menu.addEventListener('click', () => {
            const kategori = menu.getAttribute('data-kategori');
            const breakingSection = el('breaking-section');
            if (breakingSection) breakingSection.style.display = 'none';
            tampilkanBerita(kategori);
        });
    });

    // DEFAULT LOAD (hanya di halaman yang punya news-list)
    if (el('news-list')) {
        const breakingSection = el('breaking-section');
        if (breakingSection) breakingSection.style.display = 'block';
        tampilkanBerita("hari-ini");
    }

    // ----- SEARCH (aman jika elemen ada) ----- //
    const searchInput = el('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function () {
            const keyword = searchInput.value.toLowerCase();
            if (typeof beritaData === 'undefined') return;
            const semuaData = Object.values(beritaData).flat();
            const hasil = semuaData.filter(item =>
                (item.judul || '').toLowerCase().includes(keyword) ||
                (item.deskripsi || '').toLowerCase().includes(keyword)
            );

            const newsList = el('news-list');
            const judulSection = el('judul-section');
            if (!newsList || !judulSection) return;

            if (keyword === "") {
                const breakingSection = el('breaking-section');
                if (breakingSection) breakingSection.style.display = 'block';
                tampilkanBerita("hari-ini");
                return;
            }

            const breakingSection = el('breaking-section');
            if (breakingSection) breakingSection.style.display = 'none';
            newsList.innerHTML = "";
            judulSection.textContent = `HASIL PENCARIAN: "${keyword}"`;

            hasil.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("news-card");
                card.innerHTML = `
                    <img src="${item.img}" alt="">
                    <div class="text">
                        <h3>${item.judul}</h3>
                        <p>${item.deskripsi}</p>
                        <a href="berita.html?id=${item.id}" class="btn-news">Baca Selengkapnya →</a>
                    </div>
                `;
                newsList.appendChild(card);
            });
        });
    }

    // ----- MODE (dark/light) ----- //
    const modeBtn = el('mode-btn');
    const logoText = document.querySelector('.logo .red');
    if (modeBtn) {
        modeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                modeBtn.textContent = '☀️';
                if (logoText) logoText.style.color = 'white';
            } else {
                modeBtn.textContent = '🌙';
                if (logoText) logoText.style.color = 'red';
            }
        });
    }
});
