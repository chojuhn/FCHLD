(function(c){c.fn.menuModel2=function(a){function m(b,d,f){c.each(b,function(l){this._type=d;this._id=l+1;this._parent=f;c(">ul>li>a",this.parentNode).size()>0&&n(c(">ul>li>a",this.parentNode).get(),3,this._id)})}function n(b,d,f){c.each(b,function(l){this._type=d;this._id=l+1;this._parent=f})}function o(b,d,f){d=RegExp(eval("/"+d+"/g"));if(d.exec(b)!=null)b=b.replace(d,f);return b}function h(b,d,f){c(">img",b).length>0&&c(">img",b).attr("src",o(c(">img",b).attr("src"),d,f))}function i(b){a.visibled&& a.visibled._id!=b._parent&&e(a.visibled);a.subVisibled&&a.subVisibled._parent!=b._id&&e(a.subVisibled);c(b).addClass(a.activeClass);a.model==1&&a.parentYN&&h(b,a.imgOff,a.imgOn);c("+ul",b).css(a.showOps);a.visibled=b}function j(b){a.subVisibled&&e(a.subVisibled);c(b).addClass(a.activeClass);a.model==1&&a.childYN&&h(b,a.imgOff,a.imgOn);c("+ul",b).css(a.showOps);a.subVisibled=b}function k(b){a.ssubVisibled&&e(a.ssubVisibled);c(b).addClass(a.activeClass);a.model==1&&a.childYN&&h(b,a.imgOff,a.imgOn); a.ssubVisibled=b}function e(b){c(b).removeClass(a.activeClass);c("+ul",b).css(a.hideOps);a.model==1&&h(b,a.imgOn,a.imgOff)}var g=c(this);a=c.extend({model:1,parentYN:true,childYN:true,defaultLightMoveYN:true,target_obj:this,visibled:"",subVisibled:"",ssubVisibled:"",activeClass:"hover",showspeed:1E3,hidespeed:0,imgOn:"_on.gif",imgOff:".gif",showOps:{"visibility":"visible"},hideOps:{visibility:"hidden"},hightLight:{level_1:0,level_1_obj:"",level_2:0,level_2_obj:"",level_3:0,level_3_obj:""}},a||{});(function(b){c.each(b, function(d){this._type=1;this._id=d+1;this._parent=-1;c(">ul>li>a",this.parentNode).size()>0&&m(c(">ul>li>a",this.parentNode).get(),2,this._id)})})(c(">li>a",g).get());(function(){g[0].getElementsByTagName("a");c.each(g[0].getElementsByTagName("a"),function(){switch(this._type){case 1:/*this.onclick=function(){i(this)};this.onfocus=function(){i(this)};break;case 2:this.onclick=function(){j(this)};this.onfocus=function(){j(this)};break;case 3:this.onclick=function(){k(this)};this.onfocus= function(){k(this)};break;*/default:break}if(this._type==1&&this._id==a.hightLight.level_1)a.hightLight.level_1_obj=this;else if(this._type==2&&this._parent==a.hightLight.level_1&&this._id==a.hightLight.level_2)a.hightLight.level_2_obj=this;else if(this._type==3&&this._parent==a.hightLight.level_2&&this._id==a.hightLight.level_3)a.hightLight.level_3_obj=this})})();(function(){if(a.hightLight.level_1){c.each(g[0].getElementsByTagName("a"),function(){e(this)});if(a.hightLight.level_1_obj){i(a.hightLight.level_1_obj); if(a.hightLight.level_2_obj){j(a.hightLight.level_2_obj);a.hightLight.level_3_obj&&k(a.hightLight.level_3_obj)}}}else c.each(g[0].getElementsByTagName("a"),function(){e(this)})})();(function(){c(a.target_obj).hover(function(){},function(){if(a.visibled){e(a.visibled);if(a.hightLight.level_1_obj){i(a.hightLight.level_1_obj);if(a.subVisibled){e(a.subVisibled);if(a.hightLight.level_2_obj){j(a.hightLight.level_2_obj);if(a.ssubVisibled){e(a.ssubVisibled);k(a.hightLight.level_3_obj)}}}}}})})()}})(jQuery);
function leftcon(){
    $("#LblockLnb li a.hasChild").each(function(){
        $(this).bind('click', function(e){
            e.preventDefault();
            if($(this).siblings('ul').is(':visible')){
                $(">ul",this.parentNode).css({display:"none"}),$(this).removeClass("hover");
            }else{
                $(">ul",this.parentNode).css({display:"block"}),$(this).addClass("hover");
            }
        });
    });

    //레프트메뉴영역 숨기기/펼치기
    $('#LnbHide').bind('click', function(e){
            e.preventDefault();
            if($('#LblockCont').is(':visible')){
                $('#LblockCont').hide();
                $('#LblockLeft, #LblockContainer').addClass('LnbNone');
            }else{
                $('#LblockCont').show();
                $('#LblockLeft, #LblockContainer').removeClass('LnbNone');
            }

            // form에 강제로 lnb display 상태를 넣어준다.
            $("form").each( function(){
                if($(this).find($("input[name=lnbHide]")).size() == 0) {
                    var o = document.createElement('input');
                    o.setAttribute('type', 'hidden');
                    o.setAttribute('name', "lnbHide");
                    o.setAttribute('value', $('#LblockCont').is(':visible'));
                    this.appendChild(o);
                } else {
                    $(this).find($("input[name=lnbHide]")).val($('#LblockCont').is(':visible'));
                }
            });


    });
}