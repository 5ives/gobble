package com.gobble.backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<Restaurant, Long> {

    List<MenuItem> findAllByRestaurantId(int restaurantId);

}
