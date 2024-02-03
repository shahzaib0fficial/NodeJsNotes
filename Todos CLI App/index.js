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

async function createTodo() {
    const options = {
        path: '/',
        method: 'POST',
    }
    let todo = await takeInput("Write Your Todo : ")
    let todoData = {
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

async function readTodo() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
                if (fileData['Todos'] == '') {
                    console.log("You Won't have any Todos")
                    resolve(0)
                }
                else {
                    console.log('Your Todos are')
                    fileData['Todos'].forEach((todo, index) => {
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

async function updateTodo() {
    const fileData = await readTodo()
    if (fileData != 0) {
        let todoNumber = await takeInput("Which todo you want to update : ")
        if (todoNumber > fileData['Todos'].length || todoNumber < 1) {
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
                    'id': fileData['Todos'][todoNumber - 1]['id']
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

async function deleteTodo() {
    if (await readTodo() != 0) {
        let todoNumber = await takeInput("Which todo you want to delete : ")
        if (todoNumber > fileData['Todos'].length || todoNumber < 1) {
            console.log("Choice is out of bound")
        }
        else {
            const options = {
                path: '/',
                method: 'DELETE',
                headers: {
                    'id': fileData['Todos'][todoNumber - 1]['id']
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