define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/models/home/eleProduct' ], function( $, _, Backbone, Handlebars, Marionette, eleProduct ) {

        var EleProducts = Backbone.Collection.extend({
            model: eleProduct
        });

     return EleProducts;
  
  });