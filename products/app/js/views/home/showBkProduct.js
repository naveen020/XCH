define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/home/showBkProduct' ], function( $, _, Backbone, Handlebars, template) {
  
      var showBkProduct = Backbone.View.extend({
  
        className: "show-bk-products-content",

        initialize: function () {
            //this.template = templates['HelpView'];
        },

        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            var tpl = template( event );
            $(this.el).html(tpl);
             return this;
         },  
  
     });
  
     return showBkProduct;
  
  });