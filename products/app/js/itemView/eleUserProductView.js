define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/views/home/showEleProduct',
    'hbs!tpl/home/eleUserProductView' ], function( $, _, Backbone, Handlebars, Marionette, showEleProduct, template) {

      var ProductView = Marionette.ItemView.extend({

        className: 'user-ele-products',

        tagName: 'li',

        template: template,

        events: {
            'click .user-ele-product-object': 'clickEleProduct'
        },

        clickEleProduct: function () {
             this.showEle_Product = new showEleProduct();
             $('.content-page').html(this.showEle_Product.render( this.model.attributes ).el);
        },
      
      initialize : function() { 
        // Some logic to invoke at the time of intialization
      }
      });

        return ProductView;
  
  });