package com.gobble.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {
    
    private final RestaurantRepository restaurantRepository;
    private final LocationRepository locationRepository;
    private final MenuItemRepository menuItemRepository;

    public RestaurantService (
        RestaurantRepository restaurantRepository,
        LocationRepository locationRepository,
        MenuItemRepository menuItemRepository
    ) {
        this.restaurantRepository = restaurantRepository;
        this.locationRepository = locationRepository;
        this.menuItemRepository = menuItemRepository;
    }

    List<Restaurant> getAllRestaurantsByCategoryAndPrice(String category, float minPrice, float maxPrice) {
        // menuItemRepository.
        return null;
    }
}
