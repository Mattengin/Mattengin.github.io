$('.it').mousemove(function(e){
    var moveX = (e.pageX * 1/120);
    var moveY = (e.pageY * 1/120);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px ')
})