// Indexes to support frequently issued queries

// Query 1: Insert — no index needed.

// Query 2: Retrieve the latest news
db.articles.createIndex({
  "post_on_date.year": -1,
  "post_on_date.month": -1,
  "post_on_date.day": -1,
  "post_on_date.time": -1
});

// Query 3: Top 10 most read news in the past month
db.articles.createIndex({
  "post_on_date.year": -1,
  "post_on_date.month": -1,
  "post_on_date.day": -1,
  "num_times_read": -1
});

// Query 4: Add a comment to an article
db.articles.createIndex({ article_id: 1 });

// Query 5: Add a story to articles containing a word (full-text search) and published in last 2 years
db.articles.createIndex({ article_text: "text" });
db.articles.createIndex({
  "post_on_date.year": -1,
  "post_on_date.month": -1,
  "post_on_date.day": -1
});