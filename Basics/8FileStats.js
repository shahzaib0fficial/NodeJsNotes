const fs = require('node:fs')

fs.stat('FileStats.txt',(err,stats)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(stats.isFile())
        console.log(stats.isDirectory())
        console.log(stats.isSymbolicLink())
        console.log(stats.size)
    }
})

const fsPromise = require('node:fs/promises')

async function statsChecker()
{
    try{
        const stats = await fsPromise.stat('FileStats.txt')
        console.log('Async way')
        console.log(stats.isFile())
        console.log(stats.isDirectory())
        console.log(stats.isSymbolicLink())
        console.log(stats.size)
    }catch(err){
        console.log(err)
    }
}

statsChecker()