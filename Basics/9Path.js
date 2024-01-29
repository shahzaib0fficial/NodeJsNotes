const path = require('node:path')

const location = 'Basics/Path.txt'

console.log("Diretory Name :",path.dirname(location))
console.log("Base Name :",path.basename(location))
console.log("Extension Name :",path.extname(location))

//join path

const folderName = 'Basics',fileName = 'Path.txt'

console.log('Joined Path :',path.join(folderName,fileName))

//resolve path

console.log('Resolve Path :',path.resolve('Path.txt'))

//normalize path

console.log('Normalize Path :',path.normalize('Basics/Dir/..//Path.txt'))

// Note : These will not check that the path exist in actual or not these methods only calculate path