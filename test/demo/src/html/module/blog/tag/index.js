/*
 * ------------------------------------------
 * 标签列表模块实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/template/tpl',
    'util/dispatcher/module',
    'util/list/waterfall',
    'pro/module/module',
    'pro/cache/tag'
],function(_k,_e,_t1,_t2,_t3,_m,_d,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 标签列表模块
     * @class   {_$$ModuleTagList}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleTagList = _k._$klass();
    _pro = _p._$$ModuleTagList._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t1._$getTextTemplate('module-id-6')
        );
        // 0 - list box
        var _list = _e._$getByClassName(this.__body,'j-flag');
        this.__lmdl = _t3._$$ListModuleWF._$allocate({
            limit:1000,
            parent:_list[0],
            item:'jst-6-tag-list',
            cache:{klass:_d._$$CacheTag,lkey:'blog-tag'},
            onbeforelistload:this.__onLoadingShow._$bind(this),
            onemptylist:this.__onMessageShow._$bind(this,'没有标签列表！')
        });
        this.__doDelegate();
    };
    // notify dispatcher
    _t2._$regist('blog-tag',_p._$$ModuleTagList);
});