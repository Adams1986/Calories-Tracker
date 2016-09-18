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

    var diaries = [{
      id: 0,
      food: {
        id: 0,
        cat: 'pizza',
        name: '14" Pizza, Cheese Topping, Original Crust', calories: 75,
        img: 'img/0.jpg'
      },
      amount: 3,
      date: '2016-09-08T12:00:00'
    }, {
      id: 1,
      food: {
        id: 3,
        cat: 'chocolate',
        name: 'Snickers Chocolate Bar', calories: 134,
        img: 'img/3.jpg'
      },
      amount: 5,
      date: '2016-09-08T15:30:00'
    }, {
      id: 2,
      food: {
        id: 2,
        cat: 'chicken',
        name: 'Chicken Breast, without skin, raw', calories: 31,
        img: 'img/2.jpg'
      },
      amount: 4,
      date: '2016-09-09T14:20:00'
    }, {
      id: 3,
      food: {
        id: 1,
        cat: 'apple',
        name: 'Gala Apple, raw, with skin', calories: 75,
        img: 'img/1.jpg'
      },
      amount: 14,
      date: '2016-09-12T09:20:00'
    }, {
      id: 4,
      food: {
        id: 3,
        cat: 'chocolate',
        name: 'Snickers Chocolate Bar', calories: 134,
        img: 'img/3.jpg'
      },
      amount: 2,
      date: '2016-09-12T17:20:00'
    }];

    function createPlotData(diaries) {

      var startDate = new Date(diaries[0].date.split('T')[0]);
      var endDate = new Date(diaries[diaries.length - 1].date.split('T')[0]);

      var counter = 0;

      var plotData = {
        labels: [],
        series: ['Intake'],
        data: []
      };

      while (startDate.getTime() <= endDate.getTime()) {
        var currentDate = new Date(diaries[counter].date);
        var tmp = 0;
        var timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
        var diffDays = timeDiff / ( 1000 * 3600 * 24);

        plotData.labels.push(startDate.toDateString());

        if (currentDate.getTime() > startDate.getTime() && diffDays >= 1) {
          plotData.data.push(0);
          startDate.setDate(startDate.getDate() + 1);
          continue;
        }
        while (diffDays < 1) {
          tmp += parseFloat(diaries[counter].amount) * parseInt(diaries[counter].food.calories);
          counter += 1;

          if (counter >= diaries.length) {
            break;
          }
          currentDate = new Date(diaries[counter].date);
          timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
          diffDays = timeDiff / (1000 * 3600 * 24);
        }
        plotData.data.push(tmp);
        startDate.setDate(startDate.getDate() + 1);
      }
      return plotData;
    }

    function compare(a, b) {
      var d1 = new Date(a.date);
      var d2 = new Date(b.date);

      if(d1.getTime() < d2.getTime()){
        return -1;
      }
      if(d1.getTime() > d2.getTime()){
        return 1;
      }
      return 0;
    }

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
      },
      getPlotData: function () {
        //passing function. Sick :)
        diaries.sort(compare);
        return createPlotData(diaries);
      },
      addDiary: function (diary) {
        diaries.push(diary);
        diaries.sort(compare)
      }
    };
  });
