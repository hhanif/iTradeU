angular.controller('GuestDetailsCtrl', function($scope){
   $scope.addItem = function(params) {
       alert(params.name);
       alert(params.qty);
   };
});
