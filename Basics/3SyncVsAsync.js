const fs = require("node:fs")

//sync Reading File

const fileData = fs.readFileSync('SyncVsAsync.txt','utf-8') // calls blocks until the file being readed
console.log(fileData)


console.log("By Sync")

fs.readFile('SyncVsAsync.txt','utf-8',(err,data)=>{
    if(err){
        throw err;
    }
    else
    {
        console.log(data)
    }
}) // doesnot wait till file readed and execute next statements and when file is ready then it will display 
console.log('By Async')