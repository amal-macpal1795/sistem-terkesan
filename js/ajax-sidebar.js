document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Ambil URL dan title
            const url = this.getAttribute("href");
            const title = this.dataset.title || "Sistem Terkesan";

            // Tambah class aktif
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            // Loading sementara
            content.innerHTML = `<div id="loading">⏳ Memuat konten...</div>`;

            // Ambil konten pakai fetch
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error("Gagal memuat konten!");
                    return response.text();
                })
                .then(data => {
                    content.innerHTML = data;
                    document.title = `${title} | Sistem Terkesan`;
                })
                .catch(err => {
                    content.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
                });
        });
    });
});