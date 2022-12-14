INSERT INTO users (name, email, password)
  VALUES ('Dani', 'dspinosa@yorku.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
  VALUES ('Jesse', 'jpajuaar@yorku.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
  VALUES ('Libby', 'babynextdoor@chickens.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES (3, 'Chicken House', 'A house on a quiet street with chickens in the backyard', 'https://4.bp.blogspot.com/-ONfJB0EKZLE/UoOHTj_nh0I/AAAAAAAADzg/tW1P_KWnjRY/s400/chicken-house-designs1.jpg', 'https://4.bp.blogspot.com/-ONfJB0EKZLE/UoOHTj_nh0I/AAAAAAAADzg/tW1P_KWnjRY/s400/chicken-house-designs1.jpg', 100, 1, 2, 2, 'Canada', 'Alberta Ave', 'Toronto', 'Ontario', 'M6H 2R5', TRUE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES (3, 'Baby House', 'A very tiny house only for babies', 'https://cdn.shopclues.com/images/thumbnails/43861/320/320/9776011289850754nhachoiintex4564211454847729145794417714701411061473578148.jpg', 'https://cdn.shopclues.com/images/thumbnails/43861/320/320/9776011289850754nhachoiintex4564211454847729145794417714701411061473578148.jpg', 50, 0, 0, 1, 'Canada', 'Alberta Ave', 'Toronto', 'Ontario', 'M6H 2R5', FALSE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES (2, 'Music Cabin', 'A small, secluded cabin for making music and art', 'http://www.cabinliving.co.uk/images/uMusic.jpg', 'http://www.cabinliving.co.uk/images/uMusic.jpg', 400, 2, 2, 3, 'Canada', 'Lake St', 'Kawartha Lakes', 'Ontario', 'L9J 4X5', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
  VALUES ('2018-09-11', '2018-09-26', 1, 1);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
  VALUES ('2019-08-10', '2019-09-16', 3, 1);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
  VALUES ('2018-09-11', '2018-09-26', 2, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
  VALUES (1, 1, 1, 5, 'Nice chickens!');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES (1, 3, 2, 5, 'Lovely cabin');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
  VALUES (2, 2, 3, 1, 'Too small!!!');