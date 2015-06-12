//get home page
//功能是調用模板解析引擎，並傳入一個對象作為參數，這個對象只有一個屬性，即即 title: 'Express'。
//index.ejs：index.ejs是模板文件，即路由/ index.js中調用的模板
//layout.ejs模板文件不是孤立展示的，默認情況下所有的模板都繼承自layout.ejs，<%- body %>部分才是獨特的內容，其他部分是共有的，可以看作是頁面框架。
//使用模板引擎：res.render，並將其產生的頁面直接返回给客户端

//Mockup
var postList = [
	{ id: 1, name: "阿亮", msg: "藍芽可以用了嗎~~" },
	{ id: 2, name: "神父", msg: "壓胸的閥值要不要再調低一點點?" },
	{ id: 3, name: "詔羽", msg: "我晚上有事 就不去了唷" }
]; 
var count = postList.length;

//檢查使用者登入狀態
var isLogin = false;
var checkLoginStatus = function(req, res){
	isLogin = false;
	if(req.signedCookies.userid && req.signedCookies.password){
		isLogin = true;
	}
};

//首頁
exports.index = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'index', {
		title : '歡迎來到專題討論區', 
		loginStatus : isLogin,
		posts : postList
	});	
};

//顯示"簡介"
exports.page2 = function(req, res){
    checkLoginStatus(req, res);
	res.render( 'page2', {
		title : '簡介',
		loginStatus : isLogin
	});	
};

//顯示"系統"
exports.page3 = function(req, res){
    checkLoginStatus(req, res);
	res.render( 'page3', {
		title : '系統',
		loginStatus : isLogin
	});	
};

//顯示"工具"
exports.page4 = function(req, res){
    checkLoginStatus(req, res);
	res.render( 'page4', {
		title : '工具',
		loginStatus : isLogin
	});	
};

//顯示"成果"
exports.page5 = function(req, res){
    checkLoginStatus(req, res);
	res.render( 'page5', {
		title : '成果',
		loginStatus : isLogin
	});	
};

//顯示"結論"
exports.page6 = function(req, res){
    checkLoginStatus(req, res);
	res.render( 'page6', {
		title : '結論',
		loginStatus : isLogin
	});	
};

//顯示"心得"
exports.page7 = function(req, res){
    checkLoginStatus(req, res);
	res.render( 'page7', {
		title : '心得',
		loginStatus : isLogin
	});	
};

//註冊頁面
exports.reg = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'reg', {
		title : '註冊',
		loginStatus : isLogin
	});
};

//執行註冊
exports.doReg = function(req, res){
	if(req.body['password-repeat'] != req.body['password']){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body['password']);
		console.log('第二次輸入的密碼：' + req.body['password-repeat']);
		return res.redirect('/reg');
	}
	else{
		//register success, redirect to index
		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};

//登入頁面
exports.login = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'login', {
		title : '登入',
		loginStatus : isLogin
	});
};

//執行登入
exports.doLogin = function(req, res){
	if(req.body['password-repeat'] != req.body['password']){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body['password']);
		console.log('第二次輸入的密碼：' + req.body['password-repeat']);
		return res.redirect('/reg');
	}
	else{
		//register success, redirect to index
		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};

//執行登出
exports.logout = function(req, res){
	res.clearCookie('userid', { path: '/' });
	res.clearCookie('password', { path: '/' });
	return res.redirect('/');
};

//發表訊息
exports.post = function(req, res){
	var element = { id: count++, name: req.signedCookies.userid, msg: req.body['post'] };
	postList.push(element);

	return res.redirect('/');	
};

//使用者頁面
exports.user = function(req, res){
	var userName = req.params.user;
	var userPosts = [];
	
	for (var i = 0; i < postList.length; i++) { 
		if(postList[i].name == userName){
			userPosts.push(postList[i]);
		}
	}
	
	checkLoginStatus(req, res);
	res.render( 'user', {
		title : userName + '的頁面',
		loginStatus : isLogin,
		posts : userPosts
	});
	
};

