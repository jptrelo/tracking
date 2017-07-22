$(function() {
	// get projects and load the collection
	var ModalProject = { modal : $("#myModal"),
						elements : {
							txtProject : $("#txtModalProject"),
							hdnProject : $("#hdnModalProject"),
							btnSaveProject: $("#btnSaveProject")						
						},
						initialize : function($mainTxtProject, $mainHdnProjectID){
							$.get("/project", function(data){
							  	ModalProject.elements.txtProject.typeahead({ 
													source:data,
													minLength: 2,
													displayText: data.name
												});
							},'json');

							ModalProject.modal.on('shown', function () {
							    if ($mainHdnProjectID.val() != "") {
							      // This means the exact match is found.
							      ModalProject.elements.hdnProject.val($mainHdnProjectID.val());
							      ModalProject.elements.txtProject.val($mainTxtProject.val());
							    } else {
							      ModalProject.elements.hdnProject.val("");
							      ModalProject.elements.txtProject.val("");
							    }
							});

							// Assing the id to a hidden elemnt or an empty string
							ModalProject.elements.txtProject.change(function() {
								var current = ModalProject.elements.txtProject.typeahead("getActive");
								if (current) {
									// Some item from our model is active
								    if (current.name == ModalProject.elements.txtProject.val()) {
								      // This means the exact match is found.
								      ModalProject.elements.hdnProject.val(current._id);
								    } else {
								      ModalProject.elements.hdnProject.val("");
								    }
								}
							});

							// Save a project from the Bootstrap Modal or take the pre selected
							ModalProject.elements.btnSaveProject.click(function () {

								if (ModalProject.elements.hdnProject.val() == "") {
									$.ajax({
									  method: "POST",
									  url: "/project",
									  data: { txtProject : ModalProject.elements.txtProject.val() }
									}).done(function( data ) {
									    $mainTxtProject.val(data.name);
									    $mainHdnProjectID.val(data._id);
									 }).fail( function( jqXHR, textStatus, errorThrown ) {
									    alert( errorThrown );
									    console.log(textStatus + " - " + errorThrown);
									});	
								} else {
									$mainTxtProject.val(ModalProject.elements.txtProject.val());
									$mainHdnProjectID.val(ModalProject.elements.hdnProject.val());
								}
								
							});
						}

		
		};

	ModalProject.initialize($("#txtProject"), $("#hdnProjectID"));
    
});