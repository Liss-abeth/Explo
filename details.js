const urlParams = new URLSearchParams(window.location.search);
const destinationId = urlParams.get("id");

if (!destinationId) {
  document.querySelector(".container").innerHTML = "<p>Destination not specified.</p>";
  throw new Error("Destination ID is missing.");
}

fetch("./destination.json")
  .then(response => response.json())
  .then(data => {
    const destination = data.destinations.find(d => d.id === destinationId);

    if (destination) {
      // Populate main details
      document.getElementById("destination-name").textContent = destination.name;
      document.getElementById("destination-image").src = destination.image;
      document.getElementById("destination-description").textContent = destination.description;
      document.getElementById("destination-location").textContent = destination.location;
      document.getElementById("destination-rating").textContent = destination.rating.toFixed(1);
      document.getElementById("destination-navigator").href = destination.navigator;

      // Populate Residences Nearby
      const residencesContainer = document.getElementById("residences-container");
      destination.residencesNearby.forEach(residence => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${residence.image}" loading="lazy" alt="${residence.name}">
          <h3>${residence.name}</h3>
          <p>${residence.description}</p>
          <p><strong>Distance:</strong> ${residence.distance}</p>
          <p><strong>Rating:</strong> ${residence.rating.toFixed(1)} ⭐</p>
          <button class="book-button" onclick="window.location.href='${residence.hotelDetailsPage}'">Book Your Hotel</button>
        `;
        residencesContainer.appendChild(card);
      });

      // Populate Famous Attractions
      const attractionsContainer = document.getElementById("attractions-container");
      destination.famousAttractions.forEach(attraction => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${attraction.image}" loading="lazy" alt="${attraction.name}">
          <h3>${attraction.name}</h3>
          <p>${attraction.description}</p>
        `;
        attractionsContainer.appendChild(card);
      });
    } else {
      document.querySelector(".container").innerHTML = "<p>Destination not found.</p>";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.querySelector(".container").innerHTML = "<p>Unable to load destination details.</p>";
  });
