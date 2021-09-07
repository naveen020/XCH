define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/models/home/notification',
    'js/views/header/chatView',
    'hbs!tpl/home/showNotifyProduct' ], function( $, _, Backbone, Handlebars, notificationModel, ChatView, template ) {
      
      var showBkProduct = Backbone.View.extend({
  
        className: "show-bk-products-content",

        model: notificationModel,
      
        initialize: function () {
            //this.template = templates['HelpView'];
            this.loginUser = {
                sessionTimeOut: "",
                checkAuth: false
            };
        },

        events: {
             'click .accept-offer': 'clickAcceptBtn',
             'click .start-button': 'clickStartchat'
        },

        checkUserSession: function() {
            var url = window.location;
            var that = this;
            var responce = $.ajax({
            url: url.pathname + "/app/phpFiles/xchSession.php", 
            data: "",
            dataType: 'json',
            success: function(data) {
              if( data.sessionTimeOut != true && data.userlogin != false) {
                  var event = data;
                  if( !!event && !! event.userName ) {
                    that.loginUser.firstName = event.userName;
                    that.loginUser.checkAuth = true;
                    that.loginUser.sessionTimeOut = false;
                    that.userDetails = data;  
                    that.clickStartchat();
                    }
                  } else {
                    that.sessionTimeOut = true;
                  }
                }
            });
          },  

        clickStartchat: function() {
            if( this.loginUser && this.loginUser.checkAuth != true ) {
                this.checkUserSession();
            }

            if( !!this.userDetails && this.loginUser && this.loginUser.sessionTimeOut == false ) { 
                $('.show-user-chat-box').removeClass("show-chat-box-lg-disable");
                this.model.userName= this.userDetails.userName;
                this.model.userDetails = this.userDetails;
                this.chatView  = new ChatView();
                $('.show-user-chat-box').html(this.chatView.render( this.model ).el);
            }
        },

        clickAcceptBtn: function() {
          var that = this;
          this.form_data = new FormData();
          this.form_data.append('sendUserId', this.model.sleUserId );
          this.form_data.append('sendUserProductId', this.model.sendProductId );
          this.form_data.append('currentUserId', this.model.currUserDetails.userId );
          this.form_data.append('selectedProductId', this.model.currUserDetails.productId );

          var url = window.location;
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/setNotifications.php", 
                    type: 'POST',
                    dataType: 'json',
                    data: this.form_data,
                    processData: false,
                    contentType: false,
                    cache : false
                }).done(function(response) {
                  this.chatView = new ChatView();
                  $('.accept-button').addClass("lg-disable");
                  $('.start-button').removeClass("lg-disable");     
                });

        },
    
        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            this.model = event;
            var tpl = template( event );
            $(this.el).html(tpl);

             return this;
         },  
  
     });
  
     return showBkProduct;
  
  });