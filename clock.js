/* ==========================
      JAM REALTIME
========================== */
function updateJam() {
    const now = new Date();
    document.getElementById("jam").textContent =
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}
setInterval(updateJam, 1000);
updateJam();


/* ==========================
     LOKASI OTOMATIS
========================== */
function tampilkanLokasi(lat, lon) {
    document.getElementById("lokasi").textContent = `Lokasi: ${lat}, ${lon}`;
}

function getCuaca(lat, lon) {
    document.getElementById("cuaca").textContent = "Cerah Berawan";
    document.getElementById("temperature").textContent = "27°C";
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude.toFixed(2);
        const lon = pos.coords.longitude.toFixed(2);

        tampilkanLokasi(lat, lon);
        getCuaca(lat, lon);
    }, () => {
        document.getElementById("lokasi").textContent = "Lokasi tidak diizinkan";
    });
} else {
    document.getElementById("lokasi").textContent = "Lokasi tidak didukung";
}
