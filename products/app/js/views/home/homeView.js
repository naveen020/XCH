define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/views/home/comHomePage',
    'js/Collections/home/Products',
    'js/Collections/home/eleProducts',
    'js/views/home/eleProductsView',
    'js/views/home/allProductsView' ], function( $, _, Backbone, Handlebars, comHomePage, Products, eleProducts, eleProductsView, productsView) {

        var loginUser = {
            sessionTimeOut: "",
            checkAuth: "",
          };
  
      var homeProdictsView = Backbone.View.extend({
  
        className: "all-prd-content",

        initialize: function () {
            console.log('Initializing Login View');
            //this.on('user:login', this.loadHomePage, this);
        },

        clickElectronicsPage: function() {
            this.clickElectronics_Page = true;
            var that = this;
            if( this.loginUser && this.loginUser.checkAuth != true ) {
                this.checkSession = true;
                this.checkUserSession();
            }
            if( !!this.userDetails && this.loginUser && this.loginUser.sessionTimeOut == false ) {
                this.comHome_Page = new comHomePage();
                $('.content-page').html(this.comHome_Page.render().el);
                $('.content-page-header').remove();
                $('.bk-related-header').remove();
                var url = window.location;
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/getNonUserElectronics.php", 
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        userId: this.userDetails.userId,
                        userName: this.userDetails.userName
                    }, 
                    cache : false
                }).done(function(response) {
                    var eleProductsList = new eleProducts();
                    eleProductsList.add( response.eleResults );
                    var eleProducts_View = new eleProductsView( { collection: eleProductsList}); 
                    var eleProductRegion = new Marionette.Region({el:'#content-page-ele-prds'});
                    $('.latest-bk-related-label').remove();
                    $('.latest-ele-electronics-label').remove();
                    eleProductRegion.show(eleProducts_View);         
                });
            } else {
                if( !!this.checkSession ) {
                    this.comHome_Page = new comHomePage();
                    $('.content-page').html(this.comHome_Page.render().el);
                    $('.content-page-header').remove();
                    $('.bk-related-header').remove();
                    var url = window.location;
                    var response = $.ajax({
                        url : url.pathname + "app/phpFiles/getOnlyElectronics.php", 
                        type: 'GET',
                        dataType: 'json',
                        data: "",
                        cache : false
                    }).done(function(response) {
                        var eleProductsList = new eleProducts();
                        eleProductsList.add( response.eleResults );
                        var eleProducts_View = new eleProductsView( { collection: eleProductsList}); 
                        var eleProductRegion = new Marionette.Region({el:'#content-page-ele-prds'});
                        $('.latest-bk-related-label').remove();
                        $('.latest-ele-electronics-label').remove();
                        eleProductRegion.show(eleProducts_View);         
                    });

                }
            }

            
        },

        loadOnlyBooksPage: function() {

            this.clickBooksPage = true;
            var that = this;
            if( this.loginUser && this.loginUser.checkAuth != true ) {
                this.checkSession = true;
                this.checkUserSession();
            }
            if( !!this.userDetails && this.loginUser && this.loginUser.sessionTimeOut == false ) {

                this.comHome_Page = new comHomePage();
                $('.content-page').html(this.comHome_Page.render().el);
                $('.content-page-header').remove();
                $('.ele-electronics-related').remove();
                // loginUser.checkAuth = false;
                    var url = window.location;
                    var response = $.ajax({
                        url : url.pathname + "app/phpFiles/getOnlyNonUserBooks.php", 
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            userId: this.userDetails.userId,
                            userName: this.userDetails.userName
                        },
                        cache : false
                    }).done(function(response) {
                        var bkProductList = new Products();
                        bkProductList.add( response.bkResult );
                        // renders bkproducts, //Collectin view
                        var bkProduct_view = new productsView({collection: bkProductList});                  
                        // Create a Marionette Region
                        var bkProductRegion = new Marionette.Region({el:'#content-page-bks-prds'});
                        $('.latest-bk-related-label').remove();
                        $('.latest-ele-electronics-label').remove();    
                        bkProductRegion.show(bkProduct_view);                                       
                    });
            
            } else {
                if(  !!this.checkSession ) {
                    this.comHome_Page = new comHomePage();
                    $('.content-page').html(this.comHome_Page.render().el);
                    $('.content-page-header').remove();
                    $('.ele-electronics-related').remove();
                    // loginUser.checkAuth = false;
                        var url = window.location;
                        var response = $.ajax({
                            url : url.pathname + "app/phpFiles/getOnlyBooks.php", 
                            type: 'GET',
                            dataType: 'json',
                            data:"",
                            cache : false
                        }).done(function(response) {
                            var bkProductList = new Products();
                            bkProductList.add( response.bkResult );
                            // renders bkproducts, //Collectin view
                            var bkProduct_view = new productsView({collection: bkProductList});                  
                            // Create a Marionette Region
                            var bkProductRegion = new Marionette.Region({el:'#content-page-bks-prds'});
                            $('.latest-bk-related-label').remove();
                            $('.latest-ele-electronics-label').remove();
                            bkProductRegion.show(bkProduct_view);                                       
                        });
                    }
            }
            
        },

        loadHomePage: function() {
            this.comHome_Page = new comHomePage();
            $('.content-page').html(this.comHome_Page.render().el);
            this.comHome_Page.render().$el.addClass("home-page-products");
             this.loadUserProducts();
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
                        if( !!that.clickElectronics_Page ){
                            that.clickElectronicsPage();
                            that.clickElectronics_Page = false;
                        }
                        if( !!that.clickBooksPage ) {
                            that.loadOnlyBooksPage();
                            that.clickBooksPage = false;
                        }                 
                        if( !!that.loadUser_Products ) {
                            that.loadUserProducts();
                            that.loadUser_Products = false;
                        }
                    }
                  } else {
                    that.sessionTimeOut = true;
                  }
                }
            });
          },  

        loadUserProducts: function() {

            this.loadUser_Products = true;
            var that = this;
            if( this.loginUser && this.loginUser.checkAuth != true ) {
                this.checkUserSession();
            }
            if( !this.userDetails )
                this.loginUser.checkAuth = true;
            if( !!this.userDetails && this.loginUser && this.loginUser.sessionTimeOut == false ) {

                // loginUser.checkAuth = false;

                var url = window.location;
                var response = $.ajax({
                    url : url.pathname + "app/phpFiles/getNonUserProducts.php", 
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        userId: this.userDetails.userId,
                        userName: this.userDetails.userName
                    }, 
                    cache : false
                }).done(function(response) {
                     
                        var bkProductList = new Products();
                        bkProductList.add( response.result );

                        var eleProductsList = new eleProducts();
                        eleProductsList.add( response.eleResults );

                       var eleProducts_View = new eleProductsView( { collection: eleProductsList});
                        // renders bkproducts, //Collectin view
                        var bkProduct_view = new productsView({collection: bkProductList});
                        
                        // Create a Marionette Region
                        var bkProductRegion = new Marionette.Region({el:'#content-page-bks-prds'});
                        bkProductRegion.show(bkProduct_view);
                        
                        var eleProductRegion = new Marionette.Region({el:'#content-page-ele-prds'});
                        eleProductRegion.show(eleProducts_View);
                              
                });

            } else {
                if( that.loginUser && !!that.loginUser.checkAuth ) {
                    // loginUser.checkAuth = false;
                    var url = window.location;
                    var response = $.ajax({
                        url : url.pathname + "app/phpFiles/getAllProducts.php", 
                        type: 'GET',
                        dataType: 'json',
                        data: "",
                        cache : false
                    }).done(function(response) {
                         
                            var bkProductList = new Products();
                            bkProductList.add( response.bkResult );
    
                            var eleProductsList = new eleProducts();
                            eleProductsList.add( response.eleResults );
    
                           var eleProducts_View = new eleProductsView( { collection: eleProductsList});
                            // renders bkproducts, //Collectin view
                            var bkProduct_view = new productsView({collection: bkProductList});
                            
                            // Create a Marionette Region
                            var bkProductRegion = new Marionette.Region({el:'#content-page-bks-prds'});
                            bkProductRegion.show(bkProduct_view);
                            
                            var eleProductRegion = new Marionette.Region({el:'#content-page-ele-prds'});
                            eleProductRegion.show(eleProducts_View);
                                  
                    });
                }
            }

        },

        initialize : function() { 
            // Some logic to invoke at the time of intialization
            this.loginUser = {
                sessionTimeOut: "",
                checkAuth: false
            };
        },
    
        render: function ( ) {
            // Some logic to invoke at the time of intialization
           
         },  
  
     });
  
     return homeProdictsView;
  
  });