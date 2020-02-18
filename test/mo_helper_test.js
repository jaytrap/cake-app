 const mongoose = require("mongoose");
//
//  mongoose.connect("mongodb://localhost/test4Db",{userNewUrlParser: true});
//
//  mongoose.connection
//      .once("open", ()=> console.log("connected"))
//      .on("error", error =>{
//        console.log(error);
//      });
 // mongodb+srv://jaytrap:Sh%40d0w1410@cluster0-8vkls.mongodb.net/test?retryWrites=true&w=majority

//     mongoose.connect( uri, { useNewUrlParser: true}, () => { console.log("we are connected")}).catch(err => console.log(err));




     //mongoose.connect( uri, { useNewUrlParser: true}, () => { console.log("we are connected")}).catch(err => console.log(err));
    mongoose.connect('mongodb+srv://trap:Sh%40d0w1410@cakeapp-zevik.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true, useNewUrlParser:true
    } , () =>{ console.log("we are connected")}).catch(err => console.log(err));

// mongoose.connection
//      .once("open", ()=> console.log("connected"))
//      .on("error", error =>{
//        console.log(error);
//      });
