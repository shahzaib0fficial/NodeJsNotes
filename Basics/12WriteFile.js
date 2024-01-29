const fs = require('node:fs')

let data = 'This file is created for 12WriteFile.js'

fs.writeFile('WriteFile.txt',data,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('File Written Sucessfully')
    }
})

//Sync

try{
    fs.writeFileSync('WriteFile.txt',data)
    console.log('Sync File Written Sucesfully')
}catch(err){
    console.log(err)
}

//Async

const fsPromise = require('node:fs/promises')

async function fileWritter(){
    try{
        await fsPromise.writeFile('WriteFile.txt',' Appended more data',{flag:'a+'})
        console.log('Async File Written Sucessfully')
    }catch(err){
        console.log(err)
    }
}

fileWritter()