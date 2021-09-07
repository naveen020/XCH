define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/header/sendUserMessages' ], function( $, _, Backbone, Handlebars, template) {
  
      var footerView = Backbone.View.extend({
  
        className: "send-User-Messages",
      
        initialize: function () {
            //this.template = templates['HelpView'];
        },
    
        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            var tpl = template( event);
      
            $(this.el).html(tpl);
            
             return this;
         },  
  
     });
  
     return footerView;
  
  });