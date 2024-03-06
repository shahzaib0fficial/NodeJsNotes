In this "Todo CLI App" Server can handle 6 Types of request decribed below:

1. POST on '/login' path :
    To login user send userName and password to the server. For that send POST request on '/login' along with Json object having user's userName and password.
Example in JavaScript : 
let loginInfo = {
        userName : userName,
        password : password
    }

    let loginJson = JSON.stringify(loginInfo)
    <!-- Now send that to server and server response 1 for successfully logged in and -1 if userName or password is incorrect -->

2. POST on '/signup' path :
    To save the data of user signup in the storage. For that send POST request on '/signup' along with the Json object having user's userName, firstName, lastName and password.
Example in JavaScript : 
    const userName = "someone"
    const firstName = "first"
    const lastName = "last"
    const password = "passcode"

    let signupInfo = {
        userName : userName,
        firstName : firstName,
        lastName : lastName,
        password : password
    }

    let signupJson = JSON.stringify(signupInfo)
    <!-- now send that signupJson to server and server response 1 for successfull and -1 if the userName already exists. -->

3. GET on '/' path :
    To read all todos send a GET request on '/' path and also send userName in header and it will reponds you a Json data in {"todos":[]} that format in [] brackets(Array) todos are placed one after the other every last inputed todo is at last
    Note : Make sure to parse Json before using
Example for JavaScript access : 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'username': userName
        }
    }

4. POST on '/' path :
    To add todo using this Api you should have to pass an object in JSON foam having user's data userName and todo.
Example for JavaScript sending data : 
    let todo = "My todo";
    <!-- replace "My todo" with the todo you wanna to add -->
    const userName = "user1"
    todoData = {
        userName : userName
        todo : todo
    }
    const jsonData = JSON.stringify(todoData);
    <!-- now send jsonData and if the todo is added successfully it return a string response "Todo Added Succesfully" -->

5. POST on '/update' path :
    This is used to update any todo using Api. To update pass id of todo in header you wanna to update and pass an JSON object having an updated Todo.
    If the todo is updated it response data holding a string : "Todo is updated Sucessfully"
    If the todoNumber pass is not in list it response data holding a string : "Your choice is out of bound"
Example for JavaScript sending data : 
    const options = {
                path: '/',
                method: 'PUT',
                headers: {
                    'id': idNumber
                }
            }
    let updateInfo = {
            updatedTodo: "This is updated todo at specified position"
        }
        updateInfo = JSON.stringify(updateInfo)
        <!-- and then pass updateInfo object -->

6. DELETE on '/' path :
    This is used to delete any todo from using Api. To delete pass id of todo in header you wanna to delete.
        If the todo is deleted it response data holding a string : "Todo is deleted Sucessfully"
        If the todoNumber pass is not in list it response data holding a string : "Your choice is out of bound"
Example for JavaScript sending data : 
    const options = {
                path: '/',
                method: 'DELETE',
                headers: {
                    'id': idNumber
                }
            }

Note : Make sure follow intruction described upper