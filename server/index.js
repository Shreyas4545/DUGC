const { default: mongoose } = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const formidable = require('formidable');
const multer  = require('multer');

const DB= "mongodb+srv://shreyas45:20169361@cluster0.yfdgevp.mongodb.net/dugcdb?retryWrites=true&w=majority"
const connectDB = () => mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(console.log("DB Connected Succesfully...."))
.catch((err)=>{
    console.log("DB Connection Failed!")
    console.log(err)
    process.exit(1)
});

connectDB()

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:String
})

const User=mongoose.model("User",userSchema);

const fs = require('fs');
const cors = require('cors')
var express = require('express');
const app = express();
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser());
const CSVToJSON = require('csvtojson');

// var storage = multer.diskStorage(
//     {
//         destination: './Store1',
//         filename: function (req, file, cb ) {
//             cb( null, file.originalname);
//         }
//     }
// );
var storage = multer.diskStorage(
    {
        destination: './build',
        filename: function (req, file, cb ) {
            console.log("file");
            cb( null, file.originalname);
        }
    }
);

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: storage })
app.use(express.static(__dirname + "../build"));
let file1;
let coursename;
app.post("/api/uploadfile", upload.single("profile"), (req, res, next) => {
    coursename=req.body.course;
    console.log(coursename);
    file1=req.file.originalname;
    if(!req.file.originalname)
    {
        return res.status(401).json({
        success:false,
        message:"No file choosen"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Successfully uploaded the file"
    })
    console.log("file successfully uploaded !!");
});

app.post("/login",async (req,res)=>{
    let c=req.body.urole;
    let result=await User.findOne({
        email:req.body.uemail,
        password:req.body.upass
    })
    if(!result){
        res.status(401).json({
            success:false,
            message:"Invalid Username or password"
        });
    }else{
        res.status(200).json({
            success:true,
            message:"Success",
            data:result
            });
    }
});
app.listen(8080, ()=>{
    console.log("Server is on");
})

const fileSchema = {
    SL:String,
    Name: String,
    Usn: {type: String, unique: true},
    Division: String,
    Attendance: String,
    Cie: String,
    Course: String,
    Rollno:{
        type:String,
        unique:true
    }
};
const file = mongoose.model("file", fileSchema);

let array = [];

app.get("/getcourse",(req,res)=>{
    console.log(coursename,"Hello My friend");
    res.send("Success");
})

const courseCoordinatorUrl = `/courseCoordinator`;
console.log(courseCoordinatorUrl);
app.get(courseCoordinatorUrl, (req, res) => {
    coursename=req.body.courseData;
    console.log(file1);
    CSVToJSON().fromFile(`./build/${file1}`)
        .then(users => {
            let data = users;
            for (let index = 0; index < data.length; index++) {
                if(data[index].Attendance < 75 || data[index].CIE < 40 ){
                    array.push(new file({
                        SL: data[index].Sl,
                        Name: data[index].Name,
                        Usn: data[index].USN,
                        Division: data[index].Division,
                        Attendance: data[index].Attendance,
                        Cie: data[index].CIE,
                        Course: coursename,
                        Rollno:data[index].Rollno
                    })  
                    )
                }
            }
            file.insertMany(array, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successss");
                }
            })
            res.send(data);
            fileName=""
        }).catch(err => {
            console.log(err);
        });
})
const result = [];
app.get("/details",(req,res) =>{
const result1=file.find({});
if(!result1)
{
    return res.status(401).json({
    success:false,
    message:"No Students Exist"
    });
}
else{
    return res.status(200).json({
        message:"Success",
        data:result1,
        success:true
    })
}
});

app.get("/dugcCoordinator", (req, res) => {
    file.find({}, function(err, foundItems){
        const groupByCategory = foundItems.reduce((group, foundItem) => {
            const { Name } = foundItem;
            group[Name] = group[Name] ?? [];
            group[Name].push(foundItem);
            return group;
        }, {})
        let array = Object.values(groupByCategory)
        res.send(array)
    });
})