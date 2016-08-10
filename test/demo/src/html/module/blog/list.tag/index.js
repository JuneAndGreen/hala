/*
 * ------------------------------------------
 * 日志类别模块实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/tab/view',
    'util/template/tpl',
    'util/template/jst',
    'util/dispatcher/module',
    'pro/module/module',
    'pro/cache/tag'
],function(_k,_e,_t0,_t1,_t2,_t3,_m,_d,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 日志类别模块对象
     * 
     * @class   {_$$ModuleBlogListTag}
     * @extends {_$$Module}
     * 
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     * 
     */
    _p._$$ModuleBlogListTag = _k._$klass();
    _pro = _p._$$ModuleBlogListTag._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t1._$getTextTemplate('module-id-4')
        );
        // 0 - class list box
        var _list = _e._$getByClassName(this.__body,'j-flag');
        this.__listBox = _list[0];
        this.__cache = _d._$$CacheTag._$allocate({
            onlistload: this.__onListLoad._$bind(this)
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
        this.__tid = _options.param.tid;

        // get tag list
        this.__cache._$getList({
            key: 'blog-tag',
            data: {}
        });
    };
    /**
     * 获取列表回调
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onListLoad = function() {
        // - build tag list
        _t2._$render(
            this.__listBox,'jst-4-tag-list',
            {xlist:this.__cache._$getListInCache('blog-tag')}
        );

        if(this.__tbview) this.__tbview = this.__tbview._$recycle();
        this.__tbview = _t0._$$TabView._$allocate({
            list:_e._$getByClassName(this.__listBox,'j-list')
        });
        this.__tbview._$match('/blog/?tid=' + this.__tid);
    };
    // notify dispatcher
    _t3._$regist('blog-list-tag',_p._$$ModuleBlogListTag);
});
