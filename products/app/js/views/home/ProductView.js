define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/views/home/showBkProduct',
    'hbs!tpl/home/productViewTemplate' ], function( $, _, Backbone, Handlebars, Marionette, showBkProduct, template) {

      var ProductView = Marionette.ItemView.extend({

        className: 'user-products',

        template: template,

        events: {
            'click .user-product-object' : 'clickBkProduct'
        },
      
        clickBkProduct: function() {
            alert("gasg");
            this.showBk_Product = new showBkProduct();
            $('.content-page').html(this.showBk_Product.render( this.model.attributes ).el);
        },

      initialize : function() { 
        // Some logic to invoke at the time of intialization
      }
      });

        return ProductView;
  
  });