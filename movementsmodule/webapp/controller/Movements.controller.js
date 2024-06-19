sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/f/library",
    "sap/ui/Device",
    "sap/f/library",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter", // Add DateFormat module
  ],
  function (
    Controller,
    DateFormat,
    fioriLibrary,
    Device,
    Sorter,
    Fragment,
    Filter
  ) {
    "use strict";

    return Controller.extend("movementsmodule.controller.Movements", {
      onInit: function () {
        // Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
        this._mViewSettingsDialogs = {};
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
      handleSortButtonPressed: function () {
        this.getViewSettingsDialog("movementsmodule.fragments.sortDialog").then(
          function (oViewSettingsDialog) {
            oViewSettingsDialog.open();
          }
        );
      },
      getViewSettingsDialog: function (sDialogFragmentName) {
        var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

        if (!pDialog) {
          pDialog = Fragment.load({
            id: this.getView().getId(),
            name: sDialogFragmentName,
            controller: this,
          }).then(function (oDialog) {
            if (Device.system.desktop) {
              oDialog.addStyleClass("sapUiSizeCompact");
            }
            return oDialog;
          });
          this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
        }
        return pDialog;
      },
      handleSortDialogConfirm: function (oEvent) {
        var oTable = this.byId("movementTable"),
          mParams = oEvent.getParameters(),
          oBinding = oTable.getBinding("items"),
          sPath,
          bDescending,
          aSorters = [];

        sPath = mParams.sortItem.getKey();
        bDescending = mParams.sortDescending;
        aSorters.push(new Sorter(sPath, bDescending));

        // apply the selected sort and group settings
        oBinding.sort(aSorters);
      },
      handleFilterDialogConfirm: function (oEvent) {
        var oTable = this.byId("movementTable"),
          mParams = oEvent.getParameters(),
          oBinding = oTable.getBinding("items"),
          aFilters = [];

        mParams.filterItems.forEach(function (oItem) {
          let sPath = oItem.getParent().getKey(),
            sOperator = "EQ",
            sValue1 = oItem.getKey(),
            oFilter = new Filter(sPath, sOperator, sValue1);
          aFilters.push(oFilter);
        });

        // apply filter settings
        oBinding.filter(aFilters);

        // update filter bar
        // this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
        // this.byId("vsdFilterLabel").setText(mParams.filterString);
      },

      // Define other controller methods as needed
    });
  }
);
