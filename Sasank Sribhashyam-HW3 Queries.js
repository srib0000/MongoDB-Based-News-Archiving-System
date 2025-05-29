// Task (e) queries run on gpel9 (primary)

// Query 1
db.articles.insertOne({
  article_type: "news article",
  article_section: "Technology",
  article_id: 999,
  post_on_date: { day: 12, month: 4, year: 2025, time: "12:00:00" },
  reporter_name: "MS Dhoni",
  similar_stories: [],
  num_times_read: 0,
  article_text: "A brand new tech breakthrough in quantum computing.",
  comments: []
})

db.articles.find({ article_id: 999 }).pretty()

// Query 2
db.articles.find({ article_type: "news article" })
  .sort({ "post_on_date.year": -1, "post_on_date.month": -1, "post_on_date.day": -1, "post_on_date.time": -1 })
  .limit(1)
  .pretty()

// Query 3
db.articles.find({
  article_type: "news article",
  $or: [
    { "post_on_date.year": 2025, "post_on_date.month": 4 },
    { "post_on_date.year": 2025, "post_on_date.month": 3, "post_on_date.day": { $gte: 12 } }
  ]
})
.sort({ num_times_read: -1 })
.limit(10)
.pretty()

// Query 4
db.articles.updateOne(
  { article_id: 999 },
  { $push: {
      comments: {
        comment_id: 123,
        article_id: 999,
        user_id: "newuser@mail.com",
        posted_on_date: { day: 12, month: 4, year: 2025, time: "13:00:00" },
        comment_text: "This is a new comment for testing.",
        score: 10
      }
    }
  }
)

// Query 5
db.articles.find({ article_id: 999 }, { comments: 1, _id: 0 }).pretty()

db.articles.updateMany(
  {
    $text: { $search: "quantum" },
    $or: [
      { "post_on_date.year": { $gt: 2023 } },
      { "post_on_date.year": 2023, "post_on_date.month": { $gt: 4 } },
      { "post_on_date.year": 2023, "post_on_date.month": 4, "post_on_date.day": { $gte: 12 } }
    ]
  },
  {
    $push: {
      similar_stories: "https://thedaily.com/science/quantum-research-breakthrough.html"
    }
  }
)

db.articles.find(
  { article_id: 999 },
  { article_text: 1, similar_stories: 1, _id: 0 }
).pretty()



// Task (f) queries 

db.articles.insertOne({
  article_type: "news article",
  article_section: "Health",
  article_id: 1001,
  post_on_date: { day: 12, month: 4, year: 2025, time: "14:00:00" },
  reporters: [
    { name: "MS Dhoni", location: "Chennai" },
    { name: "Suresh Raina", location: "Ghaziabad" }
  ],
  similar_stories: [],
  num_times_read: 1500,
  article_text: "This article discusses healthcare AI in India.",
  comments: []
})

db.articles.find({ article_id: 1001 }).pretty()

db.articles.insertOne({
  article_type: "feature article",
  article_section: "Technology",
  article_id: 1002,
  post_on_date: { day: 12, month: 4, year: 2025, time: "15:00:00" },
  reporters: [
    { name: "Virat Kohli", location: "Delhi" },
    { name: "Rohit Sharma", location: "Mumbai" },
    { name: "KL Rahul", location: "Bangalore" },
    { name: "MS Dhoni", location: "Chennai" }
  ],
  similar_stories: [],
  num_times_read: 2600,
  article_text: "This article explores emerging cloud platforms.",
  comments: []
})

db.articles.find({ article_id: 1002 }).pretty()

// Task (g) queries

rs.initiate({
  _id: "theDailyReplica",
  members: [
    { _id: 0, host: "gpel9.cs.nor.ou.edu:24157" },
    { _id: 1, host: "gpel10.cs.nor.ou.edu:24157" },
    { _id: 2, host: "gpel11.cs.nor.ou.edu:24157" }
  ]
})

// Task (e) queries run on gpel10 (primary) after killing gpel9 for h(iii)

// Query 1
db.articles.insertOne({
  article_type: "news article",
  article_section: "Science",
  article_id: 56,
  post_on_date: { day: 1, month: 3, year: 2023, time: "10:00:00" },
  reporter_name: "Reporter 56",
  similar_stories: [],
  num_times_read: 500,
  article_text: "This article discusses the latest developments in science.",
  comments: []
})

db.articles.find({ article_id: 56 }).pretty()

// Query 2
db.articles.find({ article_type: "news article" }).sort({ "post_on_date.year": -1, "post_on_date.month": -1, "post_on_date.day": -1 }).limit(1).pretty()

// Query 3
db.articles.find({
  "post_on_date.year": 2023,
  "post_on_date.month": { $gte: 2 }  // 
}).sort({ num_times_read: -1 }).limit(10).pretty()


// Query 4
db.articles.updateOne(
  { article_id: 56 },
  {
    $push: {
      comments: {
        comment_id: 56,
        article_id: 56,
        user_id: "newuser@mail.com",
        posted_on_date: { day: 2, month: 3, year: 2023, time: "12:00:00" },
        comment_text: "Interesting article!",
        score: 10
      }
    }
  }
)

db.articles.find({ article_id: 56 }, { comments: 1 }).pretty()


// Query 5
db.articles.updateMany(
  {
    article_text: { $regex: /cricket/i },
    $or: [
      { "post_on_date.year": { $gt: 2023 } },
      {
        "post_on_date.year": 2023,
        "post_on_date.month": { $gte: 3 }
      }
    ]
  },
  {
    $addToSet: {
      similar_stories: "https://thedaily.com/sports/cricket-analysis-2025.html"
    }
  }
)

db.articles.find({
  article_text: /cricket/i,
  $or: [
    { "post_on_date.year": { $gt: 2023 } },
    {
      "post_on_date.year": 2023,
      "post_on_date.month": { $gte: 3 }
    }
  ]
}).pretty()

// Task (e) queries run on gpel11 (primary) after killing gpel10 for h(iii)

db.articles.insertOne({
  article_type: "feature article",
  article_section: "Health",
  article_id: 57,
  post_on_date: { day: 2, month: 3, year: 2023, time: "00:00:00" },
  reporter_name: "Suresh Raina",
  similar_stories: ["https://thedaily.com/health/story-57.html"],
  num_times_read: 5643,
  article_text: "A new report reveals major healthcare trends for 2023.",
  comments: []
})

db.articles.find({ article_id: 57 }).pretty()

db.articles.find().sort({ 
  "post_on_date.year": -1, 
  "post_on_date.month": -1, 
  "post_on_date.day": -1, 
  "post_on_date.time": -1 
}).limit(1).pretty()

db.articles.find({
  "post_on_date.year": 2023,
  "post_on_date.month": 1
}).sort({ num_times_read: -1 }).limit(10).pretty()


db.articles.updateOne(
  { article_id: 57 },
  { $push: {
      comments: {
        comment_id: 102,
        article_id: 57,
        user_id: "user102@mail.com",
        posted_on_date: { day: 2, month: 3, year: 2023, time: "12:00:00" },
        comment_text: "Very informative piece!",
        score: 15
      }
    }
  }
)

db.articles.find({ article_id: 57 }, { comments: 1, _id: 0 }).pretty()


db.articles.updateMany(
  {
    article_text: { $regex: /health/i },
    $or: [
      { "post_on_date.year": 2023 },
      { "post_on_date.year": 2024 },
      { "post_on_date.year": 2025 }
    ]
  },
  {
    $addToSet: {
      similar_stories: "https://thedaily.com/health/global-health-initiative.html"
    }
  }
)

db.articles.find({
  similar_stories: "https://thedaily.com/health/global-health-initiative.html"
}).pretty()