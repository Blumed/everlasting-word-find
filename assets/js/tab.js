$(function() {
	var results = $('h3.r a'),
        focused = $('h3.r a:focus')
        card = $('.g');


	results.on('focus', function(){
		$('*').removeClass('thisisit');
		$(this).closest('.g').addClass('thisisit');        
	});

    card.on('click', function(e){
        $('*').removeClass('thisisit');
        $(this).addClass('thisisit');
        $(this).find("a")[0].click();
        console.log('click');
    });
    
    results.attr('tabindex', function(index, attr) {
        return index + 1;
    });

     $(this).on("keyup", function (e) {
        if (e.which == 13) {
            $(this).trigger('click');
        }
    });
});