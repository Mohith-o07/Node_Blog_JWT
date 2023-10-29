const fs=require('fs');
const readStream=fs.createReadStream('./docs/doc2.txt',{encoding:'utf-8'});
const writeStream=fs.createWriteStream('./docs/pipe.txt');
// readStream.on('data',(chunk)=>{
//     console.log('------new chunk-------');
//     console.log(chunk);
//     writeStream.write('\nNEU CHUNK WRITTEN\n');
//     writeStream.write(chunk);
// });

//piping
readStream.pipe(writeStream);