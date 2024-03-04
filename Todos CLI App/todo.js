const http = require('node:http')

const url = 'http://127.0.0.1:3000'

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

async function createTodo(userName) {
    const options = {
        path: '/',
        method: 'POST',
    }
    let todo = await takeInput("Write Your Todo : ")
    let todoData = {
        userName: userName,
        todo: todo
    }
    let jsonData = JSON.stringify(todoData)
    return new Promise((resolve, rejects) => {
        const req = http.request(url, options, (res) => {
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

async function readTodo(userName) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'username': userName
        }
    }
    return new Promise((resolve, rejects) => {
        const req = http.request(url, options, (res) => {
            let response = ''
            res.on('data', (chunk) => {
                response += chunk
            })
            res.on('end', () => {
                fileData = JSON.parse(response)
                // console.log(fileData['todos'])
                if (fileData['todos'] == '') {
                    console.log("You Won't have any Todos")
                    resolve(0)
                }
                else {
                    console.log('Your Todos are')
                    fileData['todos'].forEach((todo, index) => {
                        console.log(`${index + 1}. ${todo['todo']}`)
                        resolve(fileData)
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

async function updateTodo(userName) {
    const fileData = await readTodo(userName)
    if (fileData != 0) {
        let todoNumber = await takeInput("Which todo you want to update : ")
        if (todoNumber > fileData['todos'].length || todoNumber < 1 || isNaN(Number(todoNumber))) {
            console.log("Choice is out of bound")
        }
        else {
            let updatedTodo = await takeInput("Write updated todo : ")
            let updateInfo = {
                updatedTodo: updatedTodo
            }
            const options = {
                path: '/',
                method: 'PUT',
                headers: {
                    'id': fileData['todos'][todoNumber - 1]['id']
                }
            }
            updateInfo = JSON.stringify(updateInfo)
            return new Promise((resolve) => {
                const req = http.request(url, options, (res) => {
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

}

async function deleteTodo(userName) {
    if (await readTodo(userName) != 0) {
        let todoNumber = await takeInput("Which todo you want to delete : ")
        if (todoNumber > fileData['todos'].length || todoNumber < 1 || isNaN(Number(todoNumber))) {
            console.log("Choice is out of bound")
        }
        else {
            const options = {
                path: '/',
                method: 'DELETE',
                headers: {
                    'id': fileData['todos'][todoNumber - 1]['id']
                }
            }
            return new Promise((resolve) => {
                const req = http.request(url, options, (res) => {
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
}

async function main(userName) {
    let choice = await takeInput("Choose any one\n1. Create Todo\n2. Read Todos\n3. Update Todo\n4. Delete Todo\nPress any other key to exit\n")
    if (choice > 0 && choice < 5) {
        if (choice == 1) {
            await createTodo(userName)
        }
        else if (choice == 2) {
            await readTodo(userName)
        }
        else if (choice == 3) {
            await updateTodo(userName)
        }
        else if (choice == 4) {
            await deleteTodo(userName)
        }
        else {
            console.log("Invalid Choice")
        }
        main(userName)
    }
    else {
        console.log('Thank you for using our Service')
    }
}

// main()

module.exports = function(userName) {
    main(userName)
};