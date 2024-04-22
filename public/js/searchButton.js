// Fungsi untuk melakukan pencarian dan menampilkan hasilnya
async function search() {
    const keyword = document.getElementById('searchInput').value; // Ambil kata kunci pencarian dari input
    const response = await fetch(`/search?keyword=${keyword}`); // Kirim permintaan pencarian ke server
    const data = await response.json(); // Ambil data hasil pencarian dari respons JSON

    // Tampilkan hasil pencarian di antarmuka pengguna
    const searchResultsElement = document.getElementById('searchResults');
    searchResultsElement.innerHTML = ''; // Kosongkan hasil pencarian sebelumnya

    if (data && data.results && data.results.length > 0) {
        // Lakukan sesuatu dengan hasil pencarian
        data.results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.textContent = JSON.stringify(result);
            searchResultsElement.appendChild(resultElement);
        });
    } else {
        // Tampilkan pesan bahwa tidak ada hasil pencarian yang ditemukan
        console.log("Tidak ada hasil pencarian yang ditemukan");
    }
}