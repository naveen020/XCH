define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/header/receiverUserMessage' ], function( $, _, Backbone, Handlebars, template) {
  
      var footerView = Backbone.View.extend({
  
        className: "receiver-User-Message",
      
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
  
     return footerView;
  
  });