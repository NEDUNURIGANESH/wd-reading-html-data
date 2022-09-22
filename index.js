const http=require("http");
const fs=require("fs");
let homecontent="";
let projectcontent="";
let registrationcontent="";
const args = require("minimist")(process.argv.slice(2));
fs.readFile("home.html",(err,home)=>{
    if(err){ throw err};
    homecontent=home.toString();
});
fs.readFile("project.html",(err,project)=>{
    if(err){
        throw err;
    }
    projectcontent=project.toString();
});
fs.readFile("registration.html",(err,registration)=>{
    if(err){
        throw err;
    }
    registrationcontent=registration.toString();
});
http.createServer((req,res)=>{
    let url=req.url;
    res.writeHead(200,{"content-type":"text/html"});
    switch(url)
    {
        case "/project":
            res.write(projectcontent);
            res.end();
            break;
        case "/registration":
            res.write(registrationcontent);
            res.end();
            break;
        default:res.write(homecontent);
        res.end();
        break;
    }
}).listen(args["port"]);