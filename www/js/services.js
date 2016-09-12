angular.module('starter.services', [])

  .factory('Foods', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var foods = [{
      id: 0,
      cat: 'pizza',
      name: '14" Pizza, Cheese Toppings, Original Crust',
      calories: 75,
      img: 'img/0.jpg'
    }, {
      id: 1,
      cat: 'apple',
      name: 'Gala Apple, raw, with skin',
      calories: 75,
      img: 'img/1.jpg'
    }, {
      id: 2,
      cat: 'chicken',
      name: 'Chicken Breast, without skin, raw',
      calories: 31,
      img: 'img/2.jpg'
    }, {
      id: 3,
      cat: 'chocolate',
      name: 'Snickers Chocolate Bar',
      calories: 134,
      img: 'img/3.jpg'
    }];

    return {
      add: function (newFood) {
        foods.push(newFood);
      },
      all: function () {
        return foods;
      },
      remove: function (food) {
        foods.splice(foods.indexOf(food), 1);
      },
      get: function (foodId) {
        for (var i = 0; i < foods.length; i++) {
          if (foods[i].id === parseInt(foodId)) {
            return foods[i];
          }
        }
        return null;
      },
      getLength: function () {
        return foods.length;
      }
    };
  });
