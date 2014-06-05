if (Meteor.isClient) {

  // Basic Router config
  Router.configure({
    layoutTemplate: 'body',
    notFoundTemplate: 'not_found',
    loadingTemplate: 'loading'
  });

  // Set hook to render Not Found template when there's no data; only for single item page
  Router.onBeforeAction('dataNotFound', {only: ['item_page']});

  // Route Maps
  Router.map(function () {

    // Render list of items
    this.route('item_list', {
      path: '/'
    });

    // Render a single item, data is returned from Items collection
    this.route('item_page', {
      path: '/item/:id',
      template: 'item_page',
      waitOn: function() {
        return Meteor.subscribe('items');
      },
      data: function() {
        return Items.findOne(this.params.id);
      }
    });
  });

  // Get the current template property or display not_found template when unavailable
  var currentTemplate = function() {
    var current = Router.current();
    return current && typeof current.lookupProperty == 'function' && current.lookupProperty('template') || 'not_found';
  };

  // Used for styling
  Template.body.helpers({
    'currentTemplate': function() {
      var current = currentTemplate();
      console.log('current template: ' + current);
      return current;
    }
  });

  Template.item_list.helpers({
    'items': function() {
      return Items.find();
    }
  });

}

Items = new Meteor.Collection('items');

if (Meteor.isServer) {
  Meteor.startup(function () {

    // Initialize some items if there are none
    var items = Items.find().fetch();
    if (items.length <= 0) {
      Items.insert({'name': 'First Item'});
      Items.insert({'name': 'Second Item'});
    }

    Meteor.publish('items', function() {
      return Items.find();
    });

  });

}
