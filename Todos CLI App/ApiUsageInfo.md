In this "Todo CLI App" Server can handle 4 Types of request decribed below:
1. GET on '/' path :
    To read all todos send a GET request on '/' path and it will reponds you a Json data in {"Todos":[]} that format in [] brackets(Array) todos are placed one after the other every last inputed todo is at last
    Note : Make sure to parse Json before using
Example for JavaScript access : 
    const dataOfApi = JSON.parse(dataRecieveFromApi); // replace dataRecieveFromApi with the actual variable in which you store Api's data
    console.log(dataOfApi)

2. POST on '/' path :
    To add todo in this Api you should have to pass a sting in JSON foam. Firstly take a todo/string you wanna to pass then convert it in Json format and the pass it
Example for JavaScript sending data : 
    const todo = "My todo"; // replace "My todo" with the todo you wanna to add
    const jsonData = JSON.stringify(todo);
    // now send jsonData and if the todo is added successfully it return a string response "Todo Added Succesfully"

3. POST on '/update' path :
    This is used to update any todo has in Api. For that pass an JSON object having two key value pairs
        1. First is todoNumber which have a number value in which you store the todo's number you wanna to update(make sure not an index -> not starts from 0 starts with 1) in integer/number format
        2. Second updatedTodo which have a todo string in which you store the updated todo in string format
    If the todo is updated it response data holding a string : "Todo is updated Sucessfully"
    If the todoNumber pass is not in list it response data holding a string : "Your choice is out of bound"
Example for JavaScript sending data : 
    let updateInfo = {
            todoNumber: 1, // replace 1 with the position you wanna to delete
            updatedTodo: "This is updated todo at first position"
        }
        updateInfo = JSON.stringify(updateInfo)
        // and then pass updateInfo object

4. DELETE on '/' path :
    This is used to delete any todo from Api. To delete pass position of todo in header you wanna to delete(make sure not an index -> not starts from 0 starts with 1) in integer/number format.
        If the todo is deleted it response data holding a string : "Todo is deleted Sucessfully"
        If the todoNumber pass is not in list it response data holding a string : "Your choice is out of bound"
Example for JavaScript sending data : 
    const deletePosition = 1; //  replace 1 with the position you wanna to delete
    // and then pass this deletePosition in headers

Note : Make sure follow intruction described upper