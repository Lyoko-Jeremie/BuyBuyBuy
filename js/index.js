var app = angular.module('myApp', ['ui.bootstrap']);

app.run(
    ['$rootScope', '$http',
        function ($rootScope, $http) {
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

            $rootScope.loadingPage = {
                loaded: false,
                ok: false,
                loadEndOk: function () {
                    this.loaded = true;
                    this.ok = true;
                },
                loadEndFalse: function (response) {
                    this.loaded = true;
                    this.ok = false;
                    this.errorinfo.statusText = response.statusText;
                    this.errorinfo.statusCode = response.status;
                },
                loadTo: function () {
                    $rootScope.centerData.NowPage = "showLoading";
                    this.ok = false;
                    this.loaded = false;
                    this.errorinfo.statusText = "Unkown";
                    this.errorinfo.statusCode = "0";
                },
                errorinfo: {
                    statusText: "",
                    statusCode: 0
                }
            };

            $rootScope.user = {
                ID: 0,
                Name: "",
                Password: "",
                Logined: false,
                IsAdmin: false,
                ToLogIn: function () {

                    $rootScope.loadingPage.loadTo();
                    $http({
                        method: 'get',
                        url: 'login',
                        params: {
                            "username": this.Name,
                            "password": this.Password
                        },
                        timeout: 3000
                    }).then(function (response) {
                        console.log(response);
                        $rootScope.loadingPage.loadEndOk();
                        if ("OK" == response.statusText) {
                            var data = response.data;
                            if (0 == data.err) {
                                $rootScope.user.Logined = true;
                                $rootScope.user.IsAdmin = false;
                                $rootScope.user.ID = data.data;
                                // TODO delay
                                $rootScope.centerData.NowPage = "login_ok";
                                return;
                            }
                            $rootScope.centerData.NowPage = "login_error";
                            return;
                        }
                        $rootScope.loadingPage.loadEndFalse(response);
                        return;
                    }, function (response) {
                        console.log(response);
                        $rootScope.loadingPage.loadEndFalse(response);
                        $rootScope.user.Logined = false;
                        $rootScope.user.IsAdmin = false;
                        $rootScope.user.Password = "";
                        //if (response.status == 404) {
                        //    return;
                        //}
                        //$rootScope.centerData.NowPage = "login_error";
                    });

                    // debug
                    //this.Logined = true;
                    //this.IsAdmin = false;
                    //$rootScope.centerData.NowPage = "welcome";
                },
                ToLogOut: function () {
                    this.Logined = false;
                    this.IsAdmin = false;
                    this.Password = "";
                    this.ID = 0;
                    $rootScope.centerData.NowPage = "welcome";
                },
                ToLogNew: function () {
                    $rootScope.loadingPage.loadTo();
                    $rootScope.lognew.userName = this.Name;
                    $http({
                        method: 'get',
                        url: 'register',
                        params: {
                            'username': this.Name,
                            'password': this.Password
                        },
                        timeout: 3000
                    }).then(function (response) {
                        console.log(response);
                        $rootScope.loadingPage.loadEndOk();
                        if ("OK" == response.statusText) {
                            var data = response.data;
                            if (0 == data.err) {
                                $rootScope.lognew.ok = true;
                                $rootScope.centerData.NowPage = "lognew";
                                return;
                            }
                            $rootScope.user.Logined = false;
                            $rootScope.user.IsAdmin = false;
                            $rootScope.user.Password = "";
                            $rootScope.lognew.ok = false;
                            $rootScope.centerData.NowPage = "lognew";
                            return;
                        }
                        $rootScope.loadingPage.loadEndFalse(response);
                        return;
                    }, function (response) {
                        console.log(response);
                        $rootScope.loadingPage.loadEndFalse(response);
                        // TODO delay
                        $rootScope.lognew.ok = false;
                    });
                }
            };

            $rootScope.SearchThingsName = "";

            $rootScope.lognew = {
                ok: true,
                userName: ""
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
                // 跳转到等待页 发起请求 回调函数失败跳转回本页 成功跳转到显示页并填充数据
                $rootScope.loadingPage.loadTo();
                $http({
                    method: 'get',
                    url: 'getItemById',
                    params: {
                        "id": Obj.id
                    },
                    timeout: 3000
                }).then(function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndOk();
                    // TODO delay
                    // TODO 填充
                    $rootScope.centerData.NowPage = "showProduct";
                }, function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndFalse(response);
                    // TODO delay
                    $rootScope.centerData.NowPage = "explorer";
                });
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
    ]
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





