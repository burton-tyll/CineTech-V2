function initPagination(page, url){
    //Pagination
    const pagination = $('.pagination');
    let buttons = $('.pagination').find('.page-link');

    //Au chargement de la page on charge la pagination
    buttons.eq(1).attr('id', page).text(page)
    buttons.eq(2).attr('id', page + 1).text(page + 1);
    buttons.eq(3).attr('id', page + 2).text(page + 2);
    buttons.eq(4).attr('id', page + 3).text(page + 3);


    //Au clic du bouton
    buttons.on('click', function(){
        let button = $(this);
        let newPage = button.attr('id');
        let firstButton = buttons.eq(1);
        let firstPage = parseInt(firstButton.attr('id'));
        let lastButton = buttons.eq(-2);
        let lastPage = parseInt(lastButton.attr('id'));

        if (newPage === 'next'){
            let nextPage = parseInt(page+10);
            url.searchParams.set('page', nextPage);
            window.location.href = url.toString();
        }else if (newPage === 'previous'){
            let previousPage = parseInt(page-10);
            url.searchParams.set('page', previousPage);
            window.location.href = url.toString();
        }else{
            url.searchParams.set('page', newPage);
            window.location.href = url.toString();
        }
    })
}

export default initPagination;
    