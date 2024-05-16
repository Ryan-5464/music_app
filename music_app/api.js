
async function fetchTrackList() {

    try {
        const response = await fetch('/data');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const dataList = document.getElementById('data-list');
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${item.id}, Name: ${item.name}`; // Adjust properties as per your database schema
            dataList.appendChild(listItem);
        });
    } 
    catch (error) {
        console.error(error);
    }
}

        document.addEventListener('DOMContentLoaded', () => {
            fetchDataAndDisplay();
        });