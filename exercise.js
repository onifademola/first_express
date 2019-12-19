const express = require('express');
const app = express();

function getCustomer(id, callback) {
    setTimeout(() => {
      callback({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  }
  
  function getTopMovies(callback) {
    setTimeout(() => {
      callback(['movie1', 'movie2']);
    }, 4000);
  }
  
  function sendEmail(email, movies, callback) {
    setTimeout(() => {
      callback();
    }, 4000);
  }

  getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if (customer.isGold) {
      getTopMovies((movies) => {
        console.log('Top movies: ', movies);
        sendEmail(customer.email, movies, () => {
          console.log('Email sent...')
        });
      });
    }
  });

  async function runCustomer(id, customer) {
    try {
        const gCust = await getCustomer(id, customer);
        const gtMovies = await getTopMovies(gCust);
        const sEmail = await sendEmail(gCust.email, gtMovies, customer);
        console.log(sEmail);
    } catch(err) {
        console.log(err.message);
    }
  }
  
  runCustomer(1, "cus");

const port = process.env.PORT || 3002;
app.listen(port);