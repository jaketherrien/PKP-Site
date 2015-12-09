// 'Camera' picture slide

'use strict';

$(document).ready(function(){ 

	// 'Camera' picture slide funtions
	var height = 400;

	//If the screen is small, set the height smaller
	if($(document).width()<768) {
		height = 200;
	}

	jQuery(function(){
		jQuery('#camera_wrap_1').camera({
			alignment: 'center',
			height: height+'px',
			time: 1500
		});
	});
	$('#camera_wrap_1').css('margin-top',"8px");
});
