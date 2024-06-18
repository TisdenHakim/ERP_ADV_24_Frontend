/*global QUnit*/

sap.ui.define([
	"movementsmodule/controller/Movements.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Movements Controller");

	QUnit.test("I should test the Movements controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
