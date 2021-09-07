
require.config({

  baseUrl: "app",

  paths: {
    "jquery": "lib/jquery",
    "underscore": "lib/underscore",
    "backbone": "lib/backbone",
    "handlebars": "lib/handlebars",
    "text": "lib/text",
    "marionette": "lib/backbone.marionette"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      exports: "Backbone"
    },
    handlebars: {
      exports: "Handlebars"
    },
    marionette: {
      deps: [ 'jquery', 'underscore', 'backbone' ],
      exports: 'Marionette'
    }
  },

  packages: [{
    // Include hbs as a package, so it will find hbs-builder when needed
    name: "hbs",
    location: "lib/hbs",
    main: "hbs"
  }],

  hbs: {
    templateExtension: ".hbs",
    compilerPath: "lib/handlebars"
  }

});

require([ 'js/main'], function( mainView ) {
 
   new mainView();
   Backbone.history.start();
   
});
