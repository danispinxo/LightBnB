const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

//////////////////////////////////////////////////////////////////////////////////////
///// USER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////

const getUserWithEmail = function(email) {
  return pool
    .query(
    'SELECT * FROM users WHERE email = $1;', [email])
    .then((result) => {
      console.log('Getting user information!');
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}; // with email param, return user from database with that email for login
exports.getUserWithEmail = getUserWithEmail;

const getUserWithId = function(id) {
  return pool
    .query(
    'SELECT * FROM users WHERE id = $1;', [id])
    .then((result) => {
      console.log('Getting user information!');
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}; // with id param, return user from database with that email for staying logged in
exports.getUserWithId = getUserWithId;

const addUser =  function(user) {
  return pool
  .query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, [user.name, user.email, user.password])
  .then((result) => {
    console.log('Adding new user');
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}; // with user info params (from form), add new user to database and return new user
exports.addUser = addUser;

//////////////////////////////////////////////////////////////////////////////////////
///// RESERVATION FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////

const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
    SELECT * FROM properties
    JOIN reservations ON properties.id = reservations.property_id
    WHERE reservations.guest_id = $1
    ORDER BY reservations.end_date DESC
    LIMIT $2;`, [guest_id, limit])
    .then((result) => {
      console.log('Getting all reservations!');
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}; // with guest_id and limit params, return all reserv. for logged-in user
exports.getAllReservations = getAllReservations;

const addReservation = function(reservation) {

  return pool
  .query(`
  INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `, 
  [reservation.start_date, reservation.end_date, reservation.property_id, reservation.guest_id])
  .then((result) => {
    console.log('Adding new reservation');
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}; // adds new property to the database with form params
exports.addReservation = addReservation;

//////////////////////////////////////////////////////////////////////////////////////
///// PROPERTY FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////

const getAllProperties = (options, limit = 10) => {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} 
    `;
  }

  if (options.owner_id) {
    let ownerID = Number(options.owner_id);
    queryParams.push(`${ownerID}`);
    if (queryParams.indexOf(ownerID) === 0) {
      queryString += `WHERE owner_id = $${queryParams.length}
      `;
    } else {
      queryString += `AND owner_id = $${queryParams.length}
      `;
    }
  }

  if (options.minimum_price_per_night) {
    let queryInDollars = Number(options.minimum_price_per_night);
    let queryInCents = queryInDollars * 100;
    queryParams.push(`${queryInCents}`);
    if (queryParams.indexOf(options.queryInCents) === 0) {
      queryString += `WHERE cost_per_night > $${queryParams.length}
      `;
    } else {
      queryString += `AND cost_per_night >= $${queryParams.length}
      `;
    }
  }

  if (options.maximum_price_per_night) {
    let queryInDollars = Number(options.maximum_price_per_night);
    let queryInCents = queryInDollars * 100;
    queryParams.push(`${queryInCents}`);
    if (queryParams.indexOf(options.queryInCents) === 0) {
      queryString += `WHERE cost_per_night <= $${queryParams.length}
      `;
    } else {
      queryString += `AND cost_per_night <= $${queryParams.length}
      `;
    }
  }

  queryString += `GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}
    `;
  }

  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      console.log('Getting all properties!');
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}; // return all properties with limit param and options params
exports.getAllProperties = getAllProperties;

const addProperty = function(property) {
  let costPerNightInDollars = property.cost_per_night;
  let costPerNightInCents = costPerNightInDollars * 100;

  return pool
  .query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, TRUE)
  RETURNING *;
  `, 
  [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, costPerNightInCents, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code])
  .then((result) => {
    console.log('Adding new property');
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}; // adds new property to the database with form params
exports.addProperty = addProperty;
