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
    'base/event',
    'util/template/tpl',
    'util/template/jst',
    'util/dispatcher/module',
    'util/ajax/xdr',
    'pro/module/module',
    'pro/util/util'
],function(_k,_e,_v,_t0,_jst,_t1,_j,_m,Util,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleAccountProfile}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleAccountProfile = _k._$klass();
    _pro = _p._$$ModuleAccountProfile._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-c')
        );
        this.__formBox = _e._$getByClassName(this.__body, 'j-flag')[0];
        Util._$delegate(this, this.__body, {
            update: function() {
                Util._$modal();
            }
        });
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        _j._$request('/api/account/info/get', {
            type: 'json',
            method: 'GET',
            data: {},
            cookie: true,
            onload: this.__onAccountLoad._$bind(this)
        });
    };
    /**
     * 接收消息
     * @param {Object} _result
     */
    _pro.__onAccountLoad = function(_result){
        _e._$clearChildren(this.__formBox);
        _jst._$render(this.__formBox, 'module-id-c-form', _result.result);
    };
    // notify dispatcher
    _t1._$regist('setting-profile',_p._$$ModuleAccountProfile);
});
