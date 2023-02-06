WITH data AS (
    SELECT '[
    {
        "name": "The Bavarian (World Square)",
        "category": "pretzel",
        "coordinates": {
            "lat": -33.8773,
            "long": 151.2068
        },
        "menu": [
            {
                "name": "Your All-Time Favourite Parmi",
                "price": "$30.00",
                "description": ""
            },
            {
                "name": "Jager (aka Hunter) Chicken Schnitzel",
                "price": "$30.00",
                "description": ""
            },
            {
                "name": "Naked Schnitzel",
                "price": "$30.00",
                "description": ""
            }
        ]
    }
]'::jsonb AS data
),
restaurant_data AS (
    INSERT INTO restaurants (name, category)
    SELECT data->>'name',
        data->>'category'
    FROM data
    RETURNING id AS restaurant_id
)
INSERT INTO locations (restaurant_id, lat, long)
SELECT restaurant_id,
    data->'coordinates'->>'lat'::varchar(50),
    data->'coordinates'->>'long'::varchar(50)
FROM data,
    restaurant_data
INSERT INTO menu_items (restaurant_id, name, price, description)
SELECT restaurant_data.restaurant_id,
    elem->>'name',
    elem->>'price'::varchar(50),
    elem->>'description'
FROM data,
    restaurant_data,
    jsonb_array_elements(data->'menu') elem;