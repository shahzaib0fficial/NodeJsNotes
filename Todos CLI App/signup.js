const http = require('http');

const readline = require('node:readline').createInterface({
        input : process.stdin,
        output : process.stdout,
        terminal : false
})
readline.pause()

const url = 'http://127.0.0.1:3000'

function takeInput(question){
    return new Promise(resolve =>{
        readline.resume()
        readline.question(question,(answer)=>{
                readline.pause()
                resolve(answer)
            }
        )
    })
}

async function signUp(){
    const userName = await takeInput("Enter Your Username: ")
    const firstName = await takeInput("Enter Your First Name: ")
    const lastName = await takeInput("Enter Your Last Name: ")
    const password = await takeInput("Enter Your Password: ")

    let signupInfo = {
        userName : userName,
        firstName : firstName,
        lastName : lastName,
        password : password
    }

    let signupJson = JSON.stringify(signupInfo)

    options = {
        path : "/signup",
        method : "POST"
    }
    return new Promise((resolve,reject)=>{  
        const req = http.request(url,options,(res)=>{
            let responseJson = ''
            res.on('data',(chunk)=>{
                responseJson += chunk
            })
            res.on('end',()=>{
                let responseData = JSON.parse(responseJson)
                if(responseData["response"] === 1){
                    // resolve("Successfully Signup")
                    resolve(1)
                }
                else{
                    // resolve("Username is already exists")
                    resolve(0)
                }
            })
        })
        req.on('error',()=>{
            // resolve("Some error occurs")
            resolve(-1)
        })
        req.write(signupJson)
        req.end()
    })
}

async function main(){
    return await signUp()
}

module.exports = main()