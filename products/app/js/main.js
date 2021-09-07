define([ 
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'js/views/home/comHomePage',
  'js/views/header/headerView',
  'js/views/navigation/navView',
  'js/views/home/homeView',
  'js/views/home/registerView',
  'js/views/home/loginView',
  'js/views/footer/footerView'], function( $, _, Backbone, Handlebars, comHomePage, HeaderView, navView, HomeView, 
        RegisterView, LoginView, FooterView) {

    var Router = Backbone.Router.extend({

    routes: {
      "register": "register",
      "login": "login"
    },

    login: function() {
       this.loginView = new LoginView();
       $('.content-hader').remove();
       $('.nav-bar').remove();
       $('.content-page').html(this.loginView.render().el);
       $('.footer-content').remove();
    },

    register: function() {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);      
        this.navView = new navView();
        $('.nav-menu-links').html(this.navView.render().el);
        this.footerView = new FooterView();
        $('.content-footer').html(this.footerView.render().el);
        this.registerView = new RegisterView();
        $('.content-page').html(this.registerView.render().el);
    },

    initialize: function() {
      
        // console.log("Haii Naveen");
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
        this.navView = new navView();
        $('.nav-menu-links').html(this.navView.render().el);
        this.comHome_Page = new comHomePage();
        $('.content-page').html(this.comHome_Page.render().el);
        this.homeView = new HomeView();
        this.homeView.loadHomePage();
        this.footerView = new FooterView();
        $('.content-footer').html(this.footerView.render().el);

    }

   });

   return Router;

});