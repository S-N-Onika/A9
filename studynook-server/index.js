const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized token reference has expired' });
        }
        req.user = decoded;
        next();
    });
};

async function run() {
    try {
        const db = client.db('studyNookDB');
        const roomsCollection = db.collection('rooms');
        const bookingsCollection = db.collection('bookings');

        app.post('/api/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            }).send({ success: true });
        });

        app.post('/api/logout', async (req, res) => {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            }).send({ success: true });
        });

        app.get('/api/home-rooms', async (req, res) => {
            try {
                const result = await roomsCollection.find().sort({ _id: -1 }).limit(6).toArray();
                res.send(result);
            } catch (err) {
                res.send([]);
            }
        });

        app.post('/api/rooms', verifyToken, async (req, res) => {
            try {
                const roomPayload = {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    floor: req.body.floor,
                    capacity: parseInt(req.body.capacity),
                    hourlyRate: parseFloat(req.body.hourlyRate),
                    amenities: req.body.amenities || [],
                    ownerEmail: req.user.email,
                    ownerName: req.body.ownerName,
                    bookingCount: 0
                };
                const result = await roomsCollection.insertOne(roomPayload);
                res.status(201).send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to store room listing." });
            }
        });

        console.log("Successfully connected to the MongoDB Cluster Engine.");
    } catch (e) {
        console.error("Database connection failure:", e);
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("StudyNook Server Running");
});

app.listen(port, () => {
    console.log(`Server running over core port: ${port}`);
});
