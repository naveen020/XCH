define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/models/home/notification',
    'js/views/header/sendUserMessages',
    'js/views/header/receiverUserMessage',
    'hbs!tpl/header/chatView' ], function( $, _, Backbone, Handlebars, notificationModel, SendUserMessages, ReceiverUserMessage, template) {
  
      var footerView = Backbone.View.extend({
  
        className: "chat-box",

        model: notificationModel,
      
        initialize: function () {
            //this.template = templates['HelpView'];
        },
    
        events: {
            'click .send-btn' : 'clickSendBtn',
            'click .close-chat-box-img' : 'clickCloseBtn'
        },

        clickSendBtn: function() {
            this.sendUserMessages = new SendUserMessages();
            this.model.message = $('.send-text-in-btn').val();
            if( this.model.message != '' ) {
                $('.send-text-in-btn').val('');
                this.form_data = new FormData();
                this.form_data.append('fromUserId', this.model.userDetails.userId );
                this.form_data.append('toUserId', this.model.sleUserId );
                this.form_data.append('message', this.model.message );
                
                var url = window.location;
                var that = this;
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/sendMessage.php", 
                    type: 'POST',
                    dataType: 'json',
                    data: this.form_data,
                    processData: false,
                    contentType: false,
                    cache : false
                }).done(function(response) {
                    console.log("Successfully storedMessages");
                    if( !!response.latestMessages ) {
                        for( var i=0;i< response.latestMessages.length; i++) { 
                             if( response.latestMessages[i].formUserId == that.model.userDetails.userId ) {
                                that.sendUserMessages = new SendUserMessages();
                                response.latestMessages[i].userName = that.model.userName;
                                response.latestMessages[i].message = response.latestMessages[i].Message;
                                $('.sendUserMessage').append(that.sendUserMessages.render( response.latestMessages[i] ).el);
                             }
                        }
                    }   
                    $('.chat-box-messages').animate({
                        scrollTop: $('.chat-box-messages').get(0).scrollHeight
                    });
                });
            }
        },
        

        clickCloseBtn: function() {
            $('.show-user-chat-box').addClass("show-chat-box-lg-disable");
        },

        checkMessages: function(event) {
            var url = window.location;
            var that = this;
            this.form_data = new FormData();
            this.form_data.append('fromUserId', this.model.userDetails.userId );
            this.form_data.append('toUserId', this.model.sleUserId );
            var response = $.ajax({
                url : url.pathname + "app/phpFiles/getMessages.php", 
                type: 'POST',
                dataType: 'json',
                data: this.form_data,
                processData: false,
                contentType: false,
                cache : false
            }).done(function(response) {
                this.models = that.model;
                if( !!that.model && !!that.model.userDetails && !!that.model.userDetails.userId ) {
                    if( !!response.Messages ) {
                        for( var i=0;i< response.Messages.length; i++) { 
                             if( response.Messages[i].formUserId == that.model.userDetails.userId ) {
                                that.sendUserMessages = new SendUserMessages();
                                response.Messages[i].userName = that.model.userName;
                                response.Messages[i].message = response.Messages[i].Message;
                                $('.sendUserMessage').append(that.sendUserMessages.render( response.Messages[i] ).el);
                             } else if( response.Messages[i].formUserId == that.model.sleUserId) {
                                that.receiverUserMessage = new ReceiverUserMessage();
                                response.Messages[i].receiveUserName  = that.model.sleUserName;
                                response.Messages[i].receiveMessage  = response.Messages[i].Message;
                                $('.receiverUserMessage').append(that.receiverUserMessage.render( response.Messages[i] ).el);
                             }
                        }
                        $('.chat-box-messages').animate({
                            scrollTop: $('.chat-box-messages').get(0).scrollHeight
                        });
                    }
                }
            });
            setInterval(function( ){
                this.checkNewMessages.checkInterval = true;
                this.checkNewMessages( this.checkNewMessages.model );
           }, 1000);
        },

        checkNewMessages: function( event ) {

            var url = window.location;
            if( !!this.checkNewMessages && !!this.checkNewMessages.checkInterval ) {
                this.model = event;
                var that = this;
                this.form_data = new FormData();
                this.form_data.append('fromUserId', this.model.userDetails.userId );
                this.form_data.append('toUserId', this.model.sleUserId );
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/checkLatestMessages.php", 
                    type: 'POST',
                    dataType: 'json',
                    data: this.form_data,
                    processData: false,
                    contentType: false,
                    cache : false
                }).done(function(response) {
                    this.models = that.model;
                    if( !!that.model && !!that.model.userDetails && !!that.model.userDetails.userId ) {
                        if( !!response.Messages ) {
                            for( var i=0;i< response.Messages.length; i++) { 
                                  if( response.Messages[i].formUserId == that.model.sleUserId) {
                                    that.receiverUserMessage = new ReceiverUserMessage();
                                    response.Messages[i].receiveUserName  = that.model.sleUserName;
                                    response.Messages[i].receiveMessage  = response.Messages[i].Message;
                                    $('.receiverUserMessage').append(that.receiverUserMessage.render( response.Messages[i] ).el);
                                 }
                            }
                            $('.chat-box-messages').animate({
                                scrollTop: $('.chat-box-messages').get(0).scrollHeight
                            });
                        }
                    }
                });
            }
        },

        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );
            this.model = event;
            this.checkMessages( event );
            this.checkNewMessages( event );
            this.checkNewMessages.model = event;
            window.checkNewMessages = this.checkNewMessages;
            var tpl = template( event );
            $(this.el).html(tpl);
            
             return this;
         },  
  
     });
  
     return footerView;
  
  });