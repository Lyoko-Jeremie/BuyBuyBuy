var app = angular.module('myApp', ['ui.bootstrap', 'ngCookies']);

app.run(
    ['$rootScope', '$http', '$cookies',
        function ($rootScope, $http, $cookies) {
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

                    //// debug
                    //$rootScope.user.Logined = true;
                    //$rootScope.user.IsAdmin = true;
                    //$rootScope.user.ID = 123;
                    //$rootScope.user.SaveInfoToCookie();
                    //$rootScope.centerData.NowPage = "login_ok";
                    //return;


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
                                $rootScope.user.SaveInfoToCookie();
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
                    });
                },
                ToLogOut: function () {
                    this.Logined = false;
                    this.IsAdmin = false;
                    this.Password = "";
                    this.ID = 0;
                    this.RemoveInfoCookie();
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
                        $rootScope.lognew.ok = false;
                    });
                },
                ReadInfoFromCookie: function () {
                    //JSON.parse($cookies.get("userinfo"));
                    //console.log($cookies.getAll());
                    //console.log($cookies.get("userinfo"));
                    //console.log(JSON.parse($cookies.get("userinfo")));
                    if (angular.isString($cookies.get("userinfo"))) {
                        try {
                            var ui = JSON.parse($cookies.get("userinfo"));
                            this.ID = ui.ID;
                            this.Name = ui.Name;
                            this.Password = ui.Password;
                            this.Logined = ui.Logined;
                            this.IsAdmin = ui.IsAdmin;
                            return true;
                        } catch (e) {
                            console.log(e);
                            return false;
                        }
                    }
                    return false;
                },
                SaveInfoToCookie: function () {
                    $cookies.putObject("userinfo", {
                        ID: this.ID,
                        Name: this.Name,
                        Password: this.Password,
                        Logined: this.Logined,
                        IsAdmin: this.IsAdmin
                    });
                },
                RemoveInfoCookie: function () {
                    $cookies.remove("userinfo");
                }
            };
            if (true == $rootScope.user.ReadInfoFromCookie()) {
                $rootScope.centerData.NowPage = "login_ok";
            }


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
                    price: 0,
                    id: 123456
                },
                {
                    img: "",
                    name: "4566",
                    texts: "213",
                    price: 0,
                    id: 45678
                }
            ];

            $rootScope.GetProductList = function () {
                $rootScope.loadingPage.loadTo();
                $http({
                    method: 'get',
                    url: 'getItems',
                    timeout: 3000
                }).then(function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndOk();
                    if ("OK" == response.statusText) {
                        var data = response.data;
                        if (0 == data.err) {
                            $rootScope.exploreredThingS = data.data;
                            $rootScope.centerData.NowPage = "explorer";
                            return;
                        }
                    }
                    $rootScope.loadingPage.loadEndFalse(response);
                    return;
                }, function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndFalse(response);
                    $rootScope.centerData.NowPage = "explorer";
                });
            };

            $rootScope.explorerClick = function (Obj) {
                console.log(Obj.id);
                // 跳转到等待页 发起请求 回调函数失败跳转回本页 成功跳转到显示页并填充数据
                $rootScope.loadingPage.loadTo();
                $http({
                    method: 'get',
                    url: 'getItemById',
                    timeout: 3000
                }).then(function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndOk();
                    if ("OK" == response.statusText) {
                        var data = response.data;
                        if (0 == data.err) {
                            $rootScope.NowProduct = data.data;
                            $rootScope.centerData.NowPage = "showProduct";
                            return;
                        }
                        $rootScope.centerData.NowPage = "noProduct";
                        return;
                    }
                    $rootScope.loadingPage.loadEndFalse(response);
                    return;
                }, function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndFalse(response);
                    $rootScope.centerData.NowPage = "explorer";
                });
            };


            $rootScope.NowProduct = {
                id: 0,
                name: "",
                price: 0,
                img: "",
                texts: ""
            };


            $rootScope.AdminFunc = {
                UserList: [
                    {
                        id: 123,
                        name: "123"
                    },
                    {
                        id: 456,
                        name: "456"
                    }
                ],
                ProductList: [
                    {
                        id: 123,
                        name: "123",
                        price: 123,
                        img: "img/BBB.png",
                        texts: "123"
                    },
                    {
                        id: 456,
                        name: "456",
                        price: 456,
                        img: "456",
                        texts: "456"
                    }
                ]
            };
            $rootScope.AdminFunc.User = function () {
                // TODO
                $rootScope.centerData.NowPage = "UserManager";
            };
            $rootScope.AdminFunc.UserDelete = function (User) {
                // TODO
            };
            $rootScope.AdminFunc.Product = function () {
                // TODO
                $rootScope.centerData.NowPage = "ProductManager";
            };
            $rootScope.AdminFunc.ProductEdit = function (Product) {
                $rootScope.NowProduct = Product;
                $rootScope.centerData.NowPage = "ProductEdit";
            };
            $rootScope.AdminFunc.ProductDelete = function (Product) {
                // TODO
            };
            $rootScope.AdminFunc.SaveProductEdit = function () {
                // TODO

                ////debug
                //$rootScope.centerData.NowPage = "showProduct";

            };
            $rootScope.AdminFunc.Check = function () {

            };


            $rootScope.UserFunc = {};
            $rootScope.UserFunc.Check = function () {

            };
            $rootScope.UserFunc.Pay = function () {

            };
            $rootScope.UserFunc.Search = function () {

                $rootScope.loadingPage.loadTo();
                $http({
                    method: 'get',
                    url: 'search',
                    params: {
                        "text": SearchThingsName
                    },
                    timeout: 3000
                }).then(function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndOk();
                    if ("OK" == response.statusText) {
                        var data = response.data;
                        if (0 == data.err) {
                            $rootScope.NowProduct = data.data;
                            $rootScope.centerData.NowPage = "showProduct";
                            return;
                        }
                        $rootScope.centerData.NowPage = "noProduct";
                        return;
                    }
                    $rootScope.loadingPage.loadEndFalse(response);
                    return;
                }, function (response) {
                    console.log(response);
                    $rootScope.loadingPage.loadEndFalse(response);
                    $rootScope.centerData.NowPage = "explorer";
                });
            };
            $rootScope.UserFunc.Help = function () {
                $rootScope.centerData.NowPage = "help";
            };


        }
    ]
);




