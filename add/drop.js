
$('#divNewNotifications li').on('click', function() {
    $('.dropdown-toggle').html($(this).find('a').html());
    });
    $(".dropdown-menu li a").click(function(){
  
        $(".btn:first-child").html($(this).text()+' <span class="caret"></span>');
        
      });
      