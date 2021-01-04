const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Connected correctly to server');

    // var newDish = Dishes({
    //     name: 'Shivam Patel',
    //     description: 'First Test using mongoose'
    // });

    // newDish.save()

    //Use create method instead of above method

    Dishes.create({
        name: 'Shivam Patel',
        description: 'First Test using mongoose'
    })
    .then((dish)=>{
        console.log("Dish",dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description: 'Updated test!'}
        },{
            new: true
        }).exec();
    })
    .then((dish)=>{
        console.log("dish",dish);

        dish.comments.push({
            rating: 5,
            comment: 'My mouth is watering!!',
            author: 'Shivam Patel'
        });
        return dish.save();
    })
        .then((dish)=> {
            console.log(dish);

            return Dishes.deleteMany({});
        })
        
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});