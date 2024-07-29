const http = require("node:http")
const fs = require("node:fs")
const path = require('node:path')
const querystring = require('querystring');
const mongoose = require('mongoose')

// opening database
var schema
async function openDatabase() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDatabase')

    console.log("Database is opened...")
}

// Schema Creater
function createSchema() {
    // Creating Schema
    const usersSchema = new mongoose.Schema({
        userName: String,
        email: String,
        password: String
    })

    // Compailing Schema
    schema = mongoose.model("usersSchema", usersSchema)
}
createSchema()

// Add User Data in Database
async function addUser(userName, email, password) {
    // creating user's data
    var user = new schema({
        userName: userName,
        email: email,
        password: password
    })

    // Saving User's data
    await user.save()
}

// Get User From DataBase
async function getUser(email, password) {
    let user = ""
    user = await schema.find({
        email: email,
        password: password
    })

    return user
}

// Host and Port
const hostname = "127.0.0.1"
const port = "3000"

// File's Path
const indexFilePath = path.join("index.html")
const signupFilePath = path.join("signup.html")
const signinFilePath = path.join("signin.html")

// Temp Verification Data
const email = "shahzaib5330884@gmail.com"
const password = 12345678

// Sessions
const sessions = {}

// Creating a server
const server = http.createServer(async (req, res) => {
    // Checking if /signup request came
    if (req.url === '/signup') {
        if (req.method === 'POST') {
            // Checking if any error occurs on opening on database
            try {
                await openDatabase()
                let userData = ''
                req.on('data', (chunk) => {
                    userData += chunk
                })
                req.on('end', async () => {
                    userData = querystring.parse(userData)

                    if (userData.userName && userData.userEmail && userData.userPassword) {
                        const userRetrived = await getUser(userData.userEmail, userData.userPassword)
                        if (userRetrived.length > 0 && userData.userEmail == userRetrived[0].email) {
                            res.statusCode = 400
                            res.setHeader('Content-Type', 'text/html')
                            res.end('<h1>Email Already Exists</h1><a href="/signup">Try again</a>')
                        }
                        else {
                            addUser(userData.userName, userData.userEmail, userData.userPassword)
                            res.statusCode = 302
                            res.setHeader('Location', '/signin')
                            res.end()
                        }
                    }
                    else {
                        res.statusCode = 401
                        res.setHeader('Content-Type', 'text/html')
                        res.end('<h1>Invalid credentials</h1><a href="/signup">Try again</a>')
                    }
                })
            }
            catch (err) {
                // console.log("Error: ",err)
                console.log("Error in opening database")
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                res.end("Internal Server Error.")
            }

        }
        else {
            fs.readFile(signupFilePath, (err, data) => {
                if (err) {
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/plain')
                    res.end("Internal Server Error")
                    return;
                }
                res.statusCode = 200
                res.setHeader('Content-Type', "text/html")
                res.end(data)
            })
        }
    }
    // Checking if /signin request came
    else if (req.url === '/signin') {
        // only run if post request occurs
        if (req.method === 'POST') {
            try {
                await openDatabase()
                let userData = ''
                req.on('data', (chunk) => {
                    userData += chunk
                })
                req.on('end', async () => {
                    userData = querystring.parse(userData)
                    // console.log("Find user:",await getUser(userData.userEmail,userData.userPassword))
                    const userRetrived = await getUser(userData.userEmail, userData.userPassword)
                    // console.log("dataRestrived: ", userRetrived)

                    if (userRetrived.length> 0 && userRetrived[0].email == userData.userEmail && userRetrived[0].password == userData.userPassword) {
                        res.statusCode = 302
                        const randomId = Math.random().toString(36).substring(2)
                        sessions[randomId] = { email: userData.userEmail }
                        res.setHeader('Set-Cookie', `sessionId=${randomId}; HttpOnly`)
                        res.setHeader('Location', '/')
                        res.end()
                    }
                    else {
                        res.statusCode = 401
                        res.setHeader('Content-Type', 'text/html')
                        res.end('<h1>Invalid credentials</h1><a href="/signin">Try again</a>')
                    }

                })
            }
            catch (err) {
                // console.log("Error: ",err)
                console.log("Error in opening database")
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                res.end("Internal Server Error.")
            }
        }
        // run if post request not occurs
        else {
            fs.readFile(signinFilePath, (err, data) => {
                if (err) {
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/plain')
                    res.end("Internal Server Error")
                    return;
                }
                res.statusCode = 200
                res.setHeader('Content-Type', "text/html")
                res.end(data)
            })
        }
    }
    // Checking if / request came
    else if (req.url === "/") {
        const cookies = querystring.parse(req.headers.cookie || '', '; ')
        const sessionId = cookies.sessionId;
        // const sessionData = sessions[sessionId];

        if (sessions[sessionId]) {
            delete sessions[sessionId] // check point
            fs.readFile(indexFilePath, (err, data) => {
                if (err) {
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/plain')
                    res.end("Internal Server Error")
                    return;
                }
                res.statusCode = 200
                res.setHeader('Content-Type', "text/html")
                res.end(data)
            })
        }
        else {
            res.statusCode = 302
            res.setHeader('Location', "/signin")
            res.end()
        }
    }
    else {
        res.statusCode = 404
        res.end("404 Not Found")
    }
})

server.listen(port, hostname, () => {
    console.log("server is live...")
})