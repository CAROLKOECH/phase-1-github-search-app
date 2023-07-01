document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const moviePoster = document.getElementById('poster');
    const movieTitle = document.getElementById('title');
    const movieRuntime = document.getElementById('runtime');
    const movieShowtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketBtn = document.getElementById('buy-ticket-btn');
  
    // Fetch movie list
    fetch('/films')
      .then(response => response.json())
      .then(films => {
        films.forEach(film => {
          const li = document.createElement('li');
          li.classList.add('film', 'item');
          li.textContent = film.title;
          filmsList.appendChild(li);
  
          li.addEventListener('click', () => {
            // Fetch movie details
            fetch(`/films/${film.id}`)
              .then(response => response.json())
              .then(details => {
                displayMovieDetails(details);
              })
              .catch(error => {
                console.log('Error fetching movie details:', error);
              });
          });
        });
      })
      .catch(error => {
        console.log('Error fetching movie list:', error);
      });
  
    function displayMovieDetails(movie) {
      moviePoster.src = movie.poster;
      movieTitle.textContent = movie.title;
      movieRuntime.textContent = movie.runtime;
      movieShowtime.textContent = movie.showtime;
      const ticketsAvailable = movie.capacity - movie.tickets_sold;
      availableTickets.textContent = ticketsAvailable;
  
      if (ticketsAvailable === 0) {
        buyTicketBtn.disabled = true;
        buyTicketBtn.textContent = 'Sold Out';
      } else {
        buyTicketBtn.disabled = false;
        buyTicketBtn.textContent = 'Buy Ticket';
      }
    }
  
    buyTicketBtn.addEventListener('click', () => {
      const ticketsAvailable = parseInt(availableTickets.textContent);
      if (ticketsAvailable > 0) {
        availableTickets.textContent = ticketsAvailable - 1;
      }
    });
  });
  