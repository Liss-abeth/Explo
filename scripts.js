document.getElementById('exploreBtn').addEventListener('click', () => {
  document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
});


document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

document.getElementById('about-link').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior
  document.querySelector('.about-container').scrollIntoView({
      behavior: 'smooth'
  });
});
document.getElementById('contact-link').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior
  document.querySelector('.body-cont').scrollIntoView({
      behavior: 'smooth'
  });
});

//navbar
function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('active');
}

function searchDestination() {
  const query = document.getElementById("search-input").value.toLowerCase();

  if (!query) {
    alert("Please enter a destination name to search.");
    return;
  }

  fetch("./destination.json")
    .then(response => response.json())
    .then(data => {
      // Find the first matching destination
      const destination = data.destinations.find(d => 
        d.name.toLowerCase().includes(query)
      );

      if (destination) {
        // Redirect to the details page with the destination ID
        window.location.href = `details.html?id=${destination.id}`;
      } else {
        alert("Destination not found. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error searching destination:", error);
      alert("An error occurred while searching. Please try again later.");
    });
}



// ...................catrgory
document.querySelectorAll('.category-button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.textContent.toLowerCase();
    window.location.href = `${category}.html`;
  });
});

function navigateToCategory(category) {
  window.location.href = `popular-destination.html?category=${category}`;
}
// ...........................slider
let currentIndex = 0;
const slider = document.querySelector('.slider-img');
const slides = document.querySelectorAll('.slider-img img');
const slideCount = slides.length;


function slideImages() {
currentIndex = (currentIndex + 1) % slideCount; 
slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}


setInterval(slideImages, 3000);

// ....................................login




//  // Select the form wrapper and toggle elements
//  const wrapper = document.querySelector('.form-wrapper');
//  const toggles = document.querySelectorAll('.toggle');

//  // Data store for users
//  const users = {}; // Object to store users with email as key

//  // Add click event to each toggle
//  toggles.forEach(toggle => {
//    toggle.addEventListener('click', () => {
//      // Toggle the active class to rotate the forms
//      wrapper.classList.toggle('active');
//    });
//  });

//  // Login and Sign-up buttons
//  const loginButton = document.getElementById('loginButton');
//  const signupButton = document.getElementById('signupButton');

//  // Login functionality
//  loginButton.addEventListener('click', () => {
//    const email = document.getElementById('loginEmail').value;
//    const password = document.getElementById('loginPassword').value;

//    if (users[email] && users[email].password === password) {
//      alert('Welcome back, ' + users[email].username + '!');
//    } else if (users[email]) {
//      alert('Incorrect password!');
//    } else {
//      alert('No account found with this email. Please sign up.');
//    }
//  });

//  // Sign-up functionality
//  signupButton.addEventListener('click', () => {
//    const username = document.getElementById('signupUsername').value;
//    const email = document.getElementById('signupEmail').value;
//    const password = document.getElementById('signupPassword').value;

//    if (users[email]) {
//      alert('An account already exists with this email. Please log in.');
//    } else {
//      users[email] = { username, password };
//      alert('Account created successfully! You can now log in.');
//      wrapper.classList.toggle('active'); // Switch to login form
//    }
//  });