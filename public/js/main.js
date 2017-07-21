$(function () {
	// When click on start and stop
	var start = true;
	$("#aTrigger").click(function () {
		if (start) {
			Timer.initialize($("#txtTimer"));
			this.innerHTML = "Stop";
			this.className = "btn btn-sm btn-danger";
			start = false;
		} else {
			var form = $("#frmTrack");
			if ($('input[type=radio][name=rbtnTrackType]').val == '0') {
				// set datetimes
				setStartEnd(form);
				Timer.stop();
				this.innerHTML = "Start";
				this.className = "btn btn-sm btn-success";
				start = true;
			} 
			saveTrack(form);
		}
		
	});

	// Save a project from the Bootstrap Modal.
	$("#btnSaveProject").click(function () {
		$.ajax({
		  method: "POST",
		  url: "/project",
		  data: { txtProject : $("#txtModalProject").val() }
		})
		  .done(function( data ) {
		    $("#txtProject").val(data.name);
		    $("#hdnProjectID").val(data._id);
		  });
	});

	// To select if it's a manual track
	$('input[type=radio][name=rbtnTrackType]').change(function() {
        if (this.value == '0') {
            $("#aTrigger").html('Start');
            $("input[type='datetime-local']").hide();
            $("#txtTimer").show();
            start = true;
        }
        else{
            $("#aTrigger").html('Save');
            $("input[type='datetime-local']").show();
            $("#txtTimer").hide();
            start = false;
        }
    });

	/**
	 * [saveTrack Save a tracking of time]
	 * @param form [element form]
	 */
	function saveTrack(form) {

		$.ajax({
		  method: "POST",
		  url: "/track",
		  data: form.serialize()
		})
		  .done(function( data ) {
		  	//add a new row in the table
		    addRowNewTrack(data);

		  });
	}
	/**
	 * [setStartEnd Set datetime for Start and Finish Inputs]
	 * @param form [form element]
	 */
	function setStartEnd(form) {
		var date = new Date();
		var startedAt = new Date();
		var taskTime = $(form)[0].txtTimer.value.split(":");
		
 		startedAt.setHours(date.getHours() - taskTime[0]);
 		startedAt.setMinutes(date.getMinutes() - taskTime[1]);
 		startedAt.setSeconds(date.getSeconds() - taskTime[2]);

 		$("#dateStarted").val(moment(startedAt).format('YYYY-MM-DDThh:mm:ss'));

 		$("#dateFinished").val(moment(date).format('YYYY-MM-DDThh:mm:ss'));
	}

	/**
	 * [addRowNewTrack Add the track created to the table]
	 * @param track [the track created]
	 */
	function addRowNewTrack(track) {
		var td = "";
		//for (var i = 0; i < track.length; i++) {			
			td += '<td>'+ track.task_name +'</td>';
			td += '<td>'+ track.project_id +'</td>';
			td += '<td>'+ moment(track.startedAt).format('HH:mm:ss') +'</td>';
			td += '<td>'+ moment(track.finishedAt).format('HH:mm:ss') +'</td>';
			td += '<td>'+ moment(track.finishedAt).diff(moment(track.startedAt)) +'</td>';
		//}		
		
		$("#tblTracks").append('<tr>'+ td +'</tr>');
	}
});