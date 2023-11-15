package com.gobble.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = RestaurantRepository.class)
class RestaurantRepositoryTests {

    // @Autowired
    // private RestaurantRepository restaurantRepository;

    @Test
    public void givenCustomRepository_whenInvokeCustomFindMethod_thenEntityIsFound() {
        System.out.println("wassuuuppppp");
        // User user = new User();
        // user.setEmail("foo@gmail.com");
        // user.setName("userName");

        // User persistedUser = userRepository.save(user);

        // assertEquals(persistedUser, userRepository.customFindMethod(user.getId()));
    }
}