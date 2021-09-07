define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/views/home/selectBkProduct',
    'hbs!tpl/home/showUserBkProducts' ], function( $, _, Backbone, Handlebars, Marionette, selectBkProduct, template) {

      var ProductView = Marionette.ItemView.extend({

        className: 'show-user-bk-products lg-cancle-disable',

        tagName: 'li',

        template: template,

        events: {
            'click .bk-product-xch-select-btn-outline' : 'clickBtnSelectbtn',
            'click .bk-product-xch-select-cancle-btn' : 'clickCancleBtn'
        },

        clickBtnSelectbtn: function( e ) {
          
          if( !!this.model.attributes.selectProduct ) {
            this.selectedProduct = this.model.attributes.selectProduct;
          }

          var that = this;
          this.form_data = new FormData();
          this.form_data.append('sendUserId', this.model.attributes.userId);
          this.form_data.append('sendUserProductId', this.model.attributes.productId);
          this.form_data.append('currentUserId', this.selectedProduct.model.attributes.userId);
          this.form_data.append('selectedProductId', this.selectedProduct.model.attributes.productId);

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
                  that.$el.addClass('lg-select-disable');
                  that.$el.removeClass("lg-cancle-disable");          
                });
          
        },

        clickCancleBtn: function() {

          var that = this;
          this.form_data = new FormData();
          this.form_data.append('sendUserProductId', this.model.attributes.productId);
          var url = window.location;
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/cancleNotifications.php", 
                    type: 'POST',
                    dataType: 'json',
                    data: this.form_data,
                    processData: false,
                    contentType: false,
                    cache : false
                }).done(function(response) {
                  that.$el.removeClass('lg-select-disable');
                  that.$el.addClass("lg-cancle-disable");       
                });
        },
      
      initialize : function() { 
        // Some logic to invoke at the time of intialization
      }
      });

        return ProductView;
  
  });