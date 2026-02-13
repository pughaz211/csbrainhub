// ===== counts.js =====

// 1️⃣ Replace with your Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbxgds7J5qtaQ8nyzvbqFW3L8MkOFqmQTOPJmcEidaKgGoOvhFKhH7Ua0_Twsl2PiDmE/exec"; 
// Example:
// const API_URL = "https://script.google.com/macros/s/AKfycbxxxxxxx/exec";

// Increment a single count when user clicks
function updateCounts(type, id){
  const el = document.getElementById(id);
  if(!el) return;

  // Optimistically update on page
  el.innerText = parseInt(el.innerText || "0") + 1;

  // Send request to Google Sheets
  fetch(`${API_URL}?type=${type}&id=${id}`)
    .then(res => res.text())
    .then(count => {
      // Update the count with server value
      el.innerText = count;
    })
    .catch(err => console.error("Error updating count:", err));
}

// Load all counts for a given type on page load
function loadCountsForType(type){
  // Select all spans for this type
  const spans = document.querySelectorAll(`[id^='${type}']`);
  spans.forEach(span => {
    const id = span.id;
    fetch(`${API_URL}?type=${type}&id=${id}&get=true`) 
      .then(res => res.text())
      .then(count => span.innerText = count)
      .catch(err => console.error("Error loading count:", err));
  });
}