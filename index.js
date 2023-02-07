require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(`${process.env.MONGO_DB_URL}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

//CRUD -> INSERT INTO
async function createCourse() {
  //object
  const course = new Course({
    name: "Meno pagrindai",
    author: "Austeja",
    tags: ["teacher", "painting"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}


//GETTING DATA

const getData = async () => {
  const courses = await Course.find();
  console.log(courses);
};



const getFilteredCourses = async () => {
  const courses = await Course.find()
  .count()
    // .limit(3)
    // .sort({ author: 1 })
    // .select({ name: 1, tags: 1 });
  console.log(courses);
};

async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;

    course.author = "Airidas Simanskis"
    const result = await course.save();
    console.log(result)
}

//DELETE
async function removeCourse(id){
    const course = await Course.findByIdAndRemove(id);
    console.log(course)
}

const removeCourses = async () => {
    const courses = await Course.deleteMany({
        author: "Kajus"
    })
}

// createCourse();
// getData()
getFilteredCourses();
// updateCourse()
// removeCourse("63e21013bf9ec5d2c60e17da")
// removeCourses()