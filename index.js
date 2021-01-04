const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Connected correctly to server');

    var newDish = Dishes({
        name: 'Shivam Patel',
        description: 'First Test using mongoose'
    });

    newDish.save()
    .then((dish)=>{
        console.log("Dish",dish);

        return Dishes.find({}).exec();
    })
    .then((dishes)=>{
        console.log("dishes",dishes);

        return Dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
});