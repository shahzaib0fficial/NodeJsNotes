In this "Todo CLI App" Server can handle 4 Types of request decribed below:
1. GET on '/' path :
    To read all todos send a GET request on '/' path and it will reponds you a Json data in {"Todos":[]} that format in [] brackets(Array) todos are placed one after the other every last inputed todo is at last
    Note : Make sure to parse Json before using
Example for JavaScript access : 
    const dataOfApi = JSON.parse(dataRecieveFromApi); // replace dataRecieveFromApi with the actual variable in which you store Api's data
    console.log(dataOfApi)

2. POST on '/' path :
    To add todo in this Api you should have to pass an object in JSON foam. An JSON object having a key value pair.
        todo key which have a todo string in which you store the todo in string format
Example for JavaScript sending data : 
    let todo = "My todo"; // replace "My todo" with the todo you wanna to add
    todoData = {
        todo : todo
    }
    const jsonData = JSON.stringify(todoData);
    // now send jsonData and if the todo is added successfully it return a string response "Todo Added Succesfully"

3. POST on '/update' path :
    This is used to update any todo from Api. To update pass position of todo in header you wanna to update in integer/number format and pass an JSON object having a key value pair
        updatedTodo which have a todo string in which you store the updated todo in string format
    If the todo is updated it response data holding a string : "Todo is updated Sucessfully"
    If the todoNumber pass is not in list it response data holding a string : "Your choice is out of bound"
Example for JavaScript sending data : 
    let updateInfo = {
            updatedTodo: "This is updated todo at specified position"
        }
        updateInfo = JSON.stringify(updateInfo)
        // and then pass updateInfo object

4. DELETE on '/' path :
    This is used to delete any todo from Api. To delete pass position of todo in header you wanna to delete in integer/number format.
        If the todo is deleted it response data holding a string : "Todo is deleted Sucessfully"
        If the todoNumber pass is not in list it response data holding a string : "Your choice is out of bound"
Example for JavaScript sending data : 
    const deletePosition = 1; //  replace 1 with the position you wanna to delete
    // and then pass this deletePosition in headers

Note : Make sure follow intruction described upper