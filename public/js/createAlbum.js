document.getElementById("createAlbumForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("albumName").value;
    const description = document.getElementById("albumDescription").value;

    try {
        const response = await fetch("/createAlbum", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description }) // Passing title and desc
        });

        if (response.ok) {
            const album = await response.json();
            addPlaylistToUI(album);
            closeModal(); // closeModal function untuk tutup modal
        } else {
            throw new Error("Failed to create album");
        }
    } catch (error) {
        console.error("Error creating album:", error);
    }
});

async function addAlbumToUI(album) {
    const albumContainer = document.querySelector(".list-items");
    
    try {
        const isDuplicate = await checkDuplicateAlbum(album.title);
        
        if (isDuplicate) {
            alert("Album with this name already exists. Please choose a different name.");
            return;
        }
        
        const albumItem = document.createElement("div");
        albumItem.classList.add("item-playlist", "bg-neutral-800", "w-full", "h-[55px]", "list-none", "rounded-md", "overflow-hidden", "flex", "items-center", "hover:opacity-60", "transition", "hover:cursor-pointer");
        albumItem.innerHTML = `
            <img src="images/liked.png" alt="liked songs" class="w-[55px]">
            <p class="text-neutral-300 ml-3 font-medium">${album.title}</p>
        `;
        albumContainer.appendChild(albumItem);
    } catch (error) {
        console.error("Error adding album to UI:", error);
    }
}