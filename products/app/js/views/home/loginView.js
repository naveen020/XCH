define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/views/header/headerView',
    'js/views/navigation/navView',
    'js/views/home/homeView',
    'js/views/footer/footerView',
    'hbs!tpl/home/login' ], function( $, _, Backbone, Handlebars, HeaderView, navView, HomeView, FooterView, template) {

      var loginModel = Backbone.Model.extend({
        defaults: {
            userEmail: this.userEmail,
            passWord: this.password
          }
        });
  
      var LoginView = Backbone.View.extend({
  
        className: "lg-page-content",

        events: {
            "click #lg-sign-btn" : "clickSignBtn"
        },

        initialize: function () {
            console.log('Initializing Login View');
        },

        isEmail: function( email ) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailReg.test( email );
        },

        clickSignBtn: function() {
           var hasError = false;
           var that = this;
           this.userEmail = $(this.el).find('input#lg-user-n').val();
           this.userPass = $(this.el).find('input#lg-user-p').val();
           this.loginModel = new loginModel();
           this.loginModel.attributes.userEmail = this.userEmail;
           this.loginModel.attributes.userPass = this.userPass;
           if( !this.isEmail( this.userEmail) ) {
               hasError = true;
               alert( "Please enter valid email");
           } else {
            var url = window.location;
            var response = $.ajax({
                url : url.pathname + "app/phpFiles/xchLogin.php", 
                type: 'GET',
                dataType: 'json',
                data: {
                    userEmail: this.userEmail,
                    userPass: this.userPass
                }, 
                cache : false
            }).done(function(response) {
                if( response.userExist != true ) {
                  alert( "please check cretentials" );
                }
                else {
       
                    that.options = response;

                    var firstName = response.result.firstName;

                    that.loginUser = { firstName: firstName  };

                    that.headerView = new HeaderView();
                    $('.header').html(that.headerView.render(that.loginUser).el);
                    $(".header-cal-3").addClass("lg-disable");
                    $(".header-cal-4").removeClass("lg-disable");

                    that.navigationView = new navView();
                    $('.nav-menu-links').html(that.navigationView.render().el);
                    $('.lg-page-content').remove();
    
                    that.homeView = new HomeView();
                    that.homeView.loadUserProducts;

                    that.footerView = new FooterView();
                    $('.content-footer').html(that.footerView.render( that.options ).el); 

                    Backbone.history.navigate('/#');
                    window.location.reload();
    
                }             
            });
           }
        },
    
        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            var tpl = template();
      
            $(this.el).html(tpl);
            
             return this;
         },  
  
     });
  
     return LoginView;
  
  });