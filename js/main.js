function init() {
	var screen_height     = $(window).height(),
	    headers_height    = $('.headers_container').height();
	
	
	if(!isMobile()) {
		$('#main_banner, #footer').height(screen_height);
		$('.headers_container').css('padding', (screen_height - headers_height) / 2 + 'px 0');
	} else {
		$('#main_banner, #footer').css('height', 'inherit');
		$('.headers_container').css('padding', '150px 0');
		
	}
	
}
function isMobile() {
	if($(window).width() < 768 ) {
		return true;
	} else {
		return false;
	}
}

$(window).resize(function () {
	init();
	
});
$(document).ready(function () {
	init();
	
	$('#main_banner .icon_container').click(function () {
		$('html, body').animate({
			scrollTop: $("#main_gallery").offset().top
		}, 1500);
	});
	$('#footer .icon_container').click(function () {
		$('html, body').animate({
			scrollTop: $("#main_gallery").offset().top
		}, 1500);
	});
	var intervalW,
	    intervalP,
	    work = {
			minute: 24,
			sec: 59
		},
	    pause = {
			minute: 4,
			sec: 59,
		},
	    audio = new Audio('./audio/front-desk-bells-daniel_simon.mp3');
	$('#minutes').text('To start click ');
	$('#sec').text('"start working"');
	
	$('#work').click(function () {
		clearInterval(intervalW);
		clearInterval(intervalP);
		work.minute = 24;
		work.sec=59;
		pause.minute = 4;
		pause.sec=59;
		$('#minutes').text(work.minute +':');
		$('#sec').text(work.sec);
		intervalW = setInterval(function () {
			if(work.sec===0){
				work.minute--;
				work.sec=59;
				if(work.minute<10){
					$('#minutes').text('0'+work.minute + ':');
				} else {
					$('#minutes').text(work.minute + ':');
				}
			} else{
				work.sec--;
				if(work.sec<10){
					$('#sec').text('0'+work.sec);
				} else {
					$('#sec').text(work.sec);
				}
			}
			$('#sec').text(work.sec);
			
		}, 1000);
		$('#subtitle').text('Work');
		
	});
	$('#break').click(function () {
		$('#minutes').text('0'+pause.minute +':');
		$('#sec').text(pause.sec);
		
		clearInterval(intervalP);
		clearInterval(intervalW);
		work.minute = 24;
		work.sec=59;
		pause.minute = 4;
		pause.sec=59;
		intervalP = setInterval(function () {
			if(pause.sec===0){
				pause.minute--;
				pause.sec=59;
				$('#minutes').text('0'+pause.minute +':');
				$('#sec').text(pause.sec);
				
			} else{
				pause.sec--;
				if(pause.sec<10){
					$('#sec').text('0'+pause.sec);
				} else {
					$('#sec').text(pause.sec);
				}
			}
			
			
		}, 1000);
		$('#subtitle').text('Break');
	});
	
	setInterval(function () {
		if(work.minute===0 && work.sec===0) {
			clearInterval(intervalW);
			$('#minutes').text('To continue click ');
			$('#sec').text('"start break"');
			audio.play();
			work.minute = 24;
			work.sec=59;
			
			
		}
		if(pause.minute===0 && pause.sec===0){
			clearInterval(intervalP);
			audio.play();
			$('#minutes').text('To continue click ');
			$('#sec').text('"start break"');
			pause.minute = 4;
			pause.sec=59;
			
			
		}
	},1000)
	
	
	clearInterval(interval);
});

