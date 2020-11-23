function useGeneric (value) {
    console.log("We are changing things")
    if (value) {
        document.getElementById('researcher').value = ''
        document.getElementById('researcher').disabled = true
    }
    else {
        document.getElementById('researcher').disabled = false
    }
}

function isAlphanumeric (value) {
        return /^[a-zA-Z0-9]+$/.test(value);
}

$( document ).ready(function() {
   

    window.validateLogin = function () {
        console.log("validating now!")
        //Validate Reseaarcher
        if (!$(".useGenericID").val() === 'on') {
            if (!isAlphanumeric($(".researcher").val())) {
                $('#loginAlert').text('The Researcher and Player IDs must be numeric values')
                $('#loginAlert').show()
                return false
            }
        }
        //Validate Player
        if (!isAlphanumeric($("player").val())) {
            $('#loginAlert').text('The Researcher and Player IDs must be numeric values')
            $('#loginAlert').show()
            return false
        }
    }
});