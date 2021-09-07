define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/home/comHomePage' ], function( $, _, Backbone, Handlebars, template) {
  
      var comHomePage = Backbone.View.extend({
  
        className: "home-pg-content",

        initialize: function () {
            //this.template = templates['HelpView'];
        },
    
        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            var tpl = template();
      
            $(this.el).html(tpl);
            
             return this;
         },  
  
     });
  
     return comHomePage;
  
  });