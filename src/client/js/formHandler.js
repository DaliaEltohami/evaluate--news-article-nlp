// handler that will run when form submit event occure

const handleSubmit = async(event) => {
    // prevent default action of submit event
    event.preventDefault()
    // get the url text that the user input
    const URL = document.getElementById("name").value
    // check it this URL is valid using checkForURL function that we wil access through Client library
    const valid = Client.checkForURL(URL)
    // check for tha value of valid if true post the url to the server route else show alert to user 
    if(valid){
        // post the url address to the server route that will call the meaningCloud API
        try{
            // make post request
            const response = await fetch('http://localhost:8081/call-api',{
                method : 'post',
                credentials : 'same-origin',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({url : URL})
            });
            // receive the returned data from the server and convert it to json
            const data = await response.json()
            // uodate the view with the returned data by setting the innerHTML property of the place holders in DOM
            document.getElementById('result1').innerHTML = `<p>text : ${data.text}</p>`;
            document.getElementById('result2').innerHTML = `<p>score tag : ${data.score_tag}</p>`;
            document.getElementById('result3').innerHTML = `<p>subjectivity : ${data.subjectivity}</p>`;
            document.getElementById('result4').innerHTML = `<p>confidence : ${data.confidence}</p>`;
            document.getElementById('result5').innerHTML = `<p>agreement : ${data.agreement}</p>`;
            document.getElementById('result6').innerHTML = `<p>irony : ${data.irony}</p>`;

        }
        catch(error){
            console.log('error',error);
        }
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
