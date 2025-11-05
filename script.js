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


    // Success
    alert('Form submitted successfully!');
    document.getElementById('moderatorForm').reset();
});