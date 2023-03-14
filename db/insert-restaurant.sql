
-- parse JSON into var
WITH data (json_value) AS (
    values ({json_input}::jsonb)
),

-- parse restaurant menu items data into var
menu AS (select jsonb_array_elements(json_value->'menu') as menu_item from data),

-- insert restaurant data
restaurant_data_from_restaurants AS (
    INSERT INTO restaurants (name, category)
    SELECT d.json_value->>'name',
        d.json_value->>'category'
    FROM data d
    RETURNING id
),

-- insert restaurant location data
restaurant_data_from_locations AS (
    INSERT INTO locations (restaurant_id, lat, long)
    SELECT restaurant_data_from_restaurants.id,
        (d.json_value->'coordinates'->>'lat')::DECIMAL,
        (d.json_value->'coordinates'->>'long')::DECIMAL
    FROM data d,
        restaurant_data_from_restaurants
    RETURNING restaurant_id
)

-- insert restaurant menu items data
INSERT INTO menu_items (restaurant_id, name, price, description)
SELECT restaurant_data_from_locations.restaurant_id,
    menu_item->>'name',
    (menu_item->>'price')::DECIMAL,
    menu_item->>'description'
FROM restaurant_data_from_locations,
    menu;
