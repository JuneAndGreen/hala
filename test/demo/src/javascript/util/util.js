/**
 * 通用接口实现文件
 *
 * @Author  hzxiejin
 */
NEJ.define([
    'base/element',
    'base/event',
    'base/util',
    'util/template/tpl'
],function(e,v,u,tpl,p){
    /**
     * 代理容器点击行为
     * @param  {Object} scope  - 作用域
     * @param  {Node}   parent - 容器节点
     * @param  {Object} config - 配置信息
     */
    p._$delegate = function(scope,parent,config){
        v._$addEvent(
            parent,'click',function(event){
                // check action
                var node = v._$getElement(event,'action');
                if (!node){
                    return;
                }
                // do action
                var action = e._$dataset(node,'action'),
                    func = (config||{})[action];
                if (u._$isFunction(func)){
                    func.call(scope||this,node,event);
                }
            }
        );
    };

    /**
     * 弹窗
     */
    p._$modal = function(){
        var modal = window.modal;
        if(!modal) {
            modal = e._$create('div', 'm-modal f-dn', document.body);
            modal.innerHTML = '<div class="mask"></div>\
            <div class="alert">\
                <div class="alert_info">目前暂未支持此功能</div>\
                <div class="alert_btn">\
                    <button class="u-btn" data-action="close" type="button">关闭</button>\
                </div>\
            </div>';
            window.modal = modal;
            p._$delegate(window, modal, {
                close: function() {
                    e._$addClassName(modal, 'f-dn');
                }
            });
        }

        e._$delClassName(modal, 'f-dn');
    };

});