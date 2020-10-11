$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url:'/my/article/cates',
            success:function (res) {
                if (res.status !==0) {
                    return layui.layer.msg('失败!')
                }
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 显示文章分类列表
    var layer = layui.layer;
    $('#btnAddCate').on('click',function () {
        indexAdd=layer.open({
            type:1,
            title:'添加文章分类',
            area:['500px','260px'],
            content:$('#dialog-add').html(),
        })
    })
    // 提交文章分类
    var indexAdd=null;
    $('body').on('submit','#form-add',function (e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg('添加成功')
                layer.close(indexAdd)
            }
        })
    })
  // 修改
  var indexEdit = null;
  var form = layui.form;
  $('tbody').on('click', '.btn-edit', function() {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })

    var Id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + Id,
      success: function(res) {
        form.val('form-edit', res.data)
      }
    })
  })
   

//   更新
$('body').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
          method: 'POST',
          url: '/my/article/updatecate',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新分类数据失败！')
            }
            layer.msg('更新分类数据成功！')
            layer.close(indexEdit)
            initArtCateList()
          }
    })
})
// 删除
$('tbody').on('click', '.btn-delete', function() {
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
})
})


