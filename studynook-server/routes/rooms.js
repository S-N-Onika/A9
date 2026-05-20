const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const verifyToken = require("../middleware/verifyToken");

const Rooms = [
    {
        name: "The Antiquarian Alcove",
        description: "Surrounded by floor-to-ceiling leather-bound law legers, featuring a restored mahogany drafting desk integrated with a dual 27-inch 4K color-accurate digital screen interface panel.",
        image: "https://unsplash.com",
        floor: "East Wing - 3rd Floor",
        capacity: 2,
        hourlyRate: 6,
        amenities: ["Wi-Fi", "Power Outlets", "Quiet Zone"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "Archival Media Scriptorium",
        description: "Dark walnut-paneled chamber showcasing a functional green-shade banker's desk configuration. Features a hidden, voice-activated ultra-short-throw 4K laser projector layout.",
        image: "https://unsplash.com",
        floor: "North Tower - 4th Floor",
        capacity: 4,
        hourlyRate: 10,
        amenities: ["Projector", "Wi-Fi", "Power Outlets", "Air Conditioning"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Stained-Glass Observatory",
        description: "Bathed in refracted emerald light from a fully preserved rose window structure, balancing mid-century leather armchairs with a wall-mounted interactive electronic smart whiteboard.",
        image: "https://unsplash.com",
        floor: "Grand Atrium - Top Tier",
        capacity: 6,
        hourlyRate: 12,
        amenities: ["Whiteboard", "Wi-Fi", "Air Conditioning"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "Founders’ Crypt Lab",
        description: "Carved into exposed hand-pressed structural brick foundations, this vault is retrofitted with heavy acoustic soundproof shielding dampeners and multi-point fiber lines.",
        image: "https://unsplash.com",
        floor: "Basement Vault - Level B2",
        capacity: 3,
        hourlyRate: 15,
        amenities: ["Quiet Zone", "Power Outlets", "Wi-Fi"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Cartography Concourse",
        description: "Massive iron-rimmed map archiving desk. Perimeter locations feature retro mechanical toggle keypads regulating micro-zoned climate flow variables and directional task lighting vectors.",
        image: "https://unsplash.com",
        floor: "West Wing - 1st Floor",
        capacity: 8,
        hourlyRate: 18,
        amenities: ["Wi-Fi", "Power Outlets", "Air Conditioning"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Lexicon Vault",
        description: "Private secluded workspace lined with leather dictionary stands. Contains tactile mechanical keyboards alongside high-density multi-point network distribution ports.",
        image: "https://unsplash.com",
        floor: "South Annexe - 2nd Floor",
        capacity: 2,
        hourlyRate: 5,
        amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Clocktower Salon",
        description: "Located behind the historic campus clock tower mechanism. While gears chime softly, users can control dynamic motorized black-out blinds and high-definition video call matrix arrays.",
        image: "https://unsplash.com",
        floor: "Central Tower - 5th Floor",
        capacity: 5,
        hourlyRate: 14,
        amenities: ["Projector", "Wi-Fi", "Air Conditioning"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Botanical Scriptorium",
        description: "Surrounded by wrought-iron glass terrariums housing academic fern profiles. Walnut seating features integrated under-desk power hubs and multi-device fast wireless charging layouts.",
        image: "https://unsplash.com",
        floor: "Greenhouse Wing - 1st Floor",
        capacity: 4,
        hourlyRate: 9,
        amenities: ["Wi-Fi", "Power Outlets", "Air Conditioning"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Literae Hub",
        description: "Large team workspace utilizing solid brass task lamps and rolling library ladder frameworks. Motorized projection screens deploy smoothly from overhead exposed timber beams.",
        image: "https://unsplash.com",
        floor: "East Wing - 2nd Floor",
        capacity: 10,
        hourlyRate: 22,
        amenities: ["Projector", "Whiteboard", "Wi-Fi", "Power Outlets"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Parchment Pod",
        description: "Single-person focused workspace built out of warm cedar wood framing. Retrofitted with active ambient noise-canceling field generators for absolute deep focus parameters.",
        image: "https://unsplash.com",
        floor: "North Tower - Basement 1",
        capacity: 1,
        hourlyRate: 4,
        amenities: ["Quiet Zone", "Wi-Fi", "Power Outlets"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Folio Conservatory",
        description: "Brimming with uncatalogued architectural folios. Oak tables host built-in high-speed data nodes, USB-C utility channels, and dimmable heritage aesthetic task light configurations.",
        image: "https://unsplash.com",
        floor: "South Annexe - 3rd Floor",
        capacity: 3,
        hourlyRate: 7,
        amenities: ["Wi-Fi", "Power Outlets", "Quiet Zone"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Gutenberg Annex",
        description: "Industrial chic print shop aesthetic with cast-iron gears and drafting boards. Complemented by ceiling-mounted short-throw presentation beams and Gigabit network pathways.",
        image: "https://unsplash.com",
        floor: "West Wing - Basement Level 1",
        capacity: 6,
        hourlyRate: 11,
        amenities: ["Projector", "Wi-Fi", "Whiteboard", "Air Conditioning"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Renaissance Boardroom",
        description: "Grand cherrywood conference room hanging heavy tapestry details alongside 75-inch ultra-high-definition television interfaces for seamless remote student symposia calls.",
        image: "https://unsplash.com",
        floor: "Grand Atrium - Level 2",
        capacity: 12,
        hourlyRate: 25,
        amenities: ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Air Conditioning"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Chronos Cabin",
        description: "Steampunk-inspired studio workspace containing exposed grandfather clock weight components alongside high-fidelity studio microphones and structural audio isolation buffers.",
        image: "https://unsplash.com",
        floor: "North Tower - Top Level",
        capacity: 2,
        hourlyRate: 8,
        amenities: ["Wi-Fi", "Power Outlets", "Quiet Zone"],
        bookingCount: 0,
        createdAt: new Date()
    },
    {
        name: "The Codex Laboratory",
        description: "Lined with glass-protected rare manuscript configurations. Modern infrastructure handles micro-climate automated air filtration fields for sensitive reference text review paths.",
        image: "https://unsplash.com",
        floor: "East Wing - Vault Level 1",
        capacity: 4,
        hourlyRate: 13,
        amenities: ["Quiet Zone", "Wi-Fi", "Air Conditioning", "Power Outlets"],
        bookingCount: 0,
        createdAt: new Date()
    }
];

router.use(async (req, res, next) => {
    const { db } = req;
    try {
        const count = await db.collection("rooms").countDocuments();
        if (count === 0) {
            console.log("Rooms collection empty. Injecting 15 vintage-modern matrix seeds...");

            const systemOwnerId = new ObjectId("656f1a2b3c4d5e6f7a8b9c0d");
            const processedSeeds = vintageModernSeedRooms.map(room => ({
                ...room,
                ownerId: systemOwnerId
            }));
            await db.collection("rooms").insertMany(processedSeeds);
            console.log("Self-seeding processing algorithm finalized successfully.");
        }
    } catch (err) {
        console.error("Database seed failure:", err);
    }
    next();
});

router.get("/api/rooms", async (req, res) => {
    const { db } = req;
    const { search, amenities } = req.query;

    try {
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        if (amenities) {
            query.amenities = { $all: amenities.split(",") };
        }

        const rooms = await db.collection("rooms").find(query).toArray();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Failed to read data matrix maps." });
    }
});

router.get("/api/rooms/:id", async (req, res) => {
    const { db } = req;
    try {
        const room = await db.collection("rooms").findOne({ _id: new ObjectId(req.params.id) });
        if (!room) return res.status(404).json({ message: "Room listing not found." });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Invalid route mapping identifier." });
    }
});

router.post("/api/rooms", verifyToken, async (req, res) => {
    const { db } = req;
    const { name, description, image, floor, capacity, hourlyRate, amenities } = req.body;

    if (!name || !description || !image || !floor || !capacity || !hourlyRate) {
        return res.status(400).json({ message: "All form parameters are mandatory requirements." });
    }

    try {
        const newRoom = {
            ownerId: new ObjectId(req.user.id),
            name,
            description,
            image,
            floor,
            capacity: Number(capacity),
            hourlyRate: Number(hourlyRate),
            amenities: Array.isArray(amenities) ? amenities : [],
            bookingCount: 0,
            createdAt: new Date()
        };

        const result = await db.collection("rooms").insertOne(newRoom);
        res.status(201).json({ message: "Room added successfully", roomId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Database storage runtime transaction failure." });
    }
});

router.put("/api/rooms/:id", verifyToken, async (req, res) => {
    const { db } = req;
    const roomId = req.params.id;
    const userId = req.user.id;
    const { name, description, image, floor, capacity, hourlyRate, amenities } = req.body;

    try {
        const existingRoom = await db.collection("rooms").findOne({ _id: new ObjectId(roomId) });
        if (!existingRoom) return res.status(404).json({ message: "Room entity not found." });

        if (existingRoom.ownerId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized. You can only edit your own room listings." });
        }

        const updatedFields = {
            name,
            description,
            image,
            floor,
            capacity: Number(capacity),
            hourlyRate: Number(hourlyRate),
            amenities: Array.isArray(amenities) ? amenities : []
        };

        await db.collection("rooms").updateOne(
            { _id: new ObjectId(roomId) },
            { $set: updatedFields }
        );

        res.status(200).json({ message: "Room updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database update stream failure." });
    }
});

router.delete("/api/rooms/:id", verifyToken, async (req, res) => {
    const { db } = req;
    const roomId = req.params.id;
    const userId = req.user.id;

    try {
        const existingRoom = await db.collection("rooms").findOne({ _id: new ObjectId(roomId) });
        if (!existingRoom) return res.status(404).json({ message: "Target space entry missing." });

        if (existingRoom.ownerId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized. You can only delete your own room listings." });
        }

        await db.collection("rooms").deleteOne({ _id: new ObjectId(roomId) });

        await db.collection("bookings").updateMany(
            { roomId: new ObjectId(roomId) },
            { $set: { status: "cancelled" } }
        );

        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database drop process allocation error." });
    }
});

module.exports = router;
