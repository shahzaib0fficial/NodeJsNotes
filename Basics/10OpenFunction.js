const fs = require('node:fs')

fs.open('OpenFunction.txt','r',(err,fileHandle)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(fileHandle) // unique identity of file in operating system
    }
})

//Sync

try{
    const fileHandle = fs.openSync('OpenFunction.txt','r')
    console.log('Sync :',fileHandle)
}catch(err){
    console.log(err)
}

//Async

const fsPromise = require('node:fs/promises')

async function fileHandler(){
    let fileHandle
    try{
         fileHandle = await fsPromise.open('OpenFunction.txt','r')
         console.log('Async :',fileHandle.fd)
         console.log(await fileHandle.readFile({encoding : 'utf8'}))
    }finally{
        if(fileHandle){
            await fileHandle.close()
        }
    }
}

fileHandler()