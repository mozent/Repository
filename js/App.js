
$( document ).ready(function() {
    console.log( "ready!" );
    $(".Buttonid_1").each(function () {
        $(this).on('click', function () {    
            // Do something useful on each click
            console.log($(this).attr("id"));
            let msg = 99;
            console.log('Clicked! ${msg}');
          });
        
    });
    
    console.log("end...");
    // $("#id_1").click(function(){
    //     var elmId = $("#id_2").attr("id");
    //     alert(elmId);
        
    // });
});