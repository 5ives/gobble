CREATE TABLE restaurant (
    id              int NOT NULL,
    name            varchar(256) NOT NULL,
    lat             int NOT NULL,           -- latitude
    long            int NOT NULL,           -- longitude
);

CREATE TABLE menu (
    id              int NOT NULL,
    restaurant_id   int NOT NULL,
)

CREATE TABLE menu_item (
    id              int NOT NULL,
    menu_id         int NOT NULL,
    restaurant_id   int NOT NULL,
    name            varchar(128) NOT NULL,
    price           int NOT NULL,
    description     varchar(512)
)