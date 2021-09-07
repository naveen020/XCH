define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/itemView/eleUserProductView' ], function( $, _, Backbone, Handlebars, Marionette, eleUserProductView ) {

        eleProductsView = Marionette.CollectionView.extend({
    
            className: "lg-user-ele-product-details",

            tagName: 'ui',

            itemView: eleUserProductView,
           
            initialize: function(options) {
                console.log(options);  
                // some logic to execute at the time of initialize
            }        
            
            
        });

     return eleProductsView;
  
  });