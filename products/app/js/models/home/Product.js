define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette'], function( $, _, Backbone, Handlebars, Marionette ) {

        var Product = Backbone.Model.extend({
            defaults: {
              name: undefined,
              price: undefined,
              location: undefined
            }
      });

     return Product;
  
  });