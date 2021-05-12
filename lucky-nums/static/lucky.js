/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault()
    const $name = $("#name").val();
    const $email = $("#email").val();
    const $year = $("#year").val();
    const $color = $("#color").val();

    const data = structureParam($name,$email,$year,$color)

    let _response = await axios.post("http://127.0.0.1:5000/api/get-lucky-num",data)

    let response = _response.data

    if (handleResponse(response)){

        if (handleNameError(response.errors)){
            $("#name-err").text(response.errors.name)
        }else{
            $("#name-err").text("")
        }

        if (handleEmailError(response.errors)){
            $("#email-err").text(response.errors.email)
        }else{
            $("#email-err").text("")
        }

        if(handleYearError(response.errors)){
            $("#year-err").text(response.errors.year)
        }else{
            $("#year-err").text("")
        }

        if(handleColorError(response.errors)){
            $("#color-err").text(response.errors.color)
        }else{
            $("#color-err").text("")
        }

    }else{
        if (handleResultOutput(response)){
            const num = response.num
            const year = response.year
            clearAllError()
            clearAllResult()
            resultTemplate(num,year)
        }
    }


    // return response.data
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    if(resp.errors){
        return true
    }else{
        return false
    }
}


$("#lucky-form").on("submit", processForm);


function structureParam(name,email,year,color){
    return {
        name : name,
        email :email,
        year : year,
        color : color
    }
}

function handleNameError(errorObject){
    if (errorObject.name){
        return true
    }else{
        return false
    }
}

function handleEmailError(errorObject){
    if (errorObject.email){
        return true
    }else{
        return false
    }
}

function handleYearError(errorObject){
    if(errorObject.year){
        return true
    }else{
        return false
    }
}

function handleColorError(errorObject){
    if(errorObject.color){
        return true
    }else{
        return false
    }
}

function handleResultOutput(response){
    if (response.num && response.year){
        return true
    }
    return false
}

function clearAllError(){
    $("#email-err").text("")
    $("#name-err").text("")
    $("#year-err").text("")
    $("#color-err").text("")
}

function clearAllResult(){
    $("#lucky-results").text("")
}

function resultTemplate(num,_year){

    const lucky_num = `<h3>Your lucky number is ${num.num}</h3><p>${num.fact}</p>`

    const year = `<h3>Your birth year ${_year.year}</h3><p>${_year.fact}</p>`

    $("#lucky-results").append(lucky_num,year)
}