import express from "express";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req, res) => {
  res.send("CRUD API with Node.js");
});

//create user
app.post("/createuser", (req, res) => {
    const fileExists = fs.existsSync("users.txt");
    // console.log("fileExists", fileExists);
    if (fileExists) {
        // console.log("body", req.body);
        let data = fs.readFileSync("users.txt", "utf-8");
        let users = JSON.parse(data);
        // console.log("users", users);
        users.push({...req.body, id: uuidv4()});
        fs.writeFileSync("users.txt", JSON.stringify(users));
        res.json({message:"User Created, file already exists"});
        
    } else {
        const temArr = [];
        temArr.push({...req.body, id: uuidv4()});
        fs.writeFileSync("users.txt", JSON.stringify(temArr));
        res.json({message:"User Created, file created"});
  }
    // res.send("User Created");
});

//read user
app.get("/getallusers",(req, res)=>{
    const fileExists = fs.existsSync("users.txt");
    if (fileExists) {
        let data = fs.readFileSync("users.txt", "utf-8");
        let users = JSON.parse(data);
        res.send(users);
    } else {
        res.send("No users found");
    }
})

//update user
app.post("/updateuser/:id", (req, res) => {
        let data = fs.readFileSync("users.txt", "utf-8");
        let parseData = JSON.parse(data);
        const specificUser = parseData.map((user) => {
            if (user.id  === req.params.id){
                // res.send("users updated");
                return req.body;
            }else{
                // res.send("users not found");
                return user
            }
        });
        fs.writeFileSync("users.txt", JSON.stringify(specificUser));
    //    console.log("id", req.params.id);
    res.send("User Updated");
    
});

//delete user
app.post("/deleteuser/:id", (req, res) => {
    const fileExists = fs.existsSync("users.txt");
    if (fileExists) {
        let data = fs.readFileSync("users.txt", "utf-8");
        let parseData = JSON.parse(data);
        // console.log("parseData", parseData);
       const deletePerson =  parseData.findIndex((user) => {
            if (user.id === req.params.id){
                return user;
            }
        });
        // console.log("deletePerson", deletePerson);
        parseData.splice(deletePerson, 1);
        fs.writeFileSync("users.txt", JSON.stringify(parseData));
        res.send("users deleted sucessfully");
    } else {
        res.send("No users found");
    }
});


app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
