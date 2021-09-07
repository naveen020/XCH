define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!tpl/home/selectBkProduct' ], function( $, _, Backbone, Handlebars, template) {


        var Product = Backbone.Model.extend({
            defaults: {
                eleId: undefined,
                pfileName: undefined,
                productId: undefined,
                pbookName: undefined
            }
      });
  
      var footerView = Backbone.View.extend({
  
        className: "select-bk-product-content",

        model: Product,
      
        initialize: function () {
            //this.template = templates['HelpView'];
            _.extend({}, Backbone.Events);
        
        },
    
        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            var tpl = template( event );
      
            $(this.el).html(tpl);
      
            console.log("Haii Naveen");
            
             return this;
         },  
  
     });
  
     return footerView;
  
  });