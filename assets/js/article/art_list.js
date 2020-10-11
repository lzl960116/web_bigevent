$(function () {
    template.defaults.imports.dateFormat = function (dtStr) {
        const dt = new Date(dtStr);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getUTCDate())
        var hh = padZero(dt.getUTCHours())
        var mm = padZero(dt.getUTCMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 补零
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义查询参数
    var q = {
        pagenum: 1, // 页码值
        pagesize: 2, //每页显示多少数据
        cate_id: '', //分类id
        state: '' //分类状态
    }

    initArtList();
    // 获取
    function initArtList() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败')
                }
                var str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }

    //查找
    var form = layui.form;
    initCate();

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                var str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)
                form.render();
            }
        })
    }
    //筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();

        var state = $('[name=state]').val();
        var cate_id = $('[name=cate_id]').val();
        q.state = state;
        q.cate_id = cate_id;
        initArtList();
    })
    // 渲染分页
    var laypage = layui.laypage

    function renderPage(t) {
        laypage.render({
            elem: 'pageBox', //渲染到那
            count: t, //总数
            limit: q.pagesize, //每页几条
            curr: q.pagenum, //第几页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //oj 里包含了所有参数  first是判断是否页面刚打开第一次渲染

                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    //初始化
                    initArtList();
                }
            }
        })
    }
    var layer = layui.layer
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    //删除按钮的个数$('.btn-delete').length
                    if ($('.btn-delete').length === 1 && q.pagenum > 1) q.pagenum--
                    layer.close(index)
                    initArtList();
                }
            })
        })
    })
})