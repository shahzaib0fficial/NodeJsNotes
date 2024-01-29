const fs = require('node:fs')

//Creating a Folder
try{
    if (!fs.existsSync('NewFolder')) {
        fs.mkdir('NewFolder')
    }
    else {
        console.log('Folder already Exists')
    }
}catch(err){
    console.log(err)
}

//Reading content of Folder
const path = require('node:path')

console.log('Everything in NewFolder')

try{
    let data = fs.readdirSync('NewFolder').map((fileName)=>{
        return path.join('NewFolder',fileName)
    })
    console.log(data)
    
}catch(err){
    console.log(err)
}

//only read files in that folder

console.log('Files in NewFolder')

let data = fs.readdirSync('NewFolder').map(((fileName)=>{
    return path.join('NewFolder',fileName)
})).filter((fileName)=>{
    return fs.lstatSync(fileName).isFile()
})
console.log(data)

//rename Folder

fs.rename('NewFolder','NewFolder',(err)=>{ // i am not changing name here but you can(First here is old name and second here is new name)
    if(err){
        console.log(err)
    }
    console.log('Renamed to NewFolder')
})

fs.rm('remove',{recursive:true , force:true},(err)=>{ //exception case if folder have some content
    if(err){
        throw err
    }
    else{
        console.log("Folder Deleted")
    }
})