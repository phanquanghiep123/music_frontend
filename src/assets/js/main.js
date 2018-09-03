;
(function ($) {
   
    var MAIN_UI = {
		//INIT
        init: function () {
			//this.init_form();
        },
		resize: function(){
			
		},
		
		init_form: function(){
			$('.form-control').each(function() {
  				var text_holder = $(this).attr('placeholder');
				$(this).attr('placeholder','');
				$(this).closest('.form-group').append('<span class="text-holder">' + text_holder + '</span>')
			});
			$('.form-control').focus(function() {
				$(this).closest('.form-group').addClass('active');
			});
			$('.form-control').focusout(function(){
				if( !$(this).val() ) {
					$(this).closest('.form-group').removeClass('active');
				}
			});
			
		},
		init_loading: function(){
			$('.loading').delay( 1000 ).fadeOut();
		},
		
		
    };
    $(document).ready(function () {
        MAIN_UI.init();
    });
    $(window).resize(function () {
        MAIN_UI.resize();
    });
    $(window).load(function () {
		MAIN_UI.init_loading();
    });

})(jQuery);