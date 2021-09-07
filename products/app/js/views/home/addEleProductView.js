define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'js/views/home/homeView',
    'hbs!tpl/home/addEleProduct' ], function( $, _, Backbone, Handlebars, HomeView, template) {
  
      var footerView = Backbone.View.extend({
  
        className:"ele-products-content",

        events: {
            'change #ele-product-file-type' : 'updateGalleryPreview',
            'click .ele-product-lg-container': 'clickAddProductFile',
            'click .ele-product-cancle-btn': 'clickCancleBtn',
            'click .ele-product-submit-btn': 'clickSubmitBtn'
        },
        setFromFiles: function( files ) {

            this.fileInfo = files;
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#add-ele-product-image-section').attr('src', e.target.result);
                $(".add-ele-product-image-tag").addClass("tag-disable");
            };
            reader.readAsDataURL(files[0]);

        },

        checkInteger: function( bookPrice ) {

            var intRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
            return intRegex.test(bookPrice);

        },

        clickSubmitBtn: function() {
            var hasError = false;
            this.eleType = $( "#add-ele-products option:selected" ).text();
            this.eleName = $(this.el).find('input#ele-model-input').val();
            this.elePrice = $(this.el).find('input#ele-price-input').val();
            this.eleFeature = $(this.el).find('input#ele-feature-input').val();
            this.eleLocation = $(this.el).find('input#ele-location-input').val();
            this.eleDescription = $(this.el).find('textarea#book-description-input').val();

            if(  !!this.checkInteger( this.elePrice ) ) {
                if( this.eleName != "" && this.elePrice != "" && this.eleLocation != "" && !!this.fileInfo ) {

                    var that = this;
                    this.form_data = new FormData();
                    this.form_data.append('file', this.fileInfo[0]);

                    this.form_data.append('eleType', this.eleType);
                    this.form_data.append('eleName', this.eleName);
                    this.form_data.append('elePrice', this.elePrice);
                    this.form_data.append('eleFeature', this.eleFeature);
                    this.form_data.append('eleLocation', this.eleLocation);
                    this.form_data.append('eleDescription', this.eleDescription);
                    var url = window.location;

                    var response = $.ajax({
                        url : url.pathname + "/app/phpFiles/addEleProduct.php", 
                        type: 'POST',
                        dataType: 'json',
                        data: this.form_data,
                        processData: false,
                        contentType: false,
                        cache : false
                    }).done(function(response) {
                        if( response.success == 1 ) {
                            this.homeView = new HomeView();
                            this.homeView.loadHomePage();
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

        clickCancleBtn: function() {
            this.homeView = new HomeView();
            this.homeView.loadHomePage();
        },

        updateGalleryPreview: function( event ) {
            if( !!event.target.files && !!event.target.files[0] ) {
                this.setFromFiles( event.target.files);
            }
        },
        
        clickAddProductFile: function() {
            $("#ele-product-file-type").click();
        },
      
        initialize: function () {
            //this.template = templates['HelpView'];
        },
    
        render: function ( event ) {
            var tpl = template();
      
            $(this.el).html(tpl);
            
             return this;
         },  
  
     });
  
     return footerView;
  
  });