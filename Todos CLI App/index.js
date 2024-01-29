const fs = require('node:fs')

// npm install readline-sync
const readlineSync = require('readline-sync')

function fileReader() {
    try {
        let fileId = fs.openSync('todos.json', 'a+')
        let jsonData = fs.readFileSync(fileId, 'utf8')
        if (jsonData == '') {
            fs.writeFileSync(fileId, '{"Todos":[]}')
            jsonData = fs.readFileSync('todos.json', 'utf8')
        }
        let data = JSON.parse(jsonData)
        fs.close(fileId)
        return data
    } catch (err) {
        return 'Error in opening Todos'
    }
}

function fileWriter(jsonData){
    try{
        fs.writeFileSync('todos.json',jsonData)
    }catch(err){
        console.log("Error in writing file")
    }
}

function createTodo(){
    let todo = readlineSync.question("Write Your Todo : ")
    let fileData = fileReader()
    fileData['Todos'].push(todo)
    let jsonData = JSON.stringify(fileData)
    fileWriter(jsonData)
    console.log('Todo added Sucessfully')
}

function readTodo(){
    fileData = fileReader()
    if(fileData['Todos'] == '')
    {
        console.log("You Won't have any Todos")
    }
    else{
        console.log('Your Todos are')
        fileData['Todos'].forEach((todo,index) => {
            console.log(`${index+1}. ${todo}`)
        });
    }
}

function updateTodo(){
    fileData = fileReader()
    if(fileData['Todos'] == '')
    {
        console.log("You Won't have any Todos")
    }
    else{
        readTodo()
        let todoNumber = readlineSync.question("Which todo you want to update : ")
        let found = 0
        let array = fileData['Todos'].map((todo,index)=>{
            if(index == todoNumber-1){
                todo = readlineSync.question("Write updated todo : ")
                found++
            }
            return todo
        })
        if(found != 0){
            fileData['Todos'] = array
            let jsonData = JSON.stringify(fileData)
            fileWriter(jsonData)
            console.log("Todo is updated Sucessfully")
        }
        else{
            console.log("Your choice is out of bound")
        }
    }
}

function deleteTodo(){
    fileData = fileReader()
    if(fileData['Todos'] == '')
    {
        console.log("You Won't have any Todos")
    }
    else{
        readTodo()
        let todoNumber = readlineSync.question("Which todo you want to delete : ")
        let found = 0
        let array = fileData['Todos'].filter((todo,index)=>{
            if(index == todoNumber-1){
                found++
            }
            else{
                return todo
            }
        })
        if(found != 0){
            fileData['Todos'] = array
            let jsonData = JSON.stringify(fileData)
            fileWriter(jsonData)
            console.log("Todo is Deleted Sucessfully")
        }
        else{
            console.log("Your choice is out of bound")
        }
    }
}

function takeInput(){
    let choice = readlineSync.question('Choose any one\n1. Create Todo\n2. Read Todos\n3. Update Todo\n4. Delete Todo\nPress any other key to exit\n')
    if(choice>0 && choice<5){
        if(choice == 1){
            createTodo()
        }
        else if(choice == 2)
        {
            readTodo()
        }
        else if(choice == 3){
            updateTodo()
        }
        else if(choice == 4){
            deleteTodo()
        }
        else{
            console.log("Invalid Choice")
        }
        takeInput()
    }
    else{
        console.log('Thank you for using our Service')
    }
}
takeInput()