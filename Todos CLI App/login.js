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

async function loginVerify(){
    const userName = await takeInput("Enter Your Username: ")
    const password = await takeInput("Enter Your Password: ")

    let loginInfo = {
        userName : userName,
        password : password
    }

    let loginJson = JSON.stringify(loginInfo)

    options = {
        path : "/login",
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
                    // resolve("Successfully login")
                    resolve(1)
                }
                else{
                    // resolve("Username or Password is incorrect")
                    resolve(0)
                }
            })
        })
        req.on('error',()=>{
            // resolve("Some error occurs")
            resolve(-1)
        })
        req.write(loginJson)
        req.end()
    })
}

async function main(){
    // console.log(await loginVerify())
    return await loginVerify()
}

module.exports = main()