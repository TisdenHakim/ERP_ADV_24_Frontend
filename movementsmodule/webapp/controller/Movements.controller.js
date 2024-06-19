sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/f/library", // Add DateFormat module
  ],
  function (Controller, DateFormat, fioriLibrary) {
    "use strict";

    return Controller.extend("movementsmodule.controller.Movements", {
      onInit: function () {
        // Initialization logic can be added here if needed
      },

      formatDate: function (dateString) {
        if (!dateString) {
          return "";
        }
        var oDateFormat = DateFormat.getDateInstance({
          pattern: "dd.MM.yyyy", // Adjust the date pattern as per your requirement
        });
        var oDate = new Date(dateString);
        return oDateFormat.format(oDate);
      },

      onListItemPress: function () {
        var oFCL = this.oView.getParent().getParent();

        oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
      },

      // Define other controller methods as needed
    });
  }
);
