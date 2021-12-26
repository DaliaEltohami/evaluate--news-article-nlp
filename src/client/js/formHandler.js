// handler that will run when form submit event occure

const handleSubmit = (event) => {
    // prevent default action of submit event
    event.preventDefault()
    // get the url text that the user input
    const URL = document.getElementById("name").value
    // check it this URL is valid using checkForURL function that we wil access through Client library
    const valid = Client.checkForURL(URL)
    // check for tha value of valid if true post the url to the server route else show alert to user 
    if(valid){
        alert("ok")
    }else{
        alert("Please Enter Valid URL!!")
    }

}

// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     Client.checkForURL(formText)

//     console.log("::: Form Submitted :::")
//     fetch('http://localhost:8081/test')
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('result1').innerHTML = res.message
//     })
// }



export { handleSubmit }
