const EventEmitter = require('node:events')

const eventEmitter =  new EventEmitter()

eventEmitter.on('callOnNeed',(parameterValue)=>{
    console.log("Need Full Filled :",parameterValue)
})

let a = 0

if(a===0)
{
    eventEmitter.emit('callOnNeed','any value if needed')
}