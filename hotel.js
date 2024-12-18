// Get the hotel ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('hotelId');
console.log(hotelId); // Check if hotelId is being extracted

if (!hotelId) {
  console.error("Hotel ID is missing.");
} else {
  // Fetch data from the destination.json file only if hotelId exists
  fetch("./destination.json")
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the entire data to verify the structure

      let foundHotel = null;

      // Loop through each destination to search for the hotel
      for (const destination of data.destinations) {
        const hotel = destination.residencesNearby.find(hotel => hotel.hotelId === hotelId);
        if (hotel) {
          foundHotel = hotel;
          break; // Exit the loop once the hotel is found
        }
      }

      if (foundHotel) {
        console.log(foundHotel); // Log the hotel object found
        // Populating the HTML with the hotel details
        const hotelDetails = document.getElementById("hotelDetails");

        hotelDetails.innerHTML = `
          <div class="hotel-image-section">
            <img src="${foundHotel.image}" loading="lazy" alt="${foundHotel.name}" class="hotel-image">
            <div class="hotel-info-overlay">
              <h1 class="hotel-name">${foundHotel.name}</h1>
              <p class="hotel-rating">⭐ ${foundHotel.rating}</p>
            </div>
          </div>
          <div class="hotel-details-section">
            <p class="hotel-description">${foundHotel.description}</p>
            <p class="hotel-distance"><strong>Distance:</strong> ${foundHotel.distance}</p>
            <p><strong>Features:</strong> ${foundHotel.features.join(', ')}</p>
            <p class="hotel-price"><strong>Price Per Day:</strong> ${foundHotel.pricePerDay}</p>
            <button class="book-btn" onclick="window.location.href='${foundHotel.bookNowLink}'">Book Now</button>
          </div>
        `;
      } else {
        document.getElementById("hotelDetails").innerHTML = "<p>Hotel not found.</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching hotel details:", error);
    });
}
