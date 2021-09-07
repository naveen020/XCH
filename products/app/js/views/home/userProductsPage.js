define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/home/userProductsPage' ], function( $, _, Backbone, Handlebars, template) {
  
      var userProductsPage = Backbone.View.extend({
  
        className: "user-home-pg-content",
      
        initialize: function () {

        },
    
        render: function ( event ) {

            var tpl = template();
      
            $(this.el).html(tpl);
            
             return this;
         },  
  
     });
  
     return userProductsPage;
  
  });