// import express from "express";

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get('/api/get-message', (req,res) => {
//     res.json({message: 'Hello, World!'});
// })

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })

// -------------------------------------------------------------------------------------------------------------------------

// connection of db with server

// import express from 'express';
// import mongoose from 'mongoose';

// const app = express();
// const port = 3000;

// app.use(express.json());

// const mongoURI = 'mongodb://localhost:27017/mydatabase';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// app.get('/api/get-message', (req, res) => {
//   res.json({ message: 'Hello, World!' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// -------------------------------------------------------------------------------------------------------------------------

import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.json());

const mongoURI = "mongodb://localhost:27017/mydatabase";
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

app.post("/api/add-message", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const newMessage = new Message({ message });
        await newMessage.save();
        res
            .status(201)
            .json({ message: "Message added successfully", data: newMessage });
    } catch (err) {
        res.status(500).json({ error: "Failed to add message", details: err });
    }
});

app.get("/api/get-mess", async (req, res) => {
    try {
        const message = await Message.find();

        res.status(200).json({
            success: true,
            message,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
