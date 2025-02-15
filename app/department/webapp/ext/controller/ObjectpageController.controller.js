sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var objfinalUrl;
	var hidden = false;
	return ControllerExtension.extend('department.ext.controller.ObjectpageController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf department.ext.controller.ObjectpageController
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				debugger
				
			},
			routing:{
				onBeforeBinding: async function (oParameter) {
					debugger
					try {
						debugger
						let objPath=oParameter.sPath.substring(1);
						let mailId = new sap.ushell.services.UserInfo().getEmail();
						let baseUri =this.base.getModel().getServiceUrl();
						objfinalUrl = baseUri+objPath;
						baseUri += `auth?$filter=Id eq '${mailId}'` ;

						function pr(baseUri,objfinalUrl) {
							return new Promise(async resolve => {
								await $.ajax({
									url: baseUri,
									type: 'GET',
									success: async function(res) {
										debugger
										var dept = res.value[0].Username;
										await $.ajax({
											url: objfinalUrl,
											type: 'GET',
											success: function(res) {
												debugger
												if(res.Deptname != dept){
													debugger
													hidden = true;
												}else{
													hidden = false;
												}

												resolve();
												console.log(res);	
											}
										});
										console.log(res);	
									}
		
								});	
							});
						}
						
						let promisee = await pr(baseUri,objfinalUrl);
						this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.setVisible(!hidden);
						console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah");
					} catch (error) {
						debugger
					}
				
				},
				onAfterBinding: function (oParameter) {
					debugger
				}
			}
		}
	});
});
