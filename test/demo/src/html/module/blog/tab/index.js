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
    'util/tab/view',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module'
],function(_k,_e,_t0,_t1,_t2,_m,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 标签列表模块
     * @class   {_$$ModuleBlogTagTab}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleBlogTagTab = _k._$klass();
    _pro = _p._$$ModuleBlogTagTab._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t1._$getTextTemplate('module-id-7')
        );
        this.__tbview = _t0._$$TabView._$allocate({
            list:_e._$getChildren(this.__body)
        });
        this.__doDelegate();
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        this.__tbview._$match(
            this.__doParseUMIFromOpt({
                href: location.pathname
            })
        );
    };
    // notify dispatcher
    _t2._$regist('blog-tab',_p._$$ModuleBlogTagTab);
});