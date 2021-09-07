define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/itemView/notificationView' ], function( $, _, Backbone, Handlebars, Marionette, notificationView ) {

        showNotificationsView = Marionette.CollectionView.extend({
    
            className: "user-lg show-notifications-details",

            tagName: 'ui',

            itemView: notificationView,
           
            initialize: function(options) {
                // some logic to execute at the time of initialize
            }        
            
            
        });

     return showNotificationsView;
  
  });