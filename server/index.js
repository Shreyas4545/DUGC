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
csv = fs.readFileSync("cc.csv");
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

app.post("/api/uploadfile", upload.single("profile"), (req, res, next) => {
    console.log(req.file.originalname);
    if(!req.file.originalname)
    {
        return res.status(401).json({
        success:false,
        message:"No file choosen"
        });
    }
    res.sendStatus(200);
    console.log("file successfully uploaded !!");
});

app.get("/", (req, res)=>{
    CSVToJSON().fromFile('cc.csv')
    .then(users => {
        let data = users;
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
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

app.post("/submit",async (req,res)=>{
  console.log(req.body.sem,req.body.course);
  res.status(200).json({
    message:"Success"
  });
})

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

const consolidatedFileSchema = {
    Name: String,
    Usn: {type: String, unique: true},
    Division: String,
    course: {
        SE: {
            Attendance: Number,
            CIE: Number
        },
        SS: {
            Attendance: Number,
            CIE: Number
        }
    }
}

const file = mongoose.model("file", fileSchema);
const file1 = mongoose.model("file1", fileSchema);
const consolatedFile = mongoose.model("consolatedFile", consolidatedFileSchema);


let finalArray = [];
let array = [];
let array1 = [];



    // app.get("/getCourse", async (req, res)=>{
    //     let course = await req.body.val;
    //     console.log(course);
    // })

    // app.post("/getSemester", async (req, res)=>{
    //     let sem = await req.body.val;
    //     console.log(sem);
    // })


// const course = getCourse();

const courseCoordinatorUrl = `/courseCoordinator`;
console.log(courseCoordinatorUrl);

app.get(courseCoordinatorUrl, (req, res) => {
    // const {sem, course} = req.body
    // console.log(course);


    CSVToJSON().fromFile("cc.csv")
        .then(users => {
            let data = users;
            // users is a JSON array
            // log the JSON array
            for (let index = 0; index < data.length; index++) {

                if(data[index].Attendance < 75 || data[index].CIE < 40 ){
                    array.push(new file({
                        SL: data[index].Sl,
                        Name: data[index].Name,
                        Usn: data[index].USN,
                        Division: data[index].Division,
                        Attendance: data[index].Attendance,
                        Cie: data[index].CIE,
                        Course: "",
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
            // log error if any
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