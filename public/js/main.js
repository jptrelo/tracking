$(function () {
	// When click on start and stop
	var start = true;
	var $trackTrigger = $("#aTrigger");
	$trackTrigger.click(function () {
		if (start) {
			Timer.initialize($("#txtTimer"));
			this.innerHTML = "Stop";
			this.className = "btn btn-danger";
			$('input[type=radio][name=rbtnTrackType]').attr('disabled', true);
			start = false;
		} else {
			let form = $("#frmTrack");
			$('input[type=radio][name=rbtnTrackType]').removeAttr('disabled');
			if ($('input[type=radio][name=rbtnTrackType]').val() == '0') {
				// set datetimes when stop
				setStartEnd(form);
				Timer.stop();
				this.innerHTML = "Start";
				this.className = "btn btn-success";				
				start = true;
			} 
			saveTrack(form);
			$(':input','#frmTrack')
			  .not(':button, :radio, [type="datetime-local"], [name="txtTimer"]')
			  .val('');
			}
		
	});
	
	// Configuration if it's a manual track
	$('input[type=radio][name=rbtnTrackType]').change(function() {
        if (this.value == '0') {
            $trackTrigger.html('Start');
            $("input[type='datetime-local']").hide();
            $("#txtTimer").show();
            $(".c_tp").addClass('col-sm-4');
            $(".c_tp").removeClass("col-sm-3");
            $(".c_time").addClass('col-sm-3');
            $(".c_time").removeClass('col-sm-5');
            start = true;
        }
        else{
            $trackTrigger.html('Save');
            $("input[type='datetime-local']").show();
            $("#txtTimer").hide();
            $(".c_tp").removeClass('col-sm-4');
            $(".c_tp").addClass("col-sm-3");
            $(".c_time").removeClass('col-sm-3');
            $(".c_time").addClass('col-sm-5');
            start = false;
        }
    });

	// To continue tracking a task
    $(document).on("click", ".btnContinue",function () {
    	$.ajax({
		  method: "GET",
		  url: "/track/" + this.dataset.item
		}).done(function( track ) {
			$("input[name='txtTask']").val(track.task_name);
	    	$("input[name='txtProject']").val(track.project_id.name);
	    	$("input[name='hdnProjectID']").val(track.project_id._id);
	    	$trackTrigger.click();
		}).fail( function( jqXHR, textStatus, errorThrown ) {
		    alert( errorThrown );
		    console.log(textStatus + " - " + errorThrown);
		});	
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
		}).done(function( data ) {
		  	//add a new row in the table
		    addRowNewTrack(data);

		 }).fail( function( jqXHR, textStatus, errorThrown ) {
		    alert( errorThrown );
		    console.log(textStatus + " - " + errorThrown);
		});
	}
	/**
	 * [setStartEnd Set datetime for Start and Finish Inputs when stop(automatic saving)]
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

		$.ajax({
		  method: "GET",
		  url: "/project/" + track.project_id
		}).done(function( data ) {
			var project = { _id : data._id, name : data.name};

			track.project_id = project;

			var duration = moment(track.finishedAt).diff(moment(track.startedAt));
		  	
		  	var td = "";
			//for (var i = 0; i < track.length; i++) {			
				td += '<td>'+ track.task_name +'</td>';
				td += '<td>'+ track.project_id.name +'</td>';
				td += '<td>'+ moment(track.startedAt).format('HH:mm:ss') +'</td>';
				td += '<td>'+ moment(track.finishedAt).format('HH:mm:ss') +'</td>';
				td += '<td>'+ moment.utc(duration).format("HH:mm:ss") +'</td>';
				td += "<td class='col-sm-1' >" + 
						"<button class='btn btn-sm btn-default btnContinue' data-item='"+ track._id + "'>"+
					 	"Continue </button></td>";
			//}		
			
			$("#tblTracks tbody").append('<tr>'+ td +'</tr>');

		}).fail( function( jqXHR, textStatus, errorThrown ) {
		    alert( errorThrown );
		    console.log(textStatus + " - " + errorThrown);
		});		
		
	}

});