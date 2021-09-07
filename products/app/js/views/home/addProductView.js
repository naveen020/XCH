define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/views/home/homeView',
    'hbs!tpl/home/addproduct' ], function( $, _, Backbone, Handlebars, HomeView, template) {

    var bookModel = Backbone.Model.extend({
        defaults: {
            bookName: this.bookName,
            bookAuthor: this.bookAuthor,
            bookStory: this.bookStory,
            bookPrice: this.bookPrice,
            bookLocation: this.bookLocation,
            bookDescription: this.bookDescription
            }
        });
  
      var addProductView = Backbone.View.extend({
  
        className: "add-product-content",

        events: {
          'change #product-file-type' : 'updateGalleryPreview',
          'click .product-lg-container': 'clickAddProductFile',
          'click .product-submit-btn-outline': 'clickSubmitBtn',
          'click .product-cancle-btn-outline': 'clickCancleBtn'
        },

        setFromFiles: function( files ) {

            this.fileInfo = files;
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#add-product-image-section').attr('src', e.target.result);
                $(".add-product-image-tag").addClass("tag-disable");
            };
            reader.readAsDataURL(files[0]);

        },
        updateGalleryPreview: function( event ) {
            if( !!event.target.files && !!event.target.files[0] ) {
                this.setFromFiles( event.target.files);
            }
        },

        checkInteger: function( bookPrice ) {

            var intRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
            return intRegex.test(bookPrice);

        },

        clickCancleBtn: function() {
            this.homeView = new HomeView();
            this.homeView.loadHomePage();
        },
        
        clickSubmitBtn: function() {
            var hasError = false;
            this.bookName = $(this.el).find('input#book-name-input').val();
            this.bookAuthor = $(this.el).find('input#book-author-input').val();
            this.bookStory = $(this.el).find('input#book-story-input').val();
            this.bookPrice = $(this.el).find('input#book-price-input').val();
            this.bookLocation = $(this.el).find('input#book-location-input').val();
            this.bookDescription = $(this.el).find('textarea#book-description-input').val();

            this.bookModel = new bookModel();
            this.bookModel.attributes.bookName = this.bookName;
            this.bookModel.attributes.bookAuthor = this.bookAuthor;
            this.bookModel.attributes.bookStory = this.bookStory;
            this.bookModel.attributes.bookPrice = this.bookPrice;
            this.bookModel.attributes.bookLocation = this.bookLocation;
            this.bookModel.attributes.bookDescription = this.bookDescription;

            if(  !!this.checkInteger( this.bookPrice ) ) {
                
                if( this.bookName != "" && this.bookPrice != "" && this.bookLocation != "" && !!this.fileInfo ) {

                    var that = this;
                    this.form_data = new FormData();
                    this.form_data.append('file', this.fileInfo[0]);

                    this.form_data.append('bookName', this.bookName);
                    this.form_data.append('bookAuthor', this.bookAuthor);
                    this.form_data.append('bookStory', this.bookStory);
                    this.form_data.append('bookPrice', this.bookPrice);
                    this.form_data.append('bookLocation', this.bookLocation);
                    this.form_data.append('bookDescription', this.bookDescription);

                    var url = window.location;

                    var response = $.ajax({
                        url : url.pathname + "/app/phpFiles/addProduct.php", 
                        type: 'POST',
                        dataType: 'json',
                        data: this.form_data,
                        processData: false,
                        contentType: false,
                        cache : false
                    }).done(function(response) {
                        if( response.success == 1 ) {
                            that.homeView = new HomeView();
                            that.homeView.loadHomePage();
                            alert("Successfully completed");
                            
                        } else {
                            alert(response.message);
                        }
                    });


                } else {

                    alert(" Name, Price, Location, image fields shold not empty");

                }
            }  else {
                alert( "Price should be integer");
            }

        },

        clickAddProductFile: function() {
            $("#product-file-type").click();
        },
       
        initialize: function () {
            //this.template = templates['HelpView'];
        },
    
        render: function ( event ) {
            // var template = _.template( $("#tmpl-message").html(), {} );

            var tpl = template();
      
            $(this.el).html(tpl);
            
             return this;
         },  
  
     });
  
     return addProductView;
  
  });