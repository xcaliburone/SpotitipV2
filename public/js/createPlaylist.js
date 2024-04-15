document.addEventListener('DOMContentLoaded', function() {
    const createPlaylistButton = document.getElementById('createPlaylistButton');
    const createPlaylistModal = document.getElementById('createPlaylistModal');
    const closeCreatePlaylistModal = document.getElementsByClassName('close')[0];

    if (createPlaylistButton) {
        createPlaylistButton.onclick = function() {
            createPlaylistModal.style.display = "block";
        }
    } else {
        console.error("Element with ID 'createPlaylistButton' not found.");
    }

    if (closeCreatePlaylistModal) {
        closeCreatePlaylistModal.onclick = function() {
            createPlaylistModal.style.display = "none";
        }
    } else {
        console.error("Element with class 'close' not found.");
    }
});


// Ketika pengguna mengklik di luar modal, sembunyikan modal
window.onclick = function(event) {
    if (event.target == createPlaylistModal) {
        createPlaylistModal.style.display = "none";
    }
}

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

function addPlaylistToUI(playlist) {
    const playlistContainer = document.querySelector(".list-items");
    const playlistItem = document.createElement("div");
    playlistItem.classList.add("item-playlist", "bg-neutral-800", "w-full", "h-[55px]", "list-none", "rounded-md", "overflow-hidden", "flex", "items-center", "hover:opacity-60", "transition", "hover:cursor-pointer");
    playlistItem.innerHTML = `
        <img src="images/liked.png" alt="liked songs" class="w-[55px]">
        <p class="text-neutral-300 ml-3 font-medium">${playlist.name}</p>
    `;
    playlistContainer.appendChild(playlistItem);
}
