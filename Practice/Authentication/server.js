const http = require("node:http")
const { hostname } = require("node:os")
const fs = require("node:fs")
const path = require('node:path')
const querystring = require('querystring');

// Host and Port
const host = "127.0.0.1"
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
const server = http.createServer((req,res)=>{
    // Checking if /signup request came
    if(req.url === '/signup'){
        fs.readFile(signupFilePath,(err,data)=>{
            if(err){
                res.statusCode = 500
                res.setHeader('Content-Type','text/plain')
                res.end("Internal Server Error")
                return;
            }
            res.statusCode = 200
            res.setHeader('Content-Type',"text/html")
            res.end(data)
        })
    }
    // Checking if /signin request came
    else if(req.url === '/signin'){
        // only run if post request occurs
        if(req.method === 'POST'){
            let userData = ''
            req.on('data',(chunk)=>{
                userData += chunk
            })
            req.on('end',()=>{
                userData = querystring.parse(userData)
                if (userData.userEmail == email && userData.userPassword == password){
                    res.statusCode = 302
                    const randomId = Math.random().toString(36).substring(2)
                    sessions[randomId] = { email: userData.userEmail }
                    res.setHeader('Set-Cookie',`sessionId=${randomId}; HttpOnly`)
                    res.setHeader('Location','/')
                    res.end()
                }
                else{
                    res.statusCode = 401
                    res.setHeader('Content-Type','text/html')
                    res.end('<h1>Invalid credentials</h1><a href="/signin">Try again</a>')
                }
                
            })
        }
        // run if post request not occurs
        else{
            fs.readFile(signinFilePath,(err,data)=>{
                if(err){
                    res.statusCode = 500
                    res.setHeader('Content-Type','text/plain')
                    res.end("Internal Server Error")
                    return;
                }
                res.statusCode = 200
                res.setHeader('Content-Type',"text/html")
                res.end(data)
            })
        }
    }
    // Checking if / request came
    else if(req.url === "/"){
        const cookies = querystring.parse(req.headers.cookie || '','; ')
        const sessionId = cookies.sessionId;
        // const sessionData = sessions[sessionId];

        if(sessions[sessionId]){
            // delete sessions[sessionId] // check point
            fs.readFile(indexFilePath,(err,data)=>{
                if(err){
                    res.statusCode = 500
                    res.setHeader('Content-Type','text/plain')
                    res.end("Internal Server Error")
                    return;
                }
                res.statusCode = 200
                res.setHeader('Content-Type',"text/html")
                res.end(data)
            })
        }
        else{
            res.statusCode = 302
            res.setHeader('Location',"/signin")
            res.end()
        }
    }
    else{
        res.statusCode = 404
        res.end("404 Not Found")
    }
})

server.listen(port,hostname,()=>{
    console.log("server is live...")
})