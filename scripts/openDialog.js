function openDialog(executionContext) {

        var data = {
            text: "test",
            date: new Date(),
        };

        var dialogParameters = {
            pageType: "webresource",
             webresourceName: "kh_/DialogExample/index.html",
            data: JSON.stringify(data)
        };
        
        var navigationOptions = {
            target: 2,//use 1 if you want to open page inline or 2 to open it sas dialog
            width: 400,
            height: 410,
            position: 1,
            title: "Example Dialog",
        };

        Xrm.Navigation.navigateTo(dialogParameters, navigationOptions).then(
            function (returnValue) {
                console.log(returnValue);
                //Add your processing logic here
            },
            function (e) {
                Xrm.Navigation.openErrorDialog(e);
            });        
    }