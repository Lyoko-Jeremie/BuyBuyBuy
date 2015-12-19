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
                name: "4566",
                texts: "213",
                id: 45678
            }
        ];

        $rootScope.explorerClick = function (Obj) {
            console.log(Obj.id);
            // TODO 跳转到等待页 发起请求 回调函数失败跳转回本页 成功跳转到显示页并填充数据   JSONP
            $rootScope.centerData.NowPage ="showProduct";

        };


        $rootScope.AdminFunc = {};
        $rootScope.AdminFunc.User = function () {

        };
        $rootScope.AdminFunc.Product = function () {

        };
        $rootScope.AdminFunc.Check = function () {

        };


        $rootScope.UserFunc = {};
        $rootScope.UserFunc.Check = function () {

        };
        $rootScope.UserFunc.Pay = function () {

        };
        $rootScope.UserFunc.Help = function () {
            $rootScope.centerData.NowPage = "help";
        };


    }
);

//angular.module('myApp',[]).factory('UserInfoService', function () {
//
//});


app.controller('userLogin', function ($scope) {
});


app.controller('menu', function ($scope) {

});


app.controller('ProductExplorerList', function ($scope) {

});

app.controller('loginForm', function ($scope) {

});





