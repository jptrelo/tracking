$(function () {
	var start = true;
	$("#aTrigger").click(function () {
		if (start) {
			Timer.initialize($("#txtTimer"));
			this.innerHTML = "Stop";
			this.className = "btn btn-danger";
			start = false;
		} else {
			Timer.stop();
			this.innerHTML = "Start";
			this.className = "btn btn-success";
			start = true;
		}
		
	});
});