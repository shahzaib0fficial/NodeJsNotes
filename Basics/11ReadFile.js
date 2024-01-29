const fs = require('node:fs')

fs.readFile('ReadFile.txt','utf8',(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Readed :",data)
    }
})

//Sync

try{
    const data = fs.readFileSync('ReadFile.txt','utf8')
    console.log('Sync :',data)
}catch(err){
    console.log(err)
}

//Async

const fsPromise = require('node:fs/promises')

async function FileReader()
{
    try{
        const data = await fsPromise.readFile('ReadFile.txt','utf8')
        console.log('Async :',data)
    }catch(err){
        console.log(err)
    }
}

FileReader()