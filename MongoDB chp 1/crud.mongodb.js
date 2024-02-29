// create and insertion of data
use("CrudDb");

db.createCollection("courses");

// db.courses.insertOne({
//   Name: "Bcom Web development courses",
//   price: "free",
//   assignments: 100,
//   programm: "internship",
// });

// db.courses.insertMany([
//   {
//     Name: "Bcom Web development courses",
//     price: "free",
//     assignments: 100,
//     programm: "internship",
//   },
//   {
//     Name: "Advanced JavaScript Programming",
//     price: "$49",
//     assignments: 50,
//     programm: "course",
//   },
//   {
//     Name: "Python for Data Science",
//     price: "$79",
//     assignments: 80,
//     programm: "course",
//   },
//   {
//     Name: "Full Stack Web Development Bootcamp",
//     price: "$199",
//     assignments: 120,
//     programm: "bootcamp",
//   },
//   {
//     Name: "UI/UX Design Fundamentals",
//     price: "$29",
//     assignments: 40,
//     programm: "course",
//   },
//   {
//     Name: "Machine Learning with Python",
//     price: "$99",
//     assignments: 70,
//     programm: "course",
//   },
//   {
//     Name: "Mobile App Development with React Native",
//     price: "$149",
//     assignments: 90,
//     programm: "course",
//   },
//   {
//     Name: "Data Structures and Algorithms in C++",
//     price: "$69",
//     assignments: 60,
//     programm: "course",
//   },
//   {
//     Name: "Digital Marketing Fundamentals",
//     price: "$39",
//     assignments: 30,
//     programm: "course",
//   },
//   {
//     Name: "Cybersecurity Essentials",
//     price: "$59",
//     assignments: 50,
//     programm: "course",
//   },
// ]);

// Read the data

// Find
// let a = db.courses.find({ assignments: 50 });
// console.log(a.toArray());

// Read

/*Findone*/
// let b = db.courses.findOne({ assignments: 50 });
// console.log(b);

/*Find*/
// let a = db.courses.find({ assignments: 50 });
// console.log(a.Array());

// Update

db.courses.updateMany({ price: "free" }, { $set: { price: "Chirag" } });

// delete
db.courses.deleteOne({ price: "Chirag" });
