const deleteBtn = document.querySelectorAll('.fa-trash') //creating a variable and assigning it to a selection of all elements with a class of the trach can
const item = document.querySelectorAll('.item span') //creating a variable and assigning it to a selection of span tags inside of a parent that has a class of "item"
const itemCompleted = document.querySelectorAll('.item span.completed') //creating a variable and assigning it to a selection of spans tags with a class "completed" inside of a parent that has a class "item"

Array.from(deleteBtn).forEach((element)=>{ // creating an array from our selection and starting a loop 
    element.addEventListener('click', deleteItem) // add an event listener to the current item that waits for a click and calls a function called "deleteItem"
}) // close our loop

Array.from(item).forEach((element)=>{ //creating an array from our selection and starting a loop
    element.addEventListener('click', markComplete) // add an event listener to the current item that waits for a click and calls a function called "markComplete"
})

Array.from(itemCompleted).forEach((element)=>{ //creating an array from our selection and starting a loop
    element.addEventListener('click', markUnComplete) // adds an event listener to only completed items
}) // close our loop

async function deleteItem(){ // declaring an asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText // looks inside of the list item and grabs only the inner text withing the list span
    try{ //starting a try block to do something
        const response = await fetch('deleteItem', { // declaring a response variable that waits on a fetch to get data from the result of the deleteItem route
            method: 'delete', // sets the CRUD method for the route
            headers: {'Content-Type': 'application/json'}, // specifying the type of content expected which is JSON
            body: JSON.stringify({ // declare the message content beign passed, and stringify that content
              'itemFromJS': itemText // setting the content of the body to the inner text of the list item and naming it itemFromJs
            }) // closing the body
          }) // closing the object
        const data = await response.json() // waiting on JSON from the response to be converted
        console.log(data) // log the result to the console 
        location.reload() // reloads the page to update what is displayed

    }catch(err){ //if an error occurs, pass the error into the catch block
        console.log(err) // log error to the console
    } // close the catch block
} // function end

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}