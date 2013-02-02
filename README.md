validatejs
==========

验证组件

调用方法：
var f = new Validate('form_node',[{
		name  : 'username',
		rules : 'required|min_length[8]'
	},{
		name  : 'pw',
		rules : 'required'
	}],function(error,event){
		 alert(error);
	});
