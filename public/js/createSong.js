document.getElementById("createSongForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submission listener activated.");

    const name = document.getElementById("songName").value;
    const genre = document.getElementById("songGenre").value;
    const duration = document.getElementById("songDuration").value;

    console.log("Song Name:", name);
    console.log("Song Genre:", genre);
    console.log("Song Duration:", duration);

    try {
        const response = await fetch('/createSong', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, genre, duration })
        });

        if (response.ok) {
            const message = await response.text();
            alert(message);
            closeModal();
        } else {
            console.error("Error creating song:", response.statusText);
        }
    } catch (error) {
        console.error("Error creating song:", error);
    }
});