define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/home/showEleProduct' ], function( $, _, Backbone, Handlebars, template) {
  
      var showEleProduct = Backbone.View.extend({
  
        className: "show-ele-products-content",
      
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
  
     return showEleProduct;
  
  });