define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/models/home/Product' ], function( $, _, Backbone, Handlebars, Marionette, Product ) {

        var Products = Backbone.Collection.extend({
            model: Product
        });

     return Products;
  
  });