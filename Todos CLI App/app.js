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
    let response = null
    let choice = await takeInput("1. Log in\n2. Sign up\n")
    if (choice == 1) {
        try {
            response = await require("./login")
            delete require.cache[require.resolve("./login")];
            // app()
        } catch (error) {
            console.log(error)
        }
    }
    else if (choice == 2) {
        try {
            await runFile("signup.js")
        } catch (error) {
            console.log(error)
        }
    }
    else {
        console.log("Choice is out of bound")
        // app()
    }

    if(response == -1 || response == 0){
        console.log("Error Occurs")
        app()
    }
    else{
        console.log(`Successfully Logged In as ${response}`)
        require("./todo")(response)
    }
}

app()

// require("./todo")("VALUE")