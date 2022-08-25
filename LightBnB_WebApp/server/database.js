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

//////////////////////////////////////////////////////////////////////////////////////
///// PROPERTY FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`
    SELECT * FROM properties LIMIT $1;`, [limit])
    .then((result) => {
      console.log('Getting all properties!');
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}; // return all properties with limit param, 
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
