$(function(){
    $('#login-form').submit(function(){
        let data = $(this).serialize()
        loginSubmit(data)
        return false
    })



    const loginSubmit = data => {
        $.ajax({
            url: '/loginSubmit',
            type: 'post',
            data: data
        }).done(result => {
            if(result.message == 'success'){
                setTimeout(function() {
                    window.location.href = '/'
                }, 1000);
                toastr.success('Login success', '', {
                    progressBar: true,
                    timeOut: 1000,
                })
            }else if(result.message == 'no-credential'){
                toastr.error('No credential found', '', {
                    progressBar: true,
                    timeOut: 1000,
                })
            }
        })
    }
    
})