define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/views/home/allProductView' ], function( $, _, Backbone, Handlebars, Marionette, allProductView ) {

        allProductsView = Marionette.CollectionView.extend({
    
            className: "lg-user-product-details",

            id: "lg-user-product-details",

            tagName: 'ui',

            itemView: allProductView,
           
            initialize: function(options) {
                console.log(options);  
                // some logic to execute at the time of initialize
            }        
            
            
        });

     return allProductsView;
  
  });