DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS restaurants;

-- # final restaurant structure:
-- # {name: string, category: string, coordinates: { lat: number, long: number }, menu: array<object> (menu) }

-- # final menu structure:
-- # [ { name: string, price: number, description: string } ]

CREATE TABLE restaurants (
    id              SERIAL NOT NULL,
    name            varchar(256) NOT NULL,                  -- data.name
    category        varchar(128) NOT NULL,                  -- data.category
    PRIMARY KEY (id)
);

CREATE TABLE locations (
    id              SERIAL NOT NULL,
    restaurant_id   int NOT NULL REFERENCES restaurants,
    lat             varchar(50) NOT NULL,                   -- data.coordinates.lat
    long            varchar(50) NOT NULL,                   -- data.coordinates.long
    PRIMARY KEY (id),           
    CONSTRAINT fk_restaurant
      FOREIGN KEY(restaurant_id) 
	      REFERENCES restaurants(id)
);

CREATE TABLE menu_items (
    id              SERIAL NOT NULL,
    restaurant_id   int NOT NULL,
    name            varchar(128) NOT NULL,                  -- data.menu[i].name
    price           varchar(50) NOT NULL,                   -- data.menu[i].price
    description     varchar(512),                           -- data.menu[i].description
    PRIMARY KEY (id),           
    CONSTRAINT fk_restaurant
      FOREIGN KEY(restaurant_id) 
	      REFERENCES restaurants(id)
);
