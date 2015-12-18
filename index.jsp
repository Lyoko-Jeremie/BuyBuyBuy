<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html ng-app="myApp" lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <!--//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css-->
    <link rel="stylesheet" href="js/bootstrap.min.css">
    <!--//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css-->
    <link rel="stylesheet" href="js/bootstrap-theme.min.css">
    <!--ui-bootstrap-tpls需要bootstrap-theme-->
    <!--https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js-->
    <script src="js/angular.js"></script>
    <!--angularjs-ui 为bootstrap与angularjs做的解决方案-->
    <script src="js/ui-bootstrap-tpls-0.14.3.js"></script>
    <script src="js/index.js"></script>
</head>
<body>

<!--固定头部开始-->
<header class="bg-info">

    <span>
        <!--左头部LOGO-->
        <a href="#">
            <img class=".img-responsive" src="img/BBB.png" alt="BuyBuyBuy">
        </a>
    </span>


</header>


<!--菜单栏-->
<nav ng-controller="menu" class="navbar navbar-default">
    <div class="container-fluid">
        <div class="collapse navbar-collapse">

            <!--右区-->

            <!--菜单栏-->
            <ul ng-show="user.IsAdmin && user.Logined" class="nav navbar-nav navbar-right">
                <li> <!--class="active"-->
                    <a href="#" ng-click="AdminFunc.User()">会员管理</a>
                </li>
                <li> <!--class="active"-->
                    <a href="#" ng-click="AdminFunc.Product()">产品管理</a>
                </li>
                <li> <!--class="active"-->
                    <a href="#" ng-click="AdminFunc.Check()">订单管理</a>
                </li>
            </ul>
            <ul ng-show="(!user.IsAdmin) && user.Logined" class="nav navbar-nav navbar-right">
                <!--产品搜索-->
                <li ng-show="!user.IsAdmin">
                    <form class="navbar-form navbar-right" role="search">
                        <div class="form-group">
                            <input type="text" ng-model="SearchThingsName" class="form-control" placeholder="产品搜索">
                        </div>
                        <button ng-click="UserFunc.Search()" type="submit" class="btn btn-default">搜索</button>
                    </form>
                </li>
                <li>
                    <!--占位符-->
                    <a></a>
                </li>
                <li> <!--class="active"-->
                    <a href="#" ng-click="UserFunc.Check()">购物车</a>
                </li>
                <li> <!--class="active"-->
                    <a href="#" ng-click="UserFunc.Pay()">支付</a>
                </li>
                <li> <!--class="active"-->
                    <a href="#" ng-click="UserFunc.Help()">帮助中心</a>
                </li>
            </ul>


            <!--左区-->
            <ul ng-controller="userLogin" class="nav navbar-nav navbar-left">

                <!--登录-->
                <li ng-show="!user.Logined">
                    <form class="navbar-form navbar-left" role="search">
                        <div class="form-group">
                            <input type="text" ng-model="user.Name" class="form-control" placeholder="UserName">
                            <input type="password" ng-model="user.Password" class="form-control" placeholder="Password">
                        </div>
                        <button ng-click="user.ToLogIn()" type="submit" class="btn btn-primary">登录</button>
                        <button ng-click="user.ToLogNew()" type="submit" class="btn btn-info">注册</button>
                    </form>
                </li>
                <!--登出-->
                <li ng-show="user.Logined">
                    <a href="#" ng-click="user.ToLogOut()">欢迎， {{user.Name}} 登出</a>
                </li>
            </ul>


        </div>

    </div>

</nav>
<!--固定头部结束-->

<!--中部可变区开始-->

<div class="container">

    <!--中部可变区-->
    <!--style="display: table;width: auto;margin-top: auto;margin-left: auto;"-->
    <!--<center></center>-->
    <section ng-show='centerData.NowPage=="welcome"' style="text-align: center;">
        <!--welcome page-->
        <span>
            <h1>欢迎来到BuyBuyBuy
                <small>(买断手)</small>
                商城
            </h1>
            <h3>请从左上角登录进入</h3>
        </span>
    </section>

    <section ng-show='centerData.NowPage=="login_error"' style="text-align: center;">
        <!--login error page-->
        <span>
            <h1>欢迎来到BuyBuyBuy
                <small>(买断手)</small>
                商城
            </h1>
            <h3>登陆无效</h3>
        </span>
    </section>

    <section ng-show='centerData.NowPage=="login_ok"'>
        <!--login ok page-->
        <div style="text-align: center;">
            <h1>欢迎来到BuyBuyBuy
                <small>(买断手)</small>
                商城
            </h1>
        </div>
        <div style="text-align: center;">
            <a ng-click='centerData.NowPage="explorer"'>ss</a>
        </div>
    </section>

    <section ng-show='centerData.NowPage=="lognew"' style="text-align: center;">
        <!--log new page-->
        <span>
            <h1>欢迎来到BuyBuyBuy
                <small>(买断手)</small>
                商城
            </h1>
            <h3>{{user.Name}}</h3>
            <h3 ng-show="lognew.ok">注册成功，请使用刚才的账号密码登录</h3>
            <h3 ng-show="!lognew.ok">已经被注册了，请尝试更换用户名</h3>
        </span>
    </section>

    <section ng-show='centerData.NowPage=="explorer"'>
        <!--浏览商品页-->
        <div style="text-align: center;">
            <h1>欢迎来到BuyBuyBuy
                <small>(买断手)</small>
                商城
            </h1>
        </div>
        <div>
            <dl class="row" ng-controller="ProductExplorerList">
<<<<<<< HEAD:index.jsp
            	<c:forEach items="${items}" var="va">
	                <dt class="col-md-2">
	                    <product-explorer-list-row things="${va.id }">
	
	                    </product-explorer-list-row>
	
	
	                <div>
	                    <a ng-click="explorerClick(${va.id})">
	                        <img src="${va.img}" style="height: 200px;width: 200px;" alt="${va.texts}">
	                    </a>
	                </div>
	                <div>
	                    <a ng-click="explorerClick(${va.id})">
	                        <h4>
	                            ${va.name}
	                        </h4>
	                    </a>
	                </div>
	                <div>
	                    <h4>
	                        <small>
	                            ${va.texts}
	                        </small>
	                    </h4>
	                </div>
	
	                </dt>
                </c:forEach>
=======
                <dt class="col-md-2" >

                <!--TODO 服务器实现-->
                <!--<div>-->
                <!--<a ng-click="ThisThings={{Obj}}">-->
                        <!--<img src="{{Obj.img}}" style="height: 200px;width: 200px;" alt="{{Obj.texts}}">-->
                    <!--</a>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<a ng-click="ThisThings={{Obj}}">-->
                        <!--<h4>-->
                            <!--{{Obj.name}}-->
                        <!--</h4>-->
                    <!--</a>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<h4>-->
                        <!--<small>-->
                            <!--{{Obj.texts}}-->
                        <!--</small>-->
                    <!--</h4>-->
                <!--</div>-->

                </dt>
>>>>>>> origin/Jeremie:index.html
            </dl>
        </div>
    </section>

    <section ng-show='centerData.NowPage=="showProduct"' style="text-align: center;">
        <!--商品页-->
        <div>

        </div>
    </section>
    <section ng-show='centerData.NowPage=="searchProduct"' style="text-align: center;">
        <!--搜索页-->
        <div>

        </div>
    </section>

    <section ng-show='centerData.NowPage=="help"' style="text-align: center;">
        <!--help page-->
        <span>
            <h1>欢迎来到BuyBuyBuy
                <small>(买断手)</small>
                商城
            </h1>
            <h3>请选择您的问题：</h3>
        </span>
    </section>
    
    <section ng-show='centerData.NowPage=="about"' style="text-align: center;">
        <!--about page-->
        <h2>公司简介</h2>
        <p>
			BuyBuyBuy买断手购物成立于 2005 年 11 
		月，是中国最大最专业的跨境电子商务网站。是由山东省汉邦影音技术有限公司投资成立的，是国内最早致力于跨境购物的互联网公司，中国唯一一家可以帮助客户
		免除美国消费税的商家。通过九年的努力，美国购物网成功入驻中国（上海）自由贸易试验区项目与河南保税物流中心，与众多知名商家、知名品牌建立了合作关
		系，并且在美国纽约、美国洛杉矶、美国俄勒冈等地设有分支机构。
		</p>
		<p>
			美国购物网可以代购美国品牌服饰、箱包、运动鞋、保健品、化妆品、名表首饰、户外装备、家居母婴用品、家庭影院等
		商品，相比国内专柜同品牌、同型号商品可节省高达50%的费用，还能让客户在省钱的同时买到一些国内未上市的产品。代购的商品均由美国分公司采用统一的物
		流配送——纽约全一快递，由美国发货直接寄至客户手中，无需经过国内转运。使用人民币支付，化解众多跨境购物支付难题，并为客户提供完善的售后服务，24
		小时中英文客户服务热线（400-667-7878），实现无障碍跨国购物。代购的美国商品，7-14个工作日直达客户手中，在家轻松购遍美国，足不出
		户，即可同享美国高品质生活。
		</p>
		<p>
			美国购物网秉承“全面，完善，便捷，贴心”的理念，努力为用户提供更多元化的商品、更优惠的价格、更专业的服务，为发展为最具人气、最受用户信赖的专业国际跨境电子商务集团而努力,也为营造一个和谐正规安全的跨境电子购物新环境而努力!
		</p>
    </section>


</div>


<!--中部可变区结束-->

<hr>


<!--固定底部开始-->
<footer class="bg-info .container-fluid">
    <!--固定底部-->



    <span class="row">
        <span class="col-md-1">
        </span>
        <span class="col-md-1">
            <a class="btn btn-link" href="#" ng-click='centerData.NowPage="about"'>公司简介</a>
        </span>
        <span class="col-md-1">
            <a class="btn btn-link" href="#">商城介绍</a>
        </span>
        <span class="col-md-1">
            <a class="btn btn-link" href="#">品牌理念</a>
        </span>
        <span class="col-md-1">
            <a class="btn btn-link" href="#">团队文化</a>
        </span>
        <span class="col-md-1">
            <a class="btn btn-link" href="#">关于我们</a>
        </span>
        <span class="col-md-1">
            <a class="btn btn-link" href="#">联系我们</a>
        </span>
        <span class="col-md-1">
            <a class="btn btn-link" href="#">购包常识</a>
        </span>
    </span>


</footer>
<!--固定底部结束-->

<!--开发者检查-->
<section ng-show="DebugMode">
    {{centerData.NowPage}}
</section>


</body>
</html>

