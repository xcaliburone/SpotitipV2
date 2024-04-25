// document.getElementById("createAlbumForm").addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const name = document.getElementById("albumName").value;
//     const description = document.getElementById("albumDescription").value;

//     try {
//         const response = await fetch("/createAlbum", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, description })
//         });

//         if (response.ok) {
//             const message = await response.text();
//             alert(message);
//             closeModal();
//         } else { console.error("Error creating album:", response.statusText); }
//     } catch (error) {
//         console.error("Error creating album:", error);
//     }
// });