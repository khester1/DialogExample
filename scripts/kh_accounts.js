if (typeof (Xrm) == "undefined") {
    var Xrm = {
        __namespace: true
    };
}
if (typeof (Xrm.Scripts) == "undefined") {
    Xrm.Scripts = {
        __namespace: true
    };
}

if (typeof (Xrm.Scripts.Account) == "undefined") {
    Xrm.Scripts.Account = {
        __namespace: true
    };
}

Xrm.Scripts.Account = {
    Ribbon: {
        OpenExampleDialog: function (executionContext) {
            let data = {
                text: "test",
                date: new Date(),
            };

            let dialogParameters = {
                pageType: "webresource",
                webresourceName: "kh_/DialogExample/index.html",
                data: JSON.stringify(data)
            };
            
            let navigationOptions = {
                target: 2, 
                width: 400,
                height: 410,
                position: 1,
                title: "Example Dialog",
            };

            Xrm.Navigation.navigateTo(dialogParameters, navigationOptions).then(
                function (returnValue) {
                    console.log(returnValue);
                    // Add your processing logic here
                },
                function (e) {
                    Xrm.Navigation.openErrorDialog(e);
                }
            ); 
        }
    }
};


