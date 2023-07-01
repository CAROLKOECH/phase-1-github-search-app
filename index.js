const filmsEndpoint = 'http://localhost:3000/films/';
const filmDetails = document.getElementById('film-details');
const filmMenu = document.getElementById('films');

// Fetch and display the first movie's details
fetch(filmsEndpoint + '1')
  .then(response => response.json())
  .then(data => {
    displayFilmDetails(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Fetch and display all movies in the film menu
fetch(filmsEndpoint)
  .then(response => response.json())
  .then(data => {
    displayFilmMenu(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Display the film details
function displayFilmDetails(film) {
  document.getElementById('poster').innerHTML = `<img src="${film.poster}" alt="Film Poster">`;
  document.getElementById('title').textContent = film.title;
  document.getElementById('runtime').textContent = film.runtime;
  document.getElementById('showtime').textContent = film.showtime;
  const ticketsAvailable = film.capacity - film.tickets_sold;
  document.getElementById('tickets-available').textContent = ticketsAvailable;
  if (ticketsAvailable === 0) {
    document.getElementById('buy-ticket').disabled = true;
    document.getElementById('buy-ticket').textContent = 'Sold Out';
  } else {
    document.getElementById('buy-ticket').disabled = false;
    document.getElementById('buy-ticket').textContent = 'Buy Ticket';
  }

  // Log film details DOM elements
  console.log('Film Details:');
  console.log('Poster Element:', document.getElementById('poster'));
  console.log('Title Element:', document.getElementById('title'));
  console.log('Runtime Element:', document.getElementById('runtime'));
  console.log('Showtime Element:', document.getElementById('showtime'));
  console.log('Tickets Available Element:', document.getElementById('tickets-available'));
  console.log('Buy Ticket Button Element:', document.getElementById('buy-ticket'));
}

// Display the film menu
function displayFilmMenu(films) {
  filmMenu.innerHTML = '';
  films.forEach(film => {
    const li = document.createElement('li');
    li.textContent = film.title;
    li.classList.add('film-item');
    li.addEventListener('click', () => {
      displayFilmDetails(film);
    });
    filmMenu.appendChild(li);
  });

  // Log film menu DOM elements
  console.log('Film Menu:');
  console.log('Film Menu Element:', filmMenu);
  console.log('Film Menu List Items:', filmMenu.getElementsByTagName('li'));
}

// Handle buy ticket button click
document.getElementById('buy-ticket').addEventListener('click', () => {
  const ticketsAvailable = parseInt(document.getElementById('tickets-available').textContent);
  if (ticketsAvailable > 0) {
    const newTicketsAvailable = ticketsAvailable - 1;
    document.getElementById('tickets-available').textContent = newTicketsAvailable;
  }

  // Log buy ticket button click event
  console.log('Buy Ticket Button Clicked');
});
