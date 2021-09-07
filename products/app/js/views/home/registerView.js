define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/views/home/loginView',
    'hbs!tpl/home/register' ], function( $, _, Backbone, Handlebars, LoginView, template) {
  
        var RegisterView = Backbone.View.extend({ 

            className: "content-reg-page",

            events :{
                "click #reg-button" : "clickRegisterBtn"
            },

            isEmail: function( email ) {
                var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    return emailReg.test( email );
              },

            clickRegisterBtn: function() {
                var hasError = false;
                this.firstName = $(this.el).find('input#first-name').val();
                this.lastName = $(this.el).find('input#last-name').val();
                this.regEmail = $(this.el).find('input#reg-email').val();
                this.regPsw = $(this.el).find('input#reg-psw').val();
                this.regRepsw = $(this.el).find('input#reg-repsw').val();

                var jsonObjects = [{ objVal: this }];

                if( this.regPsw != this.regRepsw ) {
                        hasError = true;
                        alert("Password does not match");
                }
                if( this.firstName!= "" && this.lasstName != " " && this.regEmail != "" && this.regPsw != "" && this.regRepsw!="" ) {

                            if( !this.isEmail( this.regEmail )) {
                                hasError = true;
                                alert( "Please enter Valid email");
                                } else {
                                    var url = window.location;
                                    var that = this;
                                    var response = $.ajax({
                                        url : url.pathname + "/app/phpFiles/xchRegister.php", 
                                        type: 'POST',
                                        dataType: 'json',
                                        data: {
                                            firstName: this.firstName,
                                            lastName: this.lastName,
                                            regEmail: this.regEmail,
                                            regPsw: this.regPsw,
                                            regRepsw: this.regRepsw
                                        },
                                        cache : false
                                    }).done(function(response) {
                                    
                                        if( !!response && !response.userExist ) {
                                            if (!that.LoginView) {
                                                that.loginView = new LoginView();
                                                that.loginView.render();
                                            }
                                            $('.content-hader').remove();
                                            $('.nav-bar').remove();
                                            $('.content-page').html(that.loginView.render().el);
                                            $('.content-footer').remove();
                                        } else {
                                            alert(" Email is already registed");
                                        }
                                    });
                                }

                }  else {
                    alert("Please fill all fields");
                }
             },
 
            initialize: function () {
                console.log('Initializing Register View');
            },

            render: function ( event ) {
                // var template = _.template( $("#tmpl-message").html(), {} );
                var tpl = template();
          
                $(this.el).html(tpl);
                
                 return this;
             },  

        });
  
     return RegisterView;
  
  });