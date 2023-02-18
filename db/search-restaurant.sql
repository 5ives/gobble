
SELECT restaurants.name,
    locations.lat,
    locations.long,
    menu_items.name,
    menu_items.price
FROM menu_items,
    restaurants, locations
WHERE LOWER(menu_items.name) LIKE '%{category}%'
    AND menu_items.price < {maxPrice}
    AND menu_items.price > {minPrice}
    AND menu_items.restaurant_id = restaurants.id
    AND locations.restaurant_id = restaurants.id;
