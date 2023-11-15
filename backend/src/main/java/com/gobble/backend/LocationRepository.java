package com.gobble.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Restaurant, Long> {

    Location findByRestaurantId(int restaurantId);

}
