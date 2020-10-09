$(function () {
    getUserInfo()
    var layer = layui.layer;
    $('#btn-tuichu').on('click',function () {
        layer.confirm('是否确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href="/login.html"
            layer.close(index);
          });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        url:'/my/userinfo',
        success:function (res) {
            if (res.status !==0) {
                return layui.layer.msg('获取失败')
            }
            //渲染用户头像
            renderAvatar(res.data)
        },
    })
}
//渲染用戶頭像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎啊！'+name);

    if (user.user_pic !==null) {
       $('.layui-nav-img').show().attr('src',user.user_pic);
       $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }
}