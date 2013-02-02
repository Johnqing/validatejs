validatejs
==========

验证组件

调用方法：
var f = new Validate('form_node',[{<br>
		name  : 'username',<br>
		rules : 'required|min_length[8]'<br>
	},{<br>
		name  : 'pw',<br>
		rules : 'required'<br>
	}],function(error,event){<br>
		 alert(error);<br>
	});<br>
