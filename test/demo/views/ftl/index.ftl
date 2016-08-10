<@compress>
<!DOCTYPE html>
<html>
  <head>

    <#include "/common/macro.ftl">

    <title>test</title>
    <meta charset="utf-8"/>
    <meta name="description" content="页面描述"/>
    <meta name="keywords" content="页面描述"/>

    <!-- @STYLE -->
    <@css/>
    <link href="${csRoot}index.css" rel="stylesheet" type="text/css"/>

  </head>
  <body id="www-wd-com">

    <script>
      window.mockAll = ${stringify(testarr!"error")};
      window.mock0 = ${stringify(asarr!"error")};
      window.mock1 = ${stringify(asobj!"error")};
      window.mock2 = ${stringify(testobj!"error")};
      window.mock3 = ${stringify(test!"error")};
    </script>

    <div class="g-doc">
      <div class="g-hd">
        <h1 class="m-logo">test</h1>
        <h2 class="m-title">${test!"orgin"}</h2>
      </div>
      <#noparse>
      <div class="g-bd" id="module-box"></div>
      </#noparse>
      <div class="g-bd">
        <div class="m-foot">
            test
        </div>
      </div>
      <div class="g-ft">
        <div class="m-foot">
            &nbsp;&copy;&nbsp;test
        </div>
      </div>
    </div>
    <#noparse>
    <div id="template-box" style="display:none;">
      <!-- @TEMPLATE -->
      <textarea name="html" data-src="module/tab/index.html"></textarea>
      <textarea name="html" data-src="module/layout/system/index.html"></textarea>
      <textarea name="html" data-src="module/layout/blog/index.html"></textarea>
      <textarea name="html" data-src="module/layout/blog.list/index.html"></textarea>
      <textarea name="html" data-src="module/layout/setting/index.html"></textarea>
      <textarea name="html" data-src="module/blog/tag/index.html"></textarea>
      <!-- /@TEMPLATE -->
      <!-- @MODULE -->
      <textarea name="html" data-src="module/blog/tab/index.html"></textarea>
      <textarea name="html" data-src="module/blog/list.box/index.html"></textarea>
      <textarea name="html" data-src="module/blog/list.tag/index.html"></textarea>
      <textarea name="html" data-src="module/blog/list/index.html"></textarea>
      <textarea name="html" data-src="module/setting/tab/index.html"></textarea>
      <!-- /@MODULE -->
    </div>
    </#noparse>

    <!-- Page Content Here -->

    <!-- @VERSION -->
    <script>location.config={root:'/src/html/'};</script>
    <script>
        history.auto = !0;
        window.NEJ_CONF = {root:'/res/'};
    </script>
    <script src="${nejRoot}?pro=${jsRoot}"></script>
    <script>
        NEJ.define([
            'util/dispatcher/dispatcher'
        ],function(_t){
            /* start up dispatcher */
            _t._$startup({
                rules:{
                    rewrite:{
                        '404':'/m/blog/list/',
                        '/m/blog/list/':'/m/blog/',
                        '/m/setting/account/':'/m/setting/'
                    },
                    title:{
                        '/m/blog/tag/':'日志标签',
                        '/m/blog/list/':'日志列表',
                        '/m/setting/permission/':'权限管理',
                        '/m/setting/account/':'基本资料'
                    },
                    alias:{
                        'system-tab':'/?/tab/',
                        'blog-tab':'/?/blog/tab/',
                        'blog-list-box':'/?/blog/box/',
                        'blog-list-tag':'/?/blog/tag/',
                        'blog-list':'/?/blog/list/',
                        'setting-tab':'/?/setting/tab/',

                        'layout-system':'/m',
                        'layout-blog':'/m/blog',
                        'layout-blog-list':'/m/blog/list/',
                        'layout-setting':'/m/setting',

                        'blog-tag':'/m/blog/tag/',
                        'setting-profile':'/m/setting/account/',
                        'setting-permission':'/m/setting/permission/'
                    }
                },
                modules:{
                    '/?/tab/':'module/tab/index.html',
                    '/?/blog/tab/':'module/blog/tab/index.html',
                    '/?/blog/box/':'module/blog/list.box/index.html',
                    '/?/blog/tag/':'module/blog/list.tag/index.html',
                    '/?/blog/list/':'module/blog/list/index.html',
                    '/?/setting/tab/':'module/setting/tab/index.html',

                    '/m':{
                        module:'module/layout/system/index.html',
                        composite:{
                            tab:'/?/tab/'
                        }
                    },
                    '/m/blog':{
                        module:'module/layout/blog/index.html',
                        composite:{
                            tab:'/?/blog/tab/'
                        }
                    },
                    '/m/blog/list/':{
                        module:'module/layout/blog.list/index.html',
                        composite:{
                            box:'/?/blog/box/',
                            tag:'/?/blog/tag/',
                            list:'/?/blog/list/'
                        }
                    },
                    '/m/blog/tag/':'module/blog/tag/index.html',

                    '/m/setting':{
                        module:'module/layout/setting/index.html',
                        composite:{
                            tab:'/?/setting/tab/'
                        }
                    },
                    '/m/setting/account/':'module/setting/profile/index.html',
                    '/m/setting/permission/':'module/setting/permission/index.html'
                },
                onbeforechange:function(_options){
                    var _umi = _options.path||'';
                    if (!!_umi&&
                        _umi.indexOf('/?')<0&&
                        _umi.indexOf('/m')<0)
                        _options.path = '/m'+_umi;
                }
            });
        });
    </script>
  </body>
</html>
</@compress>
