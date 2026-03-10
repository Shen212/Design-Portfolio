// script.js

// Function to fetch data from a Google Spreadsheet
async function fetchData(spreadsheetId, range) {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=YOUR_API_KEY`);
    const data = await response.json();
    return data.values;
}

// Example usage
fetchData('YOUR_SPREADSHEET_ID', 'Sheet1!A1:C10').then(data => {
    console.log(data);
});

// Add interactivity
document.getElementById('myButton').addEventListener('click', function() {
    alert('Button clicked!');
});
