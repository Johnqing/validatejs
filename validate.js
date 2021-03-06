(function( $ ) {
    'use strict';
    var methods = {
         /**
         * 执行前给类添加构造函数
         */
         init: function(options) {
             var form = this;
             if (!form.data('jqv') || form.data('jqv') == null ) {
                 options = methods._saveOptions(form, options);
             }
             return this;
         },
        /**
        *  $("#formID1").jd_validation('attach', {promptPosition : "centerRight"});
        */
        attach:function(userOptions){
            if (!$(this).is('form')) {
                return this;
            };

            var form = this;
            var options;
            if (userOptions) {
                options = methods._saveOptions(form,userOptions);
            }else{
                options = form.data('jqv');
            }

            form.bind("submit", methods._onSubmitEvent);
            return this;
        },
        /**
        *  设置信息
        */ 
        _saveOptions: function(form, options) {

             // 如果有错误信息显示
             if ($.validatePrompt){
                var allRules = $.validatePrompt.allRules;
             }
             
             $.jd_validation.defaults.allrules = allRules;

             var userOptions = $.extend(true,{},$.jd_validation.defaults,options);

             form.data('jqv', userOptions);
             return userOptions;
         },
        /**
        *  验证表单字段，显示相应提示
        */
         _validateFields: function(form) {
            var options = form.data('jqv');

            // 如果发现错误变量设置为true
            var errorFound = false;

        },
        _onSubmitEvent: function() {
            var form = $(this);
            // 获取存取数据
            var options = form.data('jqv');
            options.eventTrigger = "submit";
            console.log(form.data('jqv'));
            return false;
        }
    };
    $.fn.jd_validation = function(method) {
        var form = $(this);
        if(!form[0]) return form;  // 没有form直接弹回

        if (typeof(method) == 'string' && method.charAt(0) != '_' && methods[method]) {

            // 确认init函数被调用一次
            if(method != "showPrompt" && method != "hide" && method != "hideAll")
                methods.init.apply(form);

            return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {

            // 构造函数
            methods.init.apply(form,arguments)
             return methods.attach.apply(form);
        } else {
         console.log(method);
        }
    };
    // 全局设定
    $.jd_validation= {fieldIdCounter: 0,defaults:{
        // 验证事件
        validationEventTrigger: "blur",
        // 是否聚焦第一个错误
        focusFirstField:true,
        ajaxFormValidation: false,
        ajaxFormValidationURL: false,
        ajaxFormValidationMethod: 'get'
        }
    };
})( jQuery );