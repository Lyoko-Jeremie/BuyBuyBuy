var app = angular.module('myApp', ['ui.bootstrap']);

app.run(
    function ($rootScope) {
        $rootScope.a = "Ari Lener";
        $rootScope.logoData = {
            heightPx: 50
        };
        $rootScope.menuData = {
            topPx: $rootScope.logoData.heightPx,
            heightPx: 20
        };

        $rootScope.centerData = {
            NowPage: "welcome"
        };

        // 故障检查模式
        $rootScope.DebugMode = true;


        $rootScope.centerData.topHrPx = $rootScope.menuData.topPx + $rootScope.menuData.heightPx;
        $rootScope.centerData.topPx = $rootScope.centerData.topHrPx;
        $rootScope.centerData.heightPx = 200;
        $rootScope.centerData.downHrPx = $rootScope.centerData.heightPx + $rootScope.centerData.topPx;


        $rootScope.bottomData = {
            topPx: $rootScope.centerData.downHrPx

        };
        $rootScope.bottomData.topAbout = {
            //topPx: $rootScope.bottomData.topPx,
            line1: 20,
            line2: 20 * 2,
            line3: 20 * 3,
            line4: 20 * 4,
            line5: 20 * 5,
            line6: 20 * 6
        };
        $rootScope.bottomData.topOther = {
            line1: 0
        };


        $rootScope.user = {
            Name: "",
            Password: "",
            Logined: false,
            IsAdmin: false,
            ToLogIn: function () {
                this.Logined = true;
                this.IsAdmin = false;
                $rootScope.centerData.NowPage = "login_ok";
            },
            ToLogOut: function () {
                this.Logined = false;
                this.IsAdmin = false;
                this.Password = "";
                $rootScope.centerData.NowPage = "welcome";
            },
            ToLogNew: function () {
                // TODO
                $rootScope.centerData.NowPage = "lognew";
            }
        };

        $rootScope.SearchThingsName = "";

        $rootScope.lognew = {
            ok: true
        };
        $rootScope.exploreredThingS = [
            {
                img: "",
                name: "1233",
                texts: "213",
                id: 123456
            },
            {
                img: "",
                name: "1233",
                texts: "213",
                id: 123456
            }
        ];

        $rootScope.explorerClick = function (Thing) {
            alert(Obj.id);
        };


    }
);

//angular.module('myApp',[]).factory('UserInfoService', function () {
//
//});


app.controller('userLogin', function ($scope) {
});


app.controller('menu', function ($scope) {
    $scope.AdminFunc = {};
    $scope.AdminFunc.User = function () {

    };
    $scope.AdminFunc.Product = function () {

    };
    $scope.AdminFunc.Check = function () {

    };


    $scope.UserFunc = {};
    $scope.UserFunc.Check = function () {

    };
    $scope.UserFunc.Pay = function () {

    };
    $scope.UserFunc.Search = function () {

    };
    $scope.UserFunc.Help = function () {
        // TODO fix centerData访问不到的问题 添加service来解决
        centerData.NowPage = "help";
    };

});




app.controller('ProductExplorerList', function ($scope) {

});









