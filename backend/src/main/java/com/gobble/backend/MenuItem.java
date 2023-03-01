package com.gobble.backend;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Id
    @NotBlank
    private int restaurantId;

    @NotBlank
    @Size(max = 128)
    private String name;

    @NotBlank
    private float price;

    @Size(max = 512)
    private String description;

}
