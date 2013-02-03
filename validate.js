/**
* defaults.messages获取
*/
(function(win,doc,undefined){
	// 默认参数
	var defaults = {
        messages: {
            username:{
		        onFocus:"4-20位字符，可由中文、英文、数字及“_”、“-”组成",
		        succeed:"",
		        req:"请输入用户名",
		        error:{
		            beUsed:"该用户名已被使用，请使用其它用户名注册，如果您是&quot;{1}&quot;，请<a href='https://passport.360buy.com/new/login.aspx' class='flk13'>登录</a>",
		            badLength:"用户名长度只能在4-20位字符之间",
		            badFormat:"用户名只能由中文、英文、数字及“_”、“-”组成",
		            fullNumberName:"用户名不能全为数字"
		        }
		    },
		    pwd:{
		        onFocus:"6-20位字符，可使用字母、数字或符号的组合",
		        succeed:"",
		        req:"请输入密码",
		        error:{
		            badLength:"密码长度只能在6-20位字符之间",
		            badFormat:"密码只能由英文、数字及标点符号组成",
		            simplePwd:"密码太弱，有被盗风险，建议设置多种字符组成的复杂密码"
		        }
		    },
		    authcode:{
		        onFocus:"请输入图片中的字符，不区分大小写",
		        succeed:"",
		        req:"请输入验证码",
		        error:"验证码错误"
		    },
		    empty:{
		        onFocus:"",
		        succeed:"",
		        req:"",
		        error:""
		    }
        },
        callback: function(errors) {

        }
    };
    // 默认验证规则
    var validateRegExp = {
    	numericRegex : /^[0-9]+$/,
	    intege:"^-?[1-9]\\d*$", //整数
	    intege1:"^[1-9]\\d*$", //正整数
	    intege2:"^-[1-9]\\d*$", //负整数
	    num:"^([+-]?)\\d*\\.?\\d+$", //数字
	    num1:"^[1-9]\\d*|0$", //正数（正整数 + 0）
	    num2:"^-[1-9]\\d*|0$", //负数（负整数 + 0）
	    ascii:"^[\\x00-\\xFF]+$", //仅ACSII字符
	    chinese:"^[\\u4e00-\\u9fa5]+$", //仅中文
	    date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
	    email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	    letter:"^[A-Za-z]+$", //字母
	    letter_l:"^[a-z]+$", //小写字母
	    letter_u:"^[A-Z]+$", //大写字母
	    mobile:"^0?(13|15|18|14)[0-9]{9}$", //手机
	    notempty:"^\\S+$", //非空
	    password:"^.*[A-Za-z0-9\\w_-]+.*$", //密码
	    fullNumber:"^[0-9]+$", //数字
	    tel:"^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
	    url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
	    username:"^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$" //用户名
	};
    // 私有方法存放
    var strTrim = function(str){
    	return str.replace(/(^\s*)|(\s*$)/g, "");;
    };
    // 获取属性值
    var attr = function(el,name,val){
    	var i;
    	if (arguments.length>2) {
    		el.setAttribute(name,val);
    		return this;
    	};
    	if ((el.length > 0) && (el[0].type === 'radio')) {
            for (i = 0; i < el.length; i++) {
                if (el[i].checked) {
                    return el[i][name];
                }
            }
            return;
        }
        return el[name];
    };
    // 事件监听
    var attachEvent = function(el,Event,fn){
        el = el || window;
        if(el.addEventListener){
            el.addEventListener(Event,fn,false);
        }else if(el.attachEvent){
            el.attachEvent('on'+Event,fn);
        };  
    };
    var focusBind = function(){
        console.log('focusBind');
    };
    // 主体函数
    var Validate = function(formName,fields,callback){
    		this.callback = callback || defaults.callback;
    		this.fields = {};
    		this.errors = [];
    		this.form = document.forms[formName] || {};
    		this.msg = {};
    		this.handlers = {};
    		var filesLen = fields.length;
    		// 数据组织
    		for (var i = 0; i < filesLen; i++) {
    			var field = fields[i];
    			// name值和验证项目不能为空
    			if (!field.name || !field.rules) {
    				continue;
    			};
    			var fieldName = field['name'];
    			this.fields[fieldName] = {
	                name: field.name,
	                display: field.display || field.name,
	                isfocus : false || field.isfocus,
	                rules: field.rules,
	                id: null,
	                type: null,
	                value: null,
	                checked: null
	            };
    		};
    		//提交
    		this.form.onsubmit = (function(that){
    			return function(event){
    				try {
                    	return that._validate(event);
                	} catch(e) {}
    				
    			}
    		})(this);
    };
    // 方法
    var methods = {
    	_validate : function(ev){
    		this.errors = [];
    		 for (var key in this.fields) {
	            if (this.fields.hasOwnProperty(key)) {
	                var field = this.fields[key] || {},
	                    element = this.form[field.name];
	                    // 数据获取及绑定
	                if (element && element !== undefined) {
	                    field.id = attr(element, 'id');
	                    field.type = (element.length > 0) ? element[0].type : element.type;
	                    field.value = attr(element, 'value');
	                    field.checked = attr(element, 'checked');
                        if(field.isfocus){
                            attachEvent(element,'focus',focusBind);
                        }
	                }
	                // 运行
	                this._validateField(field);
	            }
	        };
    		//回调函数
    		if (typeof this.callback == "function") {
    			this.callback(this.errors,ev);
    		};
    		return false;
    	},
        _validateField : function(field){
        	var rules = field.rules.split('|'),
        	rulesLen = rules.length,
        	method = null,
        	isTrue = null;
        	if (field.rules.indexOf('required') === -1 && (!field.value || field.value === '' || field.value === undefined)) {
            	return;
        	};
        	for (var i = 0; i < rulesLen; i++) {
        		method  = rules[i];
        		if (method.indexOf('[') < 0) {
        			isTrue = this.check[method](field);
        		}else{
        			var mArry = method.split('[');
        			var mLast= mArry[1];
        			var mNum = mLast.split(']');
        			method = mArry[0];
        			isTrue = this.check[method](field,mNum[0]);
        		};
        		if (!isTrue) {
        			// 错误信息处理
                    if (method === "required") {
                        this.errors.push(defaults.messages[field.name]['req']);
                        return;
                    }
                    this.errors.push(defaults.messages[method]);
        		};     		
        	};
        	return;
        },
        // 验证
        check : {
        	required : function(field){
        		var value = field.value;
        		if (field.type == "checkbox" || field.type == "rodio") {
        			return (field.checked == true);
        		};
        		return (value!=="" && value !== null);
        	},
        	min_length: function(field, length) {
	            if (!validateRegExp.numericRegex.test(length)) {
	                return false;
	            }
	            return (field.value.length >= parseInt(length, 10));
	        },
	        max_length: function(field, length) {
	            if (!validateRegExp.numericRegex.test(length)) {
	                return false;
	            }
	            return (field.value.length <= parseInt(length, 10));
	        },
		    isUid:function (str) {
		        return new RegExp(validateRegExp.username).test(str);
		    },
		    fullNumberName:function (str) {
		        return new RegExp(validateRegExp.fullNumber).test(str);
		    },
		    isEmail:function (str) {
		        return new RegExp(validateRegExp.email).test(str);
		    },
		    isTel:function (str) {
		        return new RegExp(validateRegExp.tel).test(str);
		    },
		    isMobile:function (str) {
		        return new RegExp(validateRegExp.mobile).test(str);
		    },
		    checkType:function (element) {
		        return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
		    }

        }
    };
    Validate.prototype = methods;
    window.Validate = Validate;
})(window,document);
