define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/views/home/showNotifyProducts',
    'js/views/home/showBkProduct',
    'js/views/home/showEleProduct',
    'hbs!tpl/navigation/showNotifications' ], function( $, _, Backbone, Handlebars, Marionette, showNotifyProducts,
      showBkProduct, showEleProduct, template) {

      var notificationView = Marionette.ItemView.extend({

        className: 'show-user-showNotifications',

        tagName: 'li',

        template: template,

        events: {
          'click .show-user-notification-item' : 'clickNotificationProduct'
        },

        clickNotificationProduct: function( event ) {
            var that = this;
            this.formData = new FormData();
            this.formData.append('selectedProductId', this.model.attributes.sendProductId);
            this.showBk_Product = new showNotifyProducts();
            $('.content-page').html(this.showBk_Product.render( this.model.attributes ).el);
            var url = window.location;
            var response = $.ajax({
              url : url.pathname + "app/phpFiles/showOneNotification.php",
              type: 'POST',
              dataType: 'json',
              data: this.formData,
              processData: false,
              contentType: false,
              cache : false
              }).done(function( responce ) {
                   if( !!responce.sendUserProduct[0] )
                      responce.sendUserProduct[0].sendUserName = that.model.attributes.sleUserName;
                   if( !!responce.sendUserProduct[0] && responce.sendUserProduct[0].productType == 8004) {
                      responce.sendUserProduct[0].pfileName = that.model.attributes.sendBkImgName;
                      this.showBk_Product = new showBkProduct();
                      $('.show-user-bk-product-section-1').html(this.showBk_Product.render( responce.sendUserProduct[0] ).el);
                      this.showBk_Product.options = responce.sendUserProduct[0];
                      $('.show-user-details-sections-3').removeClass("lg-disable");
                   } else if( !!responce.sendUserProduct[0] && responce.sendUserProduct[0].productType == 7702) {
                      responce.sendUserProduct[0].pfileName = that.model.attributes.sendEleImgName;
                      this.showEle_Product = new showEleProduct();
                      $('.show-user-ele-product-section-2').html(this.showEle_Product.render( responce.sendUserProduct[0] ).el);
                      $('.show-user-details-sections-3').removeClass("lg-disable");
                 }
                 that.model.attributes.options.clickNotification();
              });
        },

        initialize : function() { 
          // Some logic to invoke at the time of intialization
        }

      });

        return notificationView;
  
  });