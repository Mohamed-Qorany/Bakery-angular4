$(document).ready(function() {
    // MaterializeCss Initializations
    $('select').material_select();
    $(".button-collapse").sideNav();
    $('select').material_select();
    $('ul.tabs').tabs();
    $('.dropdown-button').dropdown();
    $('.collapsible').collapsible();

    //close domainous List on Click Outside
    $(document).click(function(event) {
        if(!$(event.target).closest('.dominosBtn').length) {$('.listViewDropDown').slideUp('fast');}
        if(!$(event.target).closest('.gridCard').length) {$('.revealCloseBtn').click();}
    });
});



function showDominos(index, viewType){
    if(viewType !='grid'){
        var newindex = index.charAt(1);
        $('#listDominos'+newindex).fadeIn('fast');
    }else{
        $('#cardDominos'+index).fadeIn('fast');
        $('.card .card-action#cardAction'+index).css({"background": "#E8F1FA", "color": "#5F9FDF"});
    }
}
function hideDominos(index, viewType){
    if(viewType !='grid'){
        var newindex = index.charAt(1);
        $('#listDominos'+newindex).fadeOut('fast');
    }else{
        $('#cardDominos'+index).fadeOut('fast');
        $('.card .card-action#cardAction'+index).css({"background": "#fff", "color": "#222"});
    }
}
function openListDropDown(currntItem){
    var index = currntItem.charAt(currntItem.length - 1);
    $('.listViewDropDown').slideUp('fast');
    $('#listViewDropDown'+index).slideToggle('fast');
}