document.getElementById("createPlaylistForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("playlistName").value;
    const description = document.getElementById("playlistDescription").value; // Added line to get description

    try {
        const response = await fetch("/createPlaylist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, description }) // Passing title and description
        });

        if (response.ok) {
            const playlist = await response.json();
            addPlaylistToUI(playlist);
            closeModal(); // Implement closeModal function to close the modal
        } else {
            throw new Error("Failed to create playlist");
        }
    } catch (error) {
        console.error("Error creating playlist:", error);
    }
});

async function addPlaylistToUI(playlist) {
    const playlistContainer = document.querySelector(".list-items");
    
    try {
        const isDuplicate = await checkDuplicatePlaylist(playlist.name);
        
        if (isDuplicate) {
            alert("Playlist with this name already exists. Please choose a different name.");
            return; // Stop further execution
        }
        
        const playlistItem = document.createElement("div");
        playlistItem.classList.add("item-playlist", "bg-neutral-800", "w-full", "h-[55px]", "list-none", "rounded-md", "overflow-hidden", "flex", "items-center", "hover:opacity-60", "transition", "hover:cursor-pointer");
        playlistItem.innerHTML = `
            <img src="images/liked.png" alt="liked songs" class="w-[55px]">
            <p class="text-neutral-300 ml-3 font-medium">${playlist.name}</p>
        `;
        playlistContainer.appendChild(playlistItem);
    } catch (error) {
        console.error("Error adding playlist to UI:", error);
    }
}