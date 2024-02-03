const http = require("node:http")
const fs = require("node:fs")
const crypto = require("node:crypto")
// console.log("ID : ",crypto.randomBytes(16).toString('hex'))

const hostName = '127.0.0.1'
const port = '3000'

function fileReader() {
    try {
        let fileId = fs.openSync('todos.json', 'a+')
        let jsonData = fs.readFileSync(fileId, 'utf8')
        if (jsonData == '') {
            fs.writeFileSync(fileId, '{"Todos":[]}')
            jsonData = fs.readFileSync('todos.json', 'utf8')
        }
        fs.closeSync(fileId)
        return jsonData
    } catch (err) {
        return 'Error in opening Todos'
    }
}

function fileWriter(jsonData) {
    try {
        fs.writeFileSync('todos.json', jsonData)
    } catch (err) {
        console.log("Error in writing file")
    }
}

const server = http.createServer((req, res) => {
    if (req.method == 'GET' && req.url == '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        let jsonData = fileReader()
        res.end(jsonData)
    }
    else if (req.method == 'POST' && req.url == '/') {
        let userData = ''
        req.on('data', (chunk) => {
            userData += chunk
        })
        let jsonData = fileReader()
        let data = JSON.parse(jsonData)
        req.on('end', () => {
            userData = JSON.parse(userData)
            let id = crypto.randomBytes(16).toString('hex');
            if (data['Todos'].length != 0){
                for (let i = 0; i < data['Todos'].length; i++) {
                    if (data['Todos'][i]['id'] == id) {
                        id = crypto.randomBytes(16).toString('hex')
                        i = 0
                    }
                }
            }
            todoData = {
                id: id,
                todo: userData["todo"]
            }
            data['Todos'].push(todoData)
            jsonData = JSON.stringify(data)
            fileWriter(jsonData)
            res.end("Todo Added Succesfully")
        })
    }
    else if (req.method == 'PUT' && req.url == '/') {
        const id = req.headers["id"]
        let userData = ''
        req.on('data', (chunk) => {
            userData += chunk
        })
        let jsonData = fileReader()
        let data = JSON.parse(jsonData)
        req.on('end', () => {
            userData = JSON.parse(userData)
            let found = 0
            let index = 0
            data['Todos'].forEach((todo, i) => {
                if (data['Todos'][i]['id'] == id) {
                    index = i
                    found++
                }
            })
            if (found != 0) {
                data['Todos'][index]['todo'] = userData['updatedTodo']
                let jsonData = JSON.stringify(data)
                fileWriter(jsonData)
                res.end("Todo is updated Sucessfully")
            }
            else {
                res.end("Your choice is out of bound")
            }
        })
    }
    else if (req.method == 'DELETE' && req.url == '/') {
        const id = req.headers["id"]
        let rawData = ''
        req.on('data', (chunk) => {
            rawData += chunk
        })
        let jsonData = fileReader()
        let data = JSON.parse(jsonData)
        req.on('end', () => {
            let found = 0
            let array = data['Todos'].filter((todo, index) => {
                if (data['Todos'][index]['id'] == id) {
                    found++
                }
                else {
                    return todo
                }
            })
            if (found != 0) {
                data['Todos'] = array
                let jsonData = JSON.stringify(data)
                fileWriter(jsonData)
                res.end("Todo is Deleted Sucessfully")
            }
            else {
                res.end("Your choice is out of bound")
            }
        })
    }
})

server.listen(port, hostName, () => {
    console.log(`Sever is Live at : ${hostName}:${port}`)
})