/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function UsersDataService($q) {
  var users = [
    {
      name: 'Haris Hanif',
      avatar: 'svg-1',
      content: 'I am from Pleasanton, CA and am currently trying to trade my MacBook Pro for a Xbox One.'
    },
    {
      name: 'Juan Cardozo',
      avatar: 'svg-2',
      content: 'I am from Watsonville, CA and am currently trying to trade my Xbox for a phone.'
    },
    {
      name: 'Alina Syrtsova',
      avatar: 'svg-3',
      content: "I am trying to sell my Nintendo Wii for a Laptop."
    },
    {
      name: 'Andy Wong',
      avatar: 'svg-4',
      content: 'I am trying to sell my PS3 for a tablet, prefferably PC/android, not an iPad.'
    },
    {
      name: 'Ernesto Urbina',
      avatar: 'svg-2',
      content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
    },
    {
      name: 'Gani Ferrer',
      avatar: 'svg-4',
      content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
    }
  ];

  // Promise-based API
  return {
    loadAllUsers: function() {
      // Simulate async nature of real remote calls
      return $q.when(users);
    }
  };
}

export default ['$q', UsersDataService];
