// =========================
// LOAD BERITA
// =========================
const newsList = document.getElementById("news-list");
const judulSection = document.getElementById("judul-section");

// Fungsi menampilkan berita per kategori
function tampilkanBerita(kategori) {
    const data = beritaData[kategori];
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

// =========================
// BREAKING NEWS SLIDER
// =========================
const breakingSection = document.getElementById("breaking-section");
function showSlider(show) {
    if (!breakingSection) return;
    breakingSection.style.display = show ? "block" : "none";
}

const breakingData = [
    { img: "img/news1.jpg", judul: "Anita Pemilik Tumbler Tuku yang Hilang di KRL Kini Dipecat" },
    { img: "img/news2.jpg", judul: "Harga BBM Terbaru Jumat 28 November 2025, Cek Daftar Lengkap dan Kondisi Terbarunya" },
    { img: "img/news3.jpg", judul: "Banjir Sumatera: Update Terbaru Longsor dan Banjir Bandang di Wilayah Sumut, Sumbar, dan Aceh" },
    { img: "img/news11.jpg", judul: "iPhone 17 Resmi Dirilis, Ini Fitur Canggihnya" },
    { img: "img/news12.jpg", judul: "Atlet Indonesia Hamsa Lestaluhu Jadi Pemain Terbaik Liga Minifootball Asia" },
    { img: "img/news21.jpg", judul: "5 Tempat Wisata Yang Paling Hits Di Indonesia" }
];

const wrapper = document.getElementById("breakingWrapper");

// tambahkan slider item
breakingData.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("breaking-item");
    div.innerHTML = `
        <img src="${item.img}" alt="">
        <h4>${item.judul}</h4>
    `;
    wrapper.appendChild(div);
});

// =========================
// SLIDER LOGIC
// =========================
let posisi = 0;
const itemWidth = 310;  // width + margin
const totalItems = breakingData.length;
const itemsPerFrame = 1; // jumlah item terlihat dalam frame
const maxLeft = -(itemWidth * (totalItems - itemsPerFrame));

function geserSliderNext() {
    posisi -= itemWidth;
    if (posisi < maxLeft) posisi = 0; // looping kembali ke awal
    wrapperElement.style.transform = `translateX(${posisi}px)`;
}


const wrapperElement = document.getElementById("breakingWrapper");

function geserSliderNext() {
    posisi -= itemWidth;
    if (posisi < maxLeft) posisi = 0; // kembali ke awal kalau sudah akhir
    wrapperElement.style.transform = `translateX(${posisi}px)`;
}

// tombol manual
document.getElementById("nextSlide").addEventListener("click", () => {
    geserSliderNext();
});

document.getElementById("prevSlide").addEventListener("click", () => {
    posisi += itemWidth;
    if (posisi > 0) posisi = maxLeft; // kalau sudah di awal, lompat ke akhir
    wrapperElement.style.transform = `translateX(${posisi}px)`;
});

// =========================
// AUTO SLIDER
// =========================
let autoSlider = setInterval(geserSliderNext, 3000); // geser tiap 3 detik

// opsional: pause saat hover slider
wrapperElement.addEventListener("mouseenter", () => clearInterval(autoSlider));
wrapperElement.addEventListener("mouseleave", () => autoSlider = setInterval(geserSliderNext, 3000));


// =========================
// EVENT MENU KATEGORI
// =========================
document.querySelectorAll(".navbar a").forEach(menu => {
    menu.addEventListener("click", () => {
        const kategori = menu.getAttribute("data-kategori");
        showSlider(false); // sembunyikan slider saat klik kategori
        tampilkanBerita(kategori);
    });
});

// =========================
// DEFAULT LOAD
// =========================
showSlider(true); // tampilkan slider di awal
tampilkanBerita("hari-ini");

// =========================
// FITUR PENCARIAN
// =========================
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", function () {
    const keyword = searchInput.value.toLowerCase();
    const semuaData = Object.values(beritaData).flat();
    const hasil = semuaData.filter(item =>
        item.judul.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword)
    );

    if (keyword === "") {
        showSlider(true); // tampilkan slider jika search kosong
        tampilkanBerita("hari-ini");
        return;
    }

    showSlider(false); // sembunyikan slider saat search
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

// =========================
// MODE (DARK / LIGHT)
// =========================
const modeBtn = document.getElementById("mode-btn");
const logoText = document.querySelector(".logo .red"); // bagian "Nusantara"
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        modeBtn.textContent = "☀️";
        if (logoText) logoText.style.color = "white";
    } else {
        modeBtn.textContent = "🌙";
        if (logoText) logoText.style.color = "red";
    }
});

// =========================
// DETAIL BERITA (opsional)
// =========================
if (typeof data !== "undefined") {
    const detailJudul = document.getElementById("detail-judul");
    const detailImg = document.getElementById("detail-img");
    const detailIsi = document.getElementById("detail-isi");

    if (detailJudul) detailJudul.textContent = data.judul;
    if (detailImg) detailImg.src = data.img;
    if (detailIsi) {
        // menjadi paragraf per baris
        detailIsi.innerHTML = data.isi.split("\n").map(p => `<p>${p}</p>`).join("");
        // atau per kalimat
        const paragraf = data.isi.split(". ").map(p => `<p>${p.trim()}.</p>`).join("");
        detailIsi.innerHTML = paragraf;
    }
}
