define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/itemView/showUserBkProductView' ], function( $, _, Backbone, Handlebars, Marionette, showUserBkProductView ) {

        eleProductsView = Marionette.CollectionView.extend({
    
            className: "show-lg-user-bk-product-details",

            tagName: 'ui',

            itemView: showUserBkProductView,
           
            initialize: function(options) {
                console.log(options);  
                // this.listenTo(this.collection,'change', this.selectProduct, this );
            }
        });

     return eleProductsView;
  
  });