/*
 * ------------------------------------------
 * 项目模块基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module'
],function(_k,_e,_t0,_t1,_m,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLayoutBlogList}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleLayoutBlogList = _k._$klass();
    _pro = _p._$$ModuleLayoutBlogList._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-l2')
        );
        // 0 - box select
        // 1 - class list box
        // 2 - tag list box
        // 3 - sub module box
        var _list = _e._$getByClassName(this.__body,'j-flag');
        this.__export = {
            box:_list[0],
            clazz:_list[1],
            tag:_list[2],
            list:_list[3],
            parent:_list[3]
        };
    };
    // notify dispatcher
    _t1._$regist('layout-blog-list',_p._$$ModuleLayoutBlogList);
});
