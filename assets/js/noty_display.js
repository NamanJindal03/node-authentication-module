function noty_success(message){
    new Noty({
        theme: 'relax', 
        text: message,
        type:'success',
        layout: 'topRight',
        timeout: 1500

    }).show();
}

function noty_error(message){
    new Noty({
        theme: 'relax', 
        text: message,
        type:'error',
        layout: 'topRight',
        timeout: 1500

    }).show();
}