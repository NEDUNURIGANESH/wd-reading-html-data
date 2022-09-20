const http=require("http");
const fs=require("fs");
let homecontent="";
let projectcontent="";
let registrationcontent="";
let args = require("minimist")(process.argv.slice(2));
fs.readFile("home.html",(err,home)=>{
    if(err){ throw err};
    homecontent=home;
});
fs.readFile("project.html",(err,project)=>{
    if(err){
        throw err;
    }
    projectcontent=project;
});
fs.readFile("registration.html",(err,registration)=>{
    if(err){
        throw err;
    }
    registrationcontent=registration;
});
http.createServer((req,res)=>{
    let url=req.url;
    res.writeHeader(200,{"content-type":"type/html"});
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
    /*
    if(url=="/project")
    {
        res.write(projectcontent);
            res.end();
    }
    else if(url=="/registration")
    {
        res.write(registrationcontent);
            res.end();
    }
    else{
        res.write(homecontent);
        res.end();
    }*/
        
}).listen(args.port);


