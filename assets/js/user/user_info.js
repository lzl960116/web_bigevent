$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1~6之间！';
            }
        }
    })
    // 初始化用户信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('错了')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单
    $("#btnReset").on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    // 修改用户信息
    $('.layui-form').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function (res) {
                if (res.status !==0) {
                    return layui.layer.msg(res.message);
                }else{
                    window.parent.getUserInfo();
                }
            }
        })
        
    })
})