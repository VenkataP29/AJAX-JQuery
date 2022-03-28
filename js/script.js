(function($) { 

'use strict';

var $body = $('body');
var $list = $('.m-info');
var $message = $('.m-message');
var $modal = $('.modal');
var $loader = $('.loader');
var $framework;

$('.boxes a').on('click', function(e){
	e.preventDefault();
	$framework = $(this).text();
	$.ajax({
		url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/Demo.json',
		dataType : 'json',
		beforeSend : function(){
			$loader.show();
		}
	}).done(successFunction)
	  .fail(failFunction)
	  .always(alwaysFunction);
});

//success function
function successFunction(data){
	if(data.length>0){
		for(var i=0; i<data.length; i++){
			if($framework === data[i].name){
				$list.show();
				$message.hide();
				$list.find('li:nth-of-type(2)').text($framework);
				$list.find('li:nth-of-type(4)').text(data[i].currentVersion);
				$list.find('li:nth-of-type(6)').text(data[i].numberOfStars);
				$list.find('li:nth-of-type(8)').html('<a href="' + data[i].url +'" target="_blank">' + data[i].url + '</a>');
					break;
			}else{
				$list.hide();
				$message.show().text("No data received for this framework!");
			}
		}
	}
	else{
		$list.hide();
		$message.text("No data received from your response");
	}
}

function alwaysFunction(){
	$loader.hide();
	$modal.addClass('active');
	$body.css('overflow','hidden');
}

function failFunction(request,textStatus, errorThrown){
	$list.hide();
	$message.text('An error occurred during your request:' + request.status + ' ' + textStatus+ ' '+ errorThrown);
}

//close the button
$modal.find('button').on('click', function(){
	$body.css('overflow','visible');
	$(this).parent().removeClass('active');
});

})(jQuery);