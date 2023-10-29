const {people,ages}=require('../people');
//console.log(people); //we can't access other file's vars..
console.log(people);
console.log(ages);
const os=require('os')
//console.log(os);
console.log(os.homedir(),os.platform());