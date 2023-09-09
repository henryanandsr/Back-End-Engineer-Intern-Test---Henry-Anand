const express = require('express')
const {connectToDb, getDb} = require('./db')
const app = express()
// connect to db
let db
connectToDb((err) => {
    if (!err) {
        db = getDb();
        if (db) {
            app.listen(3001, () => {
                console.log("Listening on port 3001");
            });
        } else {
            console.log("Database not connected");
        }
    } else {
        console.log("Error connecting to Database", err);
    }
});

//routes
app.get('/psikolog', (req, res) => {
    let psys = []
    db.collection('Psikolog')
        .find()
        .forEach(psy => psys.push(psy))
        .then(() => {
            res.status(200).json(psys)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch documents"})
        })
})
app.get('/reviews', (req, res) => {
    let revs = []
    db.collection('Review')
        .find()
        .forEach(rev => revs.push(rev))
        .then(() => {
            res.status(200).json(revs)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch documents"})
        })
})
app.get('/aggregatePsikolog', async (req, res) => {
    const pipeline = [
        {
            $lookup: {
                from: "Review",
                localField: "_id",
                foreignField: "psikolog_id",
                as: "reviews"
            }
        },
        {
            $unwind: {
                path: "$reviews",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                name: {
                    $first: "$name"
                },
                reviews: {
                    $push: "$reviews"
                },
                totalRating: {
                    $sum: "$reviews.rating"
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                reviews: 1,
                average_rating: {
                    $cond: [
                        { $eq: ["$count", 0] },
                        0,
                        { $divide: ["$totalRating", "$count"] }
                    ]
                }
            }
        }
    ];

    try {
        const aggregatedData = await db.collection('Psikolog').aggregate(pipeline).toArray();
        res.status(200).json(aggregatedData);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred while performing the aggregation." });
    }
});