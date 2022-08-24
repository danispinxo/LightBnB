SELECT reservations.id, properties.title, reservations.start_date, properties.cost_per_night, AVG(property_reviews.rating)
  FROM users
  JOIN reservations ON users.id = reservations.guest_id
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE users.id = 1
  GROUP BY reservations.id, properties.title, properties.cost_per_night
  ORDER BY start_date ASC
  LIMIT 10;