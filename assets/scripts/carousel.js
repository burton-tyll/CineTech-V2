$(document).ready(function(){
    const scrollAmount = 1000; // Ajustez la quantité de défilement

    $('.gs_news_leftButton').click(function() {
        $(this).parent('.scrollable').animate({
            scrollLeft: '-=' + scrollAmount
        }, 400); // 400ms pour un effet de défilement fluide
    });

    $('.gs_news_rightButton').click(function() {
        $(this).parent('.scrollable').animate({
            scrollLeft: '+=' + scrollAmount
        }, 400); // 400ms pour un effet de défilement fluide
    });
});
