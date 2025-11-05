async function fetchData() {
    try {
        const response = await fetch('/get-submissions'); // Call the Cloudflare Function
        const data = await response.json();

        if (response.ok) {
            populateTable(data);
        } else {
            console.error('Error fetching data:', data.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateTable(submissions) {
    const tableBody = document.getElementById('submissionsTable').querySelector('tbody');

    submissions.forEach(submission => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = submission.firstName;
        row.insertCell().textContent = submission.lastName;
        row.insertCell().textContent = submission.age;
        row.insertCell().textContent = submission.positions;
        row.insertCell().textContent = submission.moderationExperience;
        row.insertCell().textContent = submission.whyModerate;
        row.insertCell().textContent = submission.howHelp;
        row.insertCell().textContent = submission.proof;
    });
}

// Call the fetch data on load
fetchData();