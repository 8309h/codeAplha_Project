document.addEventListener("DOMContentLoaded", function() {
    populateDropdowns();
    setCurrentDate();
});

function populateDropdowns() {
    let daySelects = document.querySelectorAll("select[id$='-day']");
    let monthSelects = document.querySelectorAll("select[id$='-month']");
    let yearSelects = document.querySelectorAll("select[id$='-year']");

    for (let i = 1; i <= 31; i++) {
        daySelects.forEach(select => select.innerHTML += `<option value="${i}">${i}</option>`);
    }

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    months.forEach((month, index) => {
        monthSelects.forEach(select => select.innerHTML += `<option value="${index + 1}">${month}</option>`);
    });

    let currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        yearSelects.forEach(select => select.innerHTML += `<option value="${i}">${i}</option>`);
    }
}

function setCurrentDate() {
    let today = new Date();
    document.getElementById("current-day").value = today.getDate();
    document.getElementById("current-month").value = today.getMonth() + 1; // Months are 0-based
    document.getElementById("current-year").value = today.getFullYear();
}

function calculateAge() {
    let dob = new Date(`${document.getElementById("dob-year").value}-${document.getElementById("dob-month").value}-${document.getElementById("dob-day").value}`);
    let current = new Date(`${document.getElementById("current-year").value}-${document.getElementById("current-month").value}-${document.getElementById("current-day").value}`);

    if (dob > current) {
        alert("Date of birth cannot be in the future!");
        return;
    }

    let ageDiff = new Date(current - dob);
    let years = ageDiff.getUTCFullYear() - 1970;
    let months = ageDiff.getUTCMonth();
    let days = ageDiff.getUTCDate() - 1;

    // Calculate total days
    let totalDays = Math.floor((current - dob) / (1000 * 60 * 60 * 24));

    // Convert total days into weeks and extra days
    let weeks = Math.floor(totalDays / 7);
    let extraDays = totalDays % 7;

    // Convert total days into months and extra days
    let totalMonths = years * 12 + months;

    // Convert total days into hours, minutes, seconds
    let totalHours = totalDays * 24;
    let totalMinutes = totalHours * 60;
    let totalSeconds = totalMinutes * 60;

    // Display result
    let result = document.getElementById("result");
    result.innerHTML = `
        <p>You are <strong>${years} years, ${months} months, and ${days} days</strong> old.</p>
        <p>or <strong>${totalMonths} months and ${days} days</strong></p>
        <p>or <strong>${weeks} weeks and ${extraDays} days</strong></p>
        <p>or <strong>${totalDays} days</strong></p>
        <p>or <strong>${totalHours.toLocaleString()} hours</strong></p>
        <p>or <strong>${totalMinutes.toLocaleString()} minutes</strong></p>
        <p>or <strong>${totalSeconds.toLocaleString()} seconds</strong></p>
    `;
    result.classList.add("show-result");
}
