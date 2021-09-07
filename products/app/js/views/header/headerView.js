define([ 
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'js/Collections/home/Products',
  'js/views/home/userProducts',
  'js/views/home/showUserNotificationsViews',
  'js/views/home/showUserMessageView',
  'js/views/home/userProductsPage',
  'hbs!tpl/header/header' ], function( $, _, Backbone, Handlebars, Products, userProducts, showUserNotificationsViews, showUserMessageView, userProductsPage, template) {

    var loginUser = {
      firstName: ""
    };

    var HeaderView = Backbone.View.extend({

    tagName: "div",

    className: "content-hader",

    events : {

      'click .a-logout-link' : 'logOutPage',
      'click .lg-username' : 'clickUserProfile',
      'click .link-notification-img': 'clickNotification',
      'click .link-message-img': 'clickMessageNotify'

    },

    clickMessageNotify: function() {
      if( !!loginUser.firstName ) {
        if( !this.checkMessages ) {
            var that = this;
            var url = window.location;
            var response = $.ajax({
            url : url.pathname + "app/phpFiles/getAllMessages.php", 
            type: 'GET',
            dataType: 'json',
            data:"",
            cache : false
            }).done(function(response) {
              // renders people, //Collectin view
              var NotificationList = new Products();
              for( var i=0;i< response.messages.length ; i++) {
                response.messages[i].options = that;
                NotificationList.add( response.messages[i] );
              }
              var notifications_view = new showUserMessageView({collection: NotificationList });                      
              // // Create a Marionette Region
              var productRegion = new Marionette.Region({el:'#message-latest'});
              productRegion.show(notifications_view.render());
              that.checkMessages = true;
            }); 
        } else {
          $('.show-message-details').remove();
          this.checkMessages = false;
        }
      }
        
    },

    clickNotification: function( event ) {
      if( !loginUser.firstName ) {
        this.checkNotification = true;
        this.beforeRender( this );
      } 
      if( !!loginUser.firstName ) {

        if( !this.checknotification )  {
          var url = window.location;
          $('.notification-latest-symbol').addClass("notification-latest-lg-disable");
          var that = this;
          var response = $.ajax({
          url : url.pathname + "app/phpFiles/getNotifications.php", 
          type: 'GET',
          dataType: 'json',
          data:"",
          cache : false
          }).done(function(response) {
           
            for( var i=0;i< response.notifications.length ; i++) {
              var data1 = that;
              this.formData = new FormData();
              var each_notify = response.notifications[i];
              if( each_notify ) {
                this.sendUserId = each_notify.sendUserId;
                this.sendUserProductId = each_notify.sendUserProductId;
                this.selectedProductId = each_notify.selectedProductId;
              }
              this.formData.append('sendUserId', this.sendUserId);
              this.formData.append('sendUserProductId', this.sendUserProductId);
              this.formData.append('selectedProductId', this.selectedProductId);
  
              var NotificationList = new Products();
  
              var response1 = $.ajax({
                url : url.pathname + "app/phpFiles/getOneNotification.php",
                type: 'POST',
                dataType: 'json',
                data: this.formData,
                processData: false,
                contentType: false,
                cache : false
                }).done(function( responce1 ) {
                   var singleNotify = this;
                   var data2 = data1;
                   singleNotify.sleUserName = responce1.selUserData[0].firstName;
                   singleNotify.sleUserId = responce1.sendUserProduct[0].userId;
                   if( !!responce1.sendUserProduct[0] && !!responce1.sendUserProduct[0].bookFileName ) {
                    singleNotify.sendImgName = responce1.sendUserProduct[0].productId + "_" + responce1.sendUserProduct[0].bookFileName;
                    singleNotify.sendBkImgName = responce1.sendUserProduct[0].bookFileName;
                  } else {
                    singleNotify.sendImgName = responce1.sendUserProduct[0].productId + "_" + responce1.sendUserProduct[0].eleFileName;
                    singleNotify.sendEleImgName = responce1.sendUserProduct[0].eleFileName;
                  } 
                  if( !!responce1.currUserProduct[0] && !!responce1.currUserProduct[0].bookFileName ) {
                    singleNotify.currImgName = responce1.currUserProduct[0].productId + "_" + responce1.currUserProduct[0].bookFileName;
                  } else {
                    singleNotify.currImgName = responce1.currUserProduct[0].productId + "_" + responce1.currUserProduct[0].eleFileName;
                  } 
                  singleNotify.pbookName = responce1.currUserProduct[0].pbookName;
                  singleNotify.peleName = responce1.currUserProduct[0].peleName;
                  singleNotify.currUserDetails = responce1.currUserProduct[0];
                  singleNotify.sendProductId = responce1.sendUserProduct[0].productId;
                  singleNotify.options = data2;
                  //Person objects //model
                  NotificationList.add( singleNotify );
  
                     
                });
            }                  
            // renders people, //Collectin view
            var notifications_view = new showUserNotificationsViews({collection: NotificationList});                      
            // // Create a Marionette Region
            var productRegion = new Marionette.Region({el:'#notification-latest'});
            productRegion.show(notifications_view.render());
  
         }); 
         this.checknotification = true;  
        } else {
          $('.show-notifications-details').remove();
          this.checknotification = false;
        }

      } else {
        alert( "Please Login");
      }

    },

    clickUserProfile: function() {

      this.userProducts_Page = new userProductsPage();
      $('.content-page').html(this.userProducts_Page.render().el);

      //load user products
      var userProduct = new userProducts();
      userProduct.loadUserProducts();

    },

    logOutPage: function() {

      var url = window.location;
       var that = this;
       var responce = $.ajax({
       url: url.pathname + "/app/phpFiles/xchLogout.php", 
       data: "",
       dataType: 'json',
      success: function(data) {
         }
       });
       Backbone.history.navigate('/#');
       Backbone.history.loadUrl("/#");
       window.location.reload();

    },

    initialize: function() {
        
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
              loginUser.firstName = event.userName;
              that.sessionTimeOut = false;
              if ( !!that.checknotification ){
                that.clickNotification();
              }
              that.render();
              $(".header-cal-3").addClass("lg-disable");
              $(".header-cal-4").removeClass("lg-disable");
              }
            } else {
              that.sessionTimeOut = true;
            }
          }
       });
    },
    
    checkNotification: function() {
      if( !!loginUser.firstName ) {
        var that = this;
        var url = window.location;
        var response1 = $.ajax({
         url : url.pathname + "app/phpFiles/checkNotification.php", 
         type: 'GET',
         dataType: 'json',
         data: "", 
         cache : false
         }).done(function( responce1 ) {
           if( responce1.notifications.length > 0 ) {
             $("#notification-latest-nums").text( responce1.notifications.length );
             $('.notification-latest-symbol').removeClass("notification-latest-lg-disable");
           }
         });
        }
    },

    checkMessages: function() {
      if( !!loginUser.firstName ) {
        var that = this;
       var url = window.location;
       var response1 = $.ajax({
        url : url.pathname + "app/phpFiles/checkMessages.php", 
        type: 'GET',
        dataType: 'json',
        data: "", 
        cache : false
        }).done(function( responce1 ) {
          if( responce1.MessageNotifications.length > 0 ) {
            $("#message-latest-nums").text( responce1.MessageNotifications.length );
            $('.message-latest-symbol').removeClass("message-latest-lg-disable");
          }
        });
      }
    },
    
    render: function ( event ) {
      // var template = _.template( $("#tmpl-message").html(), {} 
      if( !loginUser.firstName )
         this.beforeRender();
       var tpl = template( loginUser );
       $(this.el).html(tpl);
       this.checkNotification();
       this.checkMessages();
       return this; 
   },  

   });

   return HeaderView;

});