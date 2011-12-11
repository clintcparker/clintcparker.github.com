
$(function() {
    var $container = $('#isoContainer')
    $('#menu').stickyfloat({ duration: 400 });
    popTechs(knolModel);
    $container.isotope({itemSelector: '.tech',
        masonry : {
          columnWidth : 120
        },
        masonryHorizontal : {
          rowHeight: 120
        },
        cellsByRow : {
          columnWidth : 240,
          rowHeight : 240
        },
        cellsByColumn : {
          columnWidth : 240,
          rowHeight : 240
        }
      });
    $container.isotope({layout:"fitRows",layoutMode:"fitRows" });
    $("#skills li a").click(function (){
        var levl = $(this).attr("href").slice(1);
        $("#skills li a").removeClass("active");
        $(this).addClass("active");
        if (levl != "allLevels") {
            $container.isotope({ filter: '.' + levl });
        } else {
            $container.isotope({ filter: '*' });
        }
    });
});
function popTechs(model) {
    var techCount = 0;    
    while (techCount < model.length) {
        var tech = model[techCount];
        $('#isoContainer').append('<div class="tech ' + tech.level + '"><h4 class="name">' + tech.name + '</h4></div>');
        techCount++;
    } 
}
var knolModel = [
    {level:"knowledgeable",name:"HTML"},
    {level:"knowledgeable",name:"JavaScript"},
    {level:"knowledgeable",name:"CSS"},
    {level:"knowledgeable",name:"JQuery"},
    {level:"knowledgeable",name:"ASP - ASP.NET"},
    {level:"knowledgeable",name:"PHP"},
    {level:"knowledgeable",name:"MS SQL"},
    {level:"knowledgeable",name:"MySQL"},
    {level:"knowledgeable",name:"LESS"},
    {level:"familiar",name:"XML"},
    {level:"familiar",name:"LINQ"},
    {level:"familiar",name:"ADO.NET"},
    {level:"familiar",name:"NodeJS"},
    {level:"familiar",name:"CouchDB"},
    {level:"proficient",name:"Windows Server 2003\/2008"},
    {level:"proficient",name:"II S 6\/7\/7.5"},
    {level:"proficient",name:"SQL Server 2005\/2008 platforms"},
    {level:"comfortable",name:"Windows"},
    {level:"comfortable",name:"UNIX"},
    {level:"comfortable",name:"Mac"}
];