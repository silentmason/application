// script.js

document.getElementById('moderatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let age = document.getElementById('age').value;
    let positions = document.querySelectorAll('input[name="positions"]:checked');
    let moderationExperience = document.getElementById('moderationExperience').value;
    let whyModerate = document.getElementById('whyModerate').value;
    let howHelp = document.getElementById('howHelp').value;
    let proof = document.getElementById('proof').value; // Just the file name

    if (firstName === '' || lastName === '' || age === '' || positions.length === 0 || moderationExperience === '' || whyModerate === '' || howHelp === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Display submitted data (for demonstration purposes)
    let selectedPositions = Array.from(positions).map(p => p.value).join(', ');
    let message = `
        First Name: ${firstName}
        Last Name: ${lastName}
        Age: ${age}
        Positions: ${selectedPositions}
        Moderation Experience: ${moderationExperience}
        Why Moderate: ${whyModerate}
        How Help: ${howHelp}
        Proof File: ${proof}
    `;

    alert('Form submitted successfully!\n\n' + message);

    // In a real application, you would submit the data to a server here
    // using AJAX or a similar technique.

    // For file uploads, you would typically use FormData to handle the file data.
});