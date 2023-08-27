/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchAddMenuItems = /* GraphQL */ `
  mutation BatchAddMenuItems($menuItems: [CreateMenuItemInput]) {
    batchAddMenuItems(menuItems: $menuItems) {
      id
      name
      price
      restaurant {
        id
        name
        lat
        long
        menuItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      restaurantMenuItemsId
      __typename
    }
  }
`;
export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
      id
      name
      lat
      long
      menuItems {
        items {
          id
          name
          price
          createdAt
          updatedAt
          restaurantMenuItemsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
      id
      name
      lat
      long
      menuItems {
        items {
          id
          name
          price
          createdAt
          updatedAt
          restaurantMenuItemsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
      id
      name
      lat
      long
      menuItems {
        items {
          id
          name
          price
          createdAt
          updatedAt
          restaurantMenuItemsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMenuItem = /* GraphQL */ `
  mutation CreateMenuItem(
    $input: CreateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    createMenuItem(input: $input, condition: $condition) {
      id
      name
      price
      restaurant {
        id
        name
        lat
        long
        menuItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      restaurantMenuItemsId
      __typename
    }
  }
`;
export const updateMenuItem = /* GraphQL */ `
  mutation UpdateMenuItem(
    $input: UpdateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    updateMenuItem(input: $input, condition: $condition) {
      id
      name
      price
      restaurant {
        id
        name
        lat
        long
        menuItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      restaurantMenuItemsId
      __typename
    }
  }
`;
export const deleteMenuItem = /* GraphQL */ `
  mutation DeleteMenuItem(
    $input: DeleteMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    deleteMenuItem(input: $input, condition: $condition) {
      id
      name
      price
      restaurant {
        id
        name
        lat
        long
        menuItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      restaurantMenuItemsId
      __typename
    }
  }
`;
