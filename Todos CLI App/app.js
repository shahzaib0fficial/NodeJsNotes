let readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal : false
})
readline.pause()

function takeInput(question) {
    return new Promise(resolve => {
        readline.resume()
        readline.question(question, (answer) => {
            readline.pause()
            resolve(answer)
        })
    })
}

async function app() {
    let responseLogin = null
    let responseSignup = null
    let choice = await takeInput("1. Log in\n2. Sign up\n")
    if (choice == 1) {
        try {
            responseLogin = await require("./login")
            delete require.cache[require.resolve("./login")];
            // app()
        } catch (error) {
            console.log(error)
        }
    }
    else if (choice == 2) {
        try {
            // await runFile("signup.js")
            responseSignup = await require("./signup")
            delete require.cache[require.resolve("./signup")];
        } catch (error) {
            console.log(error)
        }
    }
    else {
        console.log("Choice is out of bound")
        app()
    }

    if(typeof responseLogin == typeof ""){
        console.log(`Successfully Logged In as ${responseLogin}`)
        require("./todo")(responseLogin)
    }
    else if(responseLogin == 0){
        console.log("Username or Password is incorrect")
        app()
    }
    else if(responseLogin == -1){
        console.log("Error in Log In (Try Again Later)")
        app()
    }
    else if(responseSignup == 1){
        console.log("Successfully Signed Up (Log In to use app)")
        app()
    }
    else if(responseSignup == 0){
        console.log("Username is already exists")
        app()
    }
    else if(responseSignup == -1){
        console.log("Error in Sign Up (Try Again Later)")
        app()
    }
}

app()

// require("./todo")("VALUE")