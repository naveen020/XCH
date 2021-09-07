define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/itemView/messageNotificationView' ], function( $, _, Backbone, Handlebars, Marionette, messageNotificationView ) {

        showNotificationsView = Marionette.CollectionView.extend({
    
            className: "user-lg show-message-details",

            tagName: 'ui',

            itemView: messageNotificationView,
           
            initialize: function(options) {
                // some logic to execute at the time of initialize
            }        
            
            
        });

     return showNotificationsView;
  
  });