define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/itemView/eleProductView' ], function( $, _, Backbone, Handlebars, Marionette, eleProductView ) {

        eleProductsView = Marionette.CollectionView.extend({
    
            className: "lg-user-ele-product-details",

            tagName: 'ui',

            itemView: eleProductView, 
           
            initialize: function(options) {
                console.log(options);  
                // some logic to execute at the time of initialize
            }        
            
            
        });

     return eleProductsView;
  
  });