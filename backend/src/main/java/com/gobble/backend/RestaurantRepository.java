package com.gobble.backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllRestaurantsByCategoryAndPrice(String category, float minPrice, float maxPrice);

}
