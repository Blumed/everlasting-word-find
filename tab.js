$(function() {
	var results = $('h3.r a');

    results.attr('tabindex', function(index, attr) {
        return index + 1;
    });

     $(this).on("keyup", function (event) {
        if (event.which == 13) {
            $(this).trigger('click');
        }
    });

});