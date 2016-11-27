(function(){

  angular
       .module('users')
       .controller('UserController', [
          '$http', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          UserController
       ]);





  /**
   * Main Controller for the Angular Material Starter App
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController($http, $mdSidenav, $mdBottomSheet, $timeout, $log) {

    var self = this;

    self.matches = null;
    self.itemSelected = null;
    self.selected     = false;
    self.users        = [ ];
    self.selectItem   = selectItem;
    self.toggleList   = toggleUsersList;
    self.makeContact  = makeContact;
    self.logout = logout;
    self.profile = profile;
    self.createItem = createItem;


    // Load all registered users
    $http.get('/items'). success(function(data, status, headers, config) {
       self.users    = data.items;
       console.log(data);
       console.log(self.users);
       console.log("Selected is: "+self.selected);
     });

   function profile() {
     console.log("Redirected to update profile");
           location.pathname='/profile'

            }

    function createItem() {
      console.log("Redirected to createItem");
                    location.pathname='/createItem'
    }

    function logout() {
      console.log("Logged out of home");
      location.pathname='/logout'

    }
    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectItem ( data ) {
      self.selectedItem =data;
      console.log("Data for match");
      console.log(data);
        $http.post('/match',data).success(function(dataR){
          console.log("Match Data Received");
          console.log(dataR.matcheditems);
          console.log(dataR.matcheditems[0]);
          self.matches = dataR.matcheditems;
          self.selected = true;
          console.log("Selected is: "+self.selected);


        });
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : 'public/users/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content2'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'E-mail'       , icon: 'email'       , icon_url: '/public/assets/svg/envelope.svg'}
          ];
          this.contactUser = function(action) {
              //show email
            $mdBottomSheet.hide(action);
          };
        }
    }




  }

})();
