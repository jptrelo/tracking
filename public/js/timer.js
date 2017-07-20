(function($){
	Timer = {
		variables: {			
			tm  : null,
			txtTimer : null
		},
		initialize : function(element){
			// Set initial variables
			var seconds = 0, 
				minutes = 0, 
				hours = 0,
				time = "";
			// Set an interval 
			Timer.variables.tm = setInterval(function(){
				if (seconds == 59) {
					seconds = 0;
					minutes++;

					if (minutes == 59) {
						minutes = 0;
						hours++;
					}
				}

				seconds++;
				// build a string to append in the txt where we show the timer
				time =  hours + ":" + 
					   ((minutes > 9) ? minutes : "0" + minutes) + ":" + 
					   ((seconds > 9) ? seconds : "0" + seconds);
				$(element).val(time);

			}, 1000);
			Timer.variables.txtTimer = element;
		},
		stop : function(){
			// Clear the interval and reset txtTimer
			clearInterval(Timer.variables.tm);
			$(Timer.variables.txtTimer).val("0:00:00");
		}
	};

})(jQuery);