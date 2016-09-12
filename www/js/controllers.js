angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('FoodsCtrl', function ($scope, $state, $ionicFilterBar, Foods) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.add = function (view) {
      $state.go(view);
    };

    $scope.showFilterBar = function () {
      $ionicFilterBar.show({
        items: $scope.foods,
        update: function (filteredItems, filterText) {
          $scope.foods = filteredItems;

          if (filterText) {
            console.log(filterText);
          }
        }
      })
    };
    $scope.foods = Foods.all();
    $scope.remove = function (food) {
      Foods.remove(food);
    };
  })

  .controller('FoodDetailCtrl', function ($scope, $stateParams, Foods) {
    $scope.food = Foods.get($stateParams.foodId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('AddCtrl', function ($scope, $state, $cordovaCamera, Foods) {
    $scope.newFood = {
      id: Foods.getLength(),
      name: '',
      lastText: '',
      img: ''
    };
    $scope.takePhoto = function () {

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        savePhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $scope.newFood.img = $scope.imgURI;
      }, function (err) {

      });
    };

    $scope.close = function () {
      $state.go('tab.foods');
    };
    $scope.confirm = function () {
      Foods.add($scope.newFood);
      $scope.close();
    };
  });
