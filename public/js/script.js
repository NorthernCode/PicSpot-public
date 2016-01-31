$( '#copyUrl' ).val(window.location.href);
$( '#copyBtn' ).on( "click", function( event ) {
    $( '#copyUrl' ).select();
    document.execCommand("copy");
});