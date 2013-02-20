//验证文本
;(function($,undefined){
    $.fn.validatePrompt = function(){
    };
    $.validatePrompt = {
        newLang: function(){
            $.validatePrompt.allRules = {
                username:{
                    onFocus:"4-20位字符，可由中文、英文、数字及“_”、“-”组成",
                    succeed:"",
                    isNull:"请输入用户名",
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
                    isNull:"请输入密码",
                    error:{
                        badLength:"密码长度只能在6-20位字符之间",
                        badFormat:"密码只能由英文、数字及标点符号组成",
                        simplePwd:"密码太弱，有被盗风险，建议设置多种字符组成的复杂密码"
                    }
                },
                authcode:{
                    onFocus:"请输入图片中的字符，不区分大小写",
                    succeed:"",
                    isNull:"请输入验证码",
                    error:"验证码错误"
                },
                empty:{
                    onFocus:"",
                    succeed:"",
                    isNull:"",
                    error:""
                }
            };            
        }
    };

    $.validatePrompt.newLang();
    
})(jQuery);