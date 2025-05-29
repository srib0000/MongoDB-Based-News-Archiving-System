# MongoDB-Based News Archiving System

This project implements a MongoDB-based archival and querying system for a student newspaper platform, *The Daily*. It includes article storage, comment functionality, indexing strategies for efficient queries, and a high-availability deployment using MongoDB replica sets.

## Contents

├── Sasank Sribhashyam-HW3.pdf # Project report with ACID comparison and architecture
├── articleData.txt # JSON-formatted dataset of news and feature articles
├── txt_parser.py # Python script to parse and insert data into MongoDB
├── dataInsertion.js # MongoDB script to insert parsed articles
├── Indexes.js # Index definitions for query optimization
├── Queries.js # Frequently used MongoDB queries (insert, retrieve, update)


## Features

- **Dataset**: Contains over 50 news and feature articles with nested comments and metadata.
- **Insertions**: Efficient ingestion using custom parser and MongoDB scripts.
- **Queries Implemented**:
  1. Insert new articles
  2. Retrieve the latest article
  3. Retrieve top 10 most-read articles from the past month
  4. Add comments to existing articles
  5. Link similar stories based on keywords and publication date

## Indexing Strategy

- **Compound Index** on `post_on_date` and `num_times_read` for date-based retrievals.
- **Text Index** on `article_text` for full-text search.
- **Single Field Index** on `article_id` to support comment updates.

## Replica Set Deployment

Deployed on a 3-node replica set:

- **Primary**: `gpel9.cs.nor.ou.edu:24157`
- **Secondary**: `gpel10.cs.nor.ou.edu:24157`
- **Secondary**: `gpel11.cs.nor.ou.edu:24157`

### Benefits:

- **High Availability**: Auto-failover on primary node failure
- **Read Scalability**: Secondary nodes handle analytics queries
- **Fault Tolerance**: Quorum-based replication prevents data loss

## ACID Comparison

Included in the PDF report:
- Oracle 23ai vs MongoDB comparison across:
  - Atomicity
  - Consistency
  - Isolation
  - Durability

## Author

**Sasank Sribhashyam**  
CS 5513-001 — Advanced Database Management Systems  
University of Oklahoma
