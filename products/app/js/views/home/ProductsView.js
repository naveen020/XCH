define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/views/home/ProductView' ], function( $, _, Backbone, Handlebars, Marionette, ProductView ) {

     PeopleView = Marionette.CollectionView.extend({
    
            className: "lg-user-product-details",

            id: "lg-user-product-details",

            itemView: ProductView,
           
            initialize: function(options) {
                console.log(options);  
                // some logic to execute at the time of initialize
            }        
            
            
        });

     return PeopleView;
  
  });