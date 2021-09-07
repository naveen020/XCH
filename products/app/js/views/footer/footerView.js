define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/footer/footer' ], function( $, _, Backbone, Handlebars, template) {
  
      var footerView = Backbone.View.extend({
  
        className: "footer-content",
      
        initialize: function () {
            //this.template = templates['HelpView'];
        },
    
        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            var tpl = template();
      
            $(this.el).html(tpl);

            if( !!event && !!event.result ) {
                this.userDetails = event.result;
             }
      
            console.log("Haii Naveen");
            
             return this;
         },  
  
     });
  
     return footerView;
  
  });