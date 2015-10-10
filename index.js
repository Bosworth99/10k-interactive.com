(function(){
	"use strict";

	var app = {
		app : '10k-interactive.com',
		version : '0.1'
	};
  	
	var Main = function(){

		var _this;

		return {

			init:function(){
				console.log('Main::init %o', this);
				_this = this;				
			}
	
		};
	}

	app.Main = new Main();
	app.Main.init();


}());