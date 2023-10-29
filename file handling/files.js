const fs=require('fs');
//reading files
fs.readFile('./docs/doc1.txt',(err,data)=>{
    if(err)
    console.log('readfile',err);
console.log(data.toString());
})
console.log('last line');

//writing files
fs.writeFile('./docs/written.txt','I\'ve been written',()=>{
console.log('file was written');
})
//creating directories
if(!fs.existsSync('./assets')){
fs.mkdir('./assets',(err)=>{
    if(err)
    console.log('mkdir',err);
else
console.log('folder created');
})
}
else{
fs.rmdir('./assets',err=>{
    if(err)
    console.log('rmdir',err);
else
    console.log('folder already exists!,hence deleted');
})
}
/*fs.mkdir('./assets',(err)=>{
    if(err)
    console.log(err);
else
console.log('folder created');
})*/ // this gives error

//deleting files
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt',err=>{
        if(err)
        console.log('unlink',err);
    else
        console.log('file deleted');
    })
}
else
console.log('file doesn\'t exist!');