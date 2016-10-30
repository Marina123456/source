function loadComponents() {
    var vueAva=new Vue({
        el:".containerAva",
        data: {
            slideObjs: ''
        }
    });
    var vueElem=new Vue({
        el:".containerElem",
        data:{
            slideObjs:''
        }
    });

    $.ajax({
        dataType:"json",
        url:'dataEmo.json',
        method:'GET',
        success: function(result){
            var arrk=[];
            for (item in result){
                arrk.push(result[item]);
            }
            vueAva.slideObjs=arrk;
            vueElem.slideObjs=arrk;
        },
        error: function (st,t,text) {
            alert(text);
        }

    });
    drawLine();
    //animationSmile();
}
function drawLine(){

    var lineSVG=d3
        .select('.line')
        .append('svg')
        .attr('fill','transparent')
        .attr("width", '100%')
        .attr("height", '100%');


    var countK=14;

    var vh=$(window).height();
    var mx=25; var my=0; var x=25; var y=0; var x12=5; var y12=0;

    for (var i=0; i<countK;i++){

        y12=y+vh/2;
        y+=vh;
        x12=(x12==40) ? 5 : 40;
        lineSVG.append("path")
            .attr('class', 'line_svg')
            .attr('id', 'path_'+i)// '+x12+', '+y12+',
            .attr("d",'M '+mx+', '+my +' Q '+x12+', '+y12+', '+x+', '+y);
            //.interpolate("basis");
        my=y-1;
    }

}
function animationSmile(){
    var path=anime.path('.line_svg');
    anime({
        targets: '.containerSVG div',
        delay:function(el, index) {
            return index*3000;
        },
        translateX: path,
        translateY: path,
        duration: 3000,
        loop: false,
        easing: 'linear'
    });
    console.log(path);
}
window.onscroll=function() {
    var vh=$(window).height();
    var top=document.documentElement.scrollTop;
    if (top<vh) return;

    var curent_k=Math.floor(top/vh)-1;
    if (curent_k>=12) return;
    var svgSmileTop=document.getElementById('containerSVG');
    var smile=document.getElementById('svgSmile');

    var svg = d3.select(".line svg");
    var path=svg.select('#path_'+curent_k);

    var y=top+vh/2;//vh+
    /*var t=(y-(curent_k+1)*vh)/vh;

    var d = path.attr("d"),
            dsplitted = d.split(" ");
    var x1=parseInt(dsplitted[1].split(",").toString());
    var y1=parseInt(dsplitted[2].split(",").toString());
    var x12=parseInt(dsplitted[4].split(",").toString());
    var y12=parseInt(dsplitted[5].split(",").toString());
    var x2=parseInt(dsplitted[6].split(",").toString());
    var y2=parseInt(dsplitted[7].split(",").toString());
     var x_new = (1-t)*(1-t)*x1 + 2*(1-t)*t*x12 + t*t*x2;
     //(1-t)*(1-t)*y1 + 2*(1-t)*t*y12 + t*t*y2;
    */

    var y_new =y;

    svgSmileTop.style.top=y_new+'px';
    smile.style.backgroundImage='url(img/svg/'+(curent_k+2)+'.svg)';

    var s=document.getElementById('s'+(curent_k+1));

    if (curent_k==0){
        var svgMouse=document.getElementById('svgMouse');
        var firstLeft=parseInt($('#svgMouse').css('margin-left'));
        if (firstLeft!=200){
            var secondLeft=(firstLeft+5).toString()+'px';
            $('#svgMouse').css('margin-left',secondLeft);
            document.documentElement.scrollTop=(curent_k+1)*vh;
        }
    }
    if (curent_k==1){
        var svgCloud1=document.getElementById('svgCloud1');
        var svgCloud2=document.getElementById('svgCloud2');
        var firstTop1=parseInt($('#svgCloud1').css('margin-top'));
        var firstTop2=parseInt($('#svgCloud2').css('margin-top'));
        var firstTop3=parseInt($('#svgRain').css('margin-top'));
        if (firstTop1!=top-vh*curent_k){
            /*var secondTop1=(firstTop1+3).toString()+'px';
            var secondTop2=(firstTop2+2).toString()+'px';
            var secondTop3=(firstTop3-1).toString()+'px';
            $('#svgCloud1').css('margin-top',secondTop1);
            $('#svgCloud2').css('margin-top',secondTop2);
            $('#svgRain').css('margin-top',secondTop3);*/
        }
    }

}