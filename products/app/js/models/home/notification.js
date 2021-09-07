define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette'], function( $, _, Backbone, Handlebars, Marionette ) {

        var notification = Backbone.Model.extend({
            defaults: {
                productId: undefined,
                pfileName: undefined,
                pbookName: undefined,
                pbookAuthor: undefined,
                pbookStory: undefined,
                pbookPrice: undefined,
                pbookLocation: undefined,
                pbookDescription: undefined,
                sendUserName: undefined
            }
      });

     return notification;
  
  });