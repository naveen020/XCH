define([ 
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'js/Collections/home/Products',
  'js/views/home/homeView',
  'js/views/home/addProductView',
  'js/views/home/addEleProductView',
  'js/views/home/showUserNotificationsViews',
  'hbs!tpl/navigation/navBar' ], function( $, _, Backbone, Handlebars, Products, HomeView, addProductView, addEleProductView, showUserNotificationsViews, template) {

    var navigationView = Backbone.View.extend({

    tagName: "div",

    className: "nav-bar",

    events: {
       'click .dropdown-category-content-books' : 'clickAddproduct',
       'click .dropdown-category-content-electronics': 'clickAddElectronics',
       'click .user-homePage' : 'clickHomePage',
       'click .lg-user-books' : 'clickBooksPage',
       'click .lg-user-electronics' : 'clickElectronicsPage'
    },

    clickHomePage: function() {
      this.homeView = new HomeView();
      this.homeView.loadHomePage();
    },

    clickBooksPage: function() {
      this.homeView = new HomeView();
      this.homeView.loadOnlyBooksPage();
    },

    clickElectronicsPage: function() {
      this.homeView = new HomeView();
      this.homeView.clickElectronicsPage();
    },

    clickAddElectronics: function() {
      if( !!this.userLogin ) {
        $('.all-prd-content').remove();
        this.productView = new addEleProductView();
        $('.content-page').html(this.productView.render().el);
      } else {
        alert("Please login.");
      }

    },
    clickAddproduct: function() {
      if( !!this.userLogin ) {
        $('.all-prd-content').remove();
        this.productView = new addProductView();
        $('.content-page').html(this.productView.render().el);
      } else {
        alert("Please login.");
      }
    },

    beforeRender: function () {
      var url = window.location;
       var that = this;
       var responce = $.ajax({
       url: url.pathname + "/app/phpFiles/xchSession.php", 
       data: "",
       dataType: 'json',
      success: function(data) {
        if( data.sessionTimeOut != true ) {
            var event = data;
            if( !!event && !! event.userName ) {
              that.sessionTimeOut = false;
              that.userLogin = true;
              that.render();
              }
            } else {
              that.sessionTimeOut = true;
            }
          }
       });
    },

    initialize: function() {
    },
    render: function ( event ) {
      // var template = _.template( $("#tmpl-message").html(), {} );
      if( !this.userLogin  )
         this.beforeRender();
      var tpl = template();

      $(this.el).html(tpl);

      if( !!event && !!event.result ) {
         this.userDetails = event.result;
      }
      
       return this;
   },  

   });

   return navigationView;

});