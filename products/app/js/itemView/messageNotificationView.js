define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/views/header/chatView',
    'hbs!tpl/navigation/showMessages' ], function( $, _, Backbone, Handlebars, Marionette, ChatView, template) {

      var notificationView = Marionette.ItemView.extend({

        className: 'show-user-showNotifications',

        tagName: 'li',

        template: template,

        events: {
          'click .show-user-message-item' : 'clickMessageNotify'
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
                  that.clickMessageNotify();
                  }
                } else {
                  that.sessionTimeOut = true;
                }
              }
          });
        },  

        clickMessageNotify: function() {
            if( this.loginUser && this.loginUser.checkAuth != true ) {
                this.checkUserSession();
            }

            if( !!this.userDetails && this.loginUser && this.loginUser.sessionTimeOut == false ) { 
                $('.show-user-chat-box').removeClass("show-chat-box-lg-disable");
                this.model.userName= this.userDetails.userName;
                this.model.userDetails = this.userDetails;
                this.model.sleUserId = this.model.attributes.toUserId;
                if( this.model.userDetails.userId == this.model.sleUserId ) {
                  this.model.sleUserId = this.model.attributes.formUserId;
                }
                // this.model.attributes.Message;
                this.chatView  = new ChatView();
                $('.show-user-chat-box').html(this.chatView.render( this.model ).el);
                this.model.attributes.options.clickMessageNotify();
            }
        },

        initialize : function() { 
          // Some logic to invoke at the time of intialization
            this.loginUser = {
              sessionTimeOut: "",
              checkAuth: false
          };
        }

      });

        return notificationView;
  
  });