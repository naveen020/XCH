define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/Collections/home/Products',
    'js/views/home/ProductsView',
    'js/Collections/home/eleProducts',
    'js/views/home/eleUserProductsView',
    'hbs!tpl/home/home' ], function( $, _, Backbone, Handlebars, Products, productsView, eleProducts, eleUserProductsView, template) {

        loginUser = {
            sessionTimeOut: "",
            checkAuth: "",
          };
  
      var userProduct = Backbone.View.extend({
  
        className: "img-row1-content",

        initialize: function () {
            console.log('Initializing Login View');
            //this.on('user:login', this.loadHomePage, this);
        },

        checkUserSession: function() {

            var url = window.location;
            var that = this;
            loginUser.checkAuth = true;  
            var responce = $.ajax({
            url: url.pathname + "/app/phpFiles/xchSession.php", 
            data: "",
            dataType: 'json',
            success: function(data) {
                if( data.sessionTimeOut != true ) {
                    loginUser.sessionTimeOut = false; 
                    that.userDetails = data;                  
                      that.loadUserProducts();
                    } else {
                        loginUser.sessionTimeOut = true;
                    }
                }
            });

        },

        loadUserProducts: function() {

            var that = this;

            if( loginUser.checkAuth != true ) {
                this.checkUserSession();
            }
            if( !!this.userDetails && !loginUser.sessionTimeOut ) {

                loginUser.checkAuth = false;

                var url = window.location;
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/getUserProducts.php", 
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        userId: this.userDetails.userId,
                        userName: this.userDetails.userName
                    }, 
                    cache : false
                }).done(function(response) {

                     var productList = new Products();
                    //Person objects //model
                    productList.add( response.result );

                    var eleProductsList = new eleProducts();
                    eleProductsList.add( response.eleResults );

                    var eleProducts_View = new eleUserProductsView( { collection: eleProductsList});
                
                    // renders people, //Collectin view
                    var product_view = new productsView({collection: productList});
                    
                    // Create a Marionette Region
                    var productRegion = new Marionette.Region({el:'#content-user-page-bks-prds'});
                    productRegion.show(product_view.render());

                    var eleProductRegion = new Marionette.Region({el:'#content-user-page-ele-prds'});
                    eleProductRegion.show(eleProducts_View.render());

                              
                });

            }
        },
    
        render: function ( event ) {


         },  
  
     });
  
     return userProduct;
  
  });