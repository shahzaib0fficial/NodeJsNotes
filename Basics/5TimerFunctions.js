// setTimeout : runs after a mentioned Time(in milli seconds)

setTimeout(()=>{
    console.log("This setTimeout functions is runs after 2 Seconds")
},2000)

// setImidiate : runs function imeediatly

setImmediate(()=>{
    console.log("Runs Immediatly") // equivalence to setTimeout(()={},0)
})

// setInterval : runs repetedly after every mentioned time
// clearInterval : stop intervals

let a = 0
const id = setInterval(()=>{
    if(a==5)
    {
        console.log("Requirement meets")
        clearInterval(id)
    }
    else
    {
        console.log("Running until requirement meets")
        a++;
    }
},5000)