define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette'], function( $, _, Backbone, Handlebars, Marionette ) {

        var EleProduct = Backbone.Model.extend({
            defaults: {
              eleName: undefined,
              elePrice: undefined,
              eleLocation: undefined
            }
      });

     return EleProduct;
  
  });