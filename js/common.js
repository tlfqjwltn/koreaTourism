$('document').ready(function(){

// gnb
    $('#gnb li').hover(function(){
        $(this).children('div').fadeIn();
        $(this).children('a').addClass('on');
    }, function(){
        $(this).children('div').fadeOut();
        $(this).children('a').removeClass('on');
    });




// tab메뉴
    $('.tab ul li').click(function(e){
        e.preventDefault();
        $('.tab li a').removeClass('on');
        $(this).children('a').addClass('on');
        $('.tab div').fadeOut(0);
        let tg = $(this).children('a').attr('href');
        $(tg).fadeIn();
    });




    let i = 0;
    let timing = 2000;
    let $slider = $('.slider');
    let panelAni = false;
    let timer;
    let $navi = $('.nav1 li');
    let num = $navi.length;

    doNext(0);
    start(i);
    // prevSlide 함수
    function prevSlide(i){
        $('.panel>li').not('.on').css('left','-100%');
        $('.panel>li.on').stop().animate({'left':'100%'},300,function(){
            $(this).removeClass('on');
        });
        $('.panel>li').eq(i).stop().animate({'left':'0%'},300,function(){
            $(this).addClass('on');
            panelAni=false;
        });
    };

    // nextSlide함수
    function nextSlide(i){
        $('.panel>li').not('.on').css('left','100%');
        $('.panel>li.on').stop().animate({'left':'-100%'},300,function(){
            $(this).removeClass('on');
        });
        $('.panel>li').eq(i).stop().animate({'left':'0%'},300,function(){
            $(this).addClass('on');
            panelAni=false;
        });
    };
    
    // btn함수

    function activeBtn(i){
        $('.nav1>li>a').removeClass('on');
        $navi.eq(i).children('a').addClass('on');
    }

    // prev 묶음
    function doPrev(i){
        if(!panelAni){
            panelAni=true;
            prevSlide(i);
            activeBtn(i);
            $('.panel>li').delay(700).eq(i).children('.panelBack').animate({'left':'-20px','bottom':'-20px','opacity':'0'},0).animate({'left':'0','bottom':'0','opacity':'1'},500);
        };
    };
    
    // next 묶음
    function doNext(i){
        if(!panelAni){
            panelAni=true;
            nextSlide(i);
            activeBtn(i);
            $('.panel>li').delay(700).eq(i).children('.panelBack').animate({'left':'-20px','bottom':'-20px','opacity':'0'},0).animate({'left':'0','bottom':'0','opacity':'1'},500);
        };
    };

    // btn클릭 함수
    $navi.click(function(e){
        let btnNum = $('.panel>li.on').index();
        i = $(this).index();
        if(i>btnNum){
            doNext(i);
        } else{
            doPrev(i);
        }
    })
    
    // autoPlay 함수
    function start(i){
        timer = setInterval(function silderAuto(){
            if(i==num-1){
                i=0;
            } else{
                i++;
            }
            doNext(i);
        },timing);
    }
    $slider.hover(function(){
        clearInterval(timer);
    },function(){
        start(i);
    });
});