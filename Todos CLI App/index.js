const http = require('node:http')

const url = 'http://127.0.0.1:3000'

const optionsGet = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

const optionsCreate = {
    path: '/',
    method: 'POST',
}

const optionsUpdate = {
    path: '/update',
    method: 'POST',
}

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
readline.pause()

function takeInput(question) {
    return new Promise((resolve) => {
        readline.resume()
        readline.question(question, (reply) => {
            readline.pause()
            resolve(reply)
        })
    })
}

async function createTodo() {
    let todo = await takeInput("Write Your Todo : ")
    let jsonData = JSON.stringify(todo)
    return new Promise((resolve, rejects) => {
        const req = http.request(url, optionsCreate, (res) => {
            let response = ''
            res.on('data', (chunk) => {
                response += chunk
            })
            res.on('end', () => {
                console.log(response)
                resolve()
            })
        })

        req.on('error', () => {
            console.log("Got an error in Fetching")
            rejects()
        })

        req.write(jsonData)
        req.end()
    })
}

async function readTodo() {
    return new Promise((resolve, rejects) => {
        const req = http.request(url, optionsGet, (res) => {
            let response = ''
            res.on('data', (chunk) => {
                response += chunk
            })
            res.on('end', () => {
                fileData = JSON.parse(response)
                if (fileData['Todos'] == '') {
                    console.log("You Won't have any Todos")
                    resolve(0)
                }
                else {
                    console.log('Your Todos are')
                    fileData['Todos'].forEach((todo, index) => {
                        console.log(`${index + 1}. ${todo}`)
                        resolve(1)
                    })
                }
            })
        })

        req.on('error', () => {
            console.log("You got an error in Fetching")
            rejects()
        })
        req.end()
    })
}

async function updateTodo() {
    if (await readTodo() != 0) {
        let todoNumber = await takeInput("Which todo you want to update : ")
        let updatedTodo = await takeInput("Write updated todo : ")
        let updateInfo = {
            todoNumber: todoNumber,
            updatedTodo: updatedTodo
        }
        updateInfo = JSON.stringify(updateInfo)
        return new Promise((resolve) => {
            const req = http.request(url, optionsUpdate, (res) => {
                let response = ''
                res.on('data', (chunk) => {
                    response += chunk
                })
                res.on('end', () => {
                    console.log(response)
                    resolve()
                })
            })
            req.on('error', () => {
                console.log("You got an error in Updating")
            })
            req.write(updateInfo)
            req.end()
        })
    }

}

async function deleteTodo() {
    if (await readTodo() != 0) {
        let todoNumber = await takeInput("Which todo you want to delete : ")
        const optionsDelete = {
            path: '/',
            method: 'DELETE',
            headers : {
                'id' : todoNumber
            }
        } 
        return new Promise((resolve) => {           
            const req = http.request(url, optionsDelete, (res) => {
                let response = ''
                res.on('data', (chunk) => {
                    response += chunk
                })
                res.on('end', () => {
                    console.log(response)
                    resolve()
                })
            })
            req.on('error', () => {
                console.log("You got an error in Deleting")
            })
            req.end()
        })
    }
}

async function main() {
    let choice = await takeInput("Choose any one\n1. Create Todo\n2. Read Todos\n3. Update Todo\n4. Delete Todo\nPress any other key to exit\n")
    if (choice > 0 && choice < 5) {
        if (choice == 1) {
            await createTodo()
        }
        else if (choice == 2) {
            await readTodo()
        }
        else if (choice == 3) {
            await updateTodo()
        }
        else if (choice == 4) {
            await deleteTodo()
        }
        else {
            console.log("Invalid Choice")
        }
        main()
    }
    else {
        console.log('Thank you for using our Service')
    }
}

main()