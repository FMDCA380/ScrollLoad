$.fn.extend({
    scrollLoad : function(callback){
        $(window).bind('scroll',{
            'obj' : $(this),
            'callback' : callback
        }, scrollLoadTrigger);
        return $(this);
    },
    unbindScrollLoad : function(){
        $(window).unbind('scroll');
        return $(this);
    }
});

var scrollLoadTrigger = function(event){
    var data = event.data;
    var obj = data.obj;
    var url = obj.attr('_url');
    var callback = data.callback;
    if((obj.offset().top - $(window).scrollTop()) < (document.body.clientHeight() + 100)){
        //执行加载
        obj.unbindScrollLoad();
        var scrollStatus = $('.mt-scroll-status');
        //开始ajax并设置 加载中
        scrollStatus.css('display', 'none');
        $('.mt-scroll-status-loading').css('display', 'block');
        $.get(url, function(resp){
            var callbackData = callback(resp, obj);
            if(callbackData['isFinish']){
                //设置 已全部加载完毕
                scrollStatus.css('display', 'none');
                $('.mt-scroll-status-loaded').css('display', 'block');
                obj.unbindScrollLoad();
            }else{
                //设置 点击加载更多
                scrollStatus.css('display', 'none');
                $('.mt-scroll-status-more').css('display', 'block');
                obj.scrollLoad(callback);
            }
        });
    }
};
