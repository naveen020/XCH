define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'marionette',
    'js/Collections/home/Products',
    'js/views/home/showEleProduct',
    'js/views/home/showUserBkProducts',
    'js/views/home/selectBkProduct',
    'hbs!tpl/home/eleProductTpl' ], function( $, _, Backbone, Handlebars, Marionette, Products, showEleProduct, showUserBkProducts, selectBkProduct, template) {

      var ProductView = Marionette.ItemView.extend({

        className: 'user-ele-products',

        tagName: 'li',
 
        template: template,

        events: {
           'click .user-ele-product-object' : 'clickEleProduct',
           'click .ele-product-xch-submit-btn-outline' : 'clickExchange'
        },

        clickEleProduct: function() {
          this.showEle_Product = new showEleProduct();
          $('.content-page').html(this.showEle_Product.render( this.model.attributes ).el);
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
                  that.clickExchange();
                  }
                } else {
                  that.sessionTimeOut = true;
                  alert("Please login.");
                }
              }
          });
        },  

        clickExchange: function() {

          var that = this;
          if( this.loginUser && this.loginUser.checkAuth != true ) {
              this.checkUserSession();
          }

          if( !!this.userDetails && this.loginUser && this.loginUser.sessionTimeOut == false ) {

            this.selectBk_Product = new selectBkProduct();
            $('.content-page').html(this.selectBk_Product.render( this.model.attributes ).el);

            var url = window.location;
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/getOnlyUserMixProducts.php", 
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        userId: this.userDetails.userId,
                        userName: this.userDetails.userName
                    }, 
                    cache : false
                }).done(function(response) {
                    for( var i=0; i< response.bkResult.length ;i++ ) {
                      this.eachModel = response.bkResult[i];
                      this.eachModel.selectProduct= that;
                    }
                    var productList = new Products();
                    //Person objects //model
                    productList.add( response.bkResult );

                    // renders people, //Collectin view
                    var product_view = new showUserBkProducts({collection: productList});
                    
                    // // Create a Marionette Region
                    var productRegion = new Marionette.Region({el:'#sh-user-bk-products'});
                    productRegion.show(product_view.render());
                              
                });
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

        return ProductView;
  
});