//Current url to copt url text field
$( '#copyUrl' ).val(window.location.href);

//Copy to clipboard
$( '#copyBtn' ).on( "click", function( event ) {
    $( '#copyUrl' ).select();
    document.execCommand("copy");
});

//Auto upload file
$( '#fileUpload' ).change(function() {
    $( '#uploadForm' ).submit();
});