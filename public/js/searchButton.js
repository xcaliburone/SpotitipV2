async function search() {
    const keyword = document.getElementById('searchInput').value;
    const response = await fetch(`/search?keyword=${keyword}`);
    const data = await response.json();

    const searchResultsElement = document.getElementById('searchResults');
    searchResultsElement.innerHTML = '';

    if (data && data.results && data.results.length > 0) {
        data.results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.textContent = JSON.stringify(result);
            searchResultsElement.appendChild(resultElement);
        });
    } else { console.log("No search results found"); }
}