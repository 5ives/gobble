package com.gobble.backend;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Size(max = 256)
    private String name;

    @NotBlank
    @Size(max = 128)
    private String category;

    // @NotBlank
    // private Location location;

    @NotBlank
    @ElementCollection(targetClass=MenuItem.class)
    private List<MenuItem> menuItems;
    
}
