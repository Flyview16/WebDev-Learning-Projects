const mongoose = require("mongoose");
const config = require("../config");

// Connect to mongo server
const mongoURI = config.mongodb.uri;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


// Create a general structure for all fruit documents
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,   
        min: 1,
        max: 10
    },
    review: String
})


// New collections using the fruitSchema and personSchema
const Fruit = new mongoose.model("Fruit", fruitSchema);


// Insert new fruit document
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Solid as a fruit"
});

 // fruit.save();


// Inserting multiple documents
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit"
});

const orange = new Fruit({
    name: "Orange",
    rating: 4,
    review: "Can sometimes be too sour"
});

const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "The smoothest texture"
});

// Fruit.insertMany([kiwi, orange, banana]);
Fruit.find({}).then((fruits) => {
    console.log(fruits);
});


// Updating a document
const peach = new Fruit({
    rating: 9,
    review: "Peaches are so yummy"
});

// peach.save();
// Fruit.updateOne({_id: "6705a011701f6432ebece7b7"}, {name: "Peach"})
//     .then(() => {console.log("Document succesfully updated");})
//     .catch((err) => {console.error("Error updating document: ", err);});


// Deleting a document
// Fruit.deleteOne({name: "Peach"})
// .then(() => {console.log("Document deleted succesfully");})
// .catch((err) => {console.error("Error deleting document: ", err);});



// New schema for persons
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = new mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 5,
    review: "Pretty sour fruit"
});

// pineapple.save();

const mango = new Fruit({
    name: "Mango",
    rating: 10,
    review: "Really soft and juicy fruit"
});

// mango.save();

// Insert new person document
const person = new Person({
    name: "Amy",
    age: 32,
    favouriteFruit: pineapple
});

// person.save();

// Deleting multiple documents
// Person.deleteMany({name: "John"})
// .then(() => {console.log("Document deleted succesfully");})
// .catch((err) => {console.error("Error deleting document: ", err);});

Person.updateOne({name: "John"}, {favouriteFruit: mango});
