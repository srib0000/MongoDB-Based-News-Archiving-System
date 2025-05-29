import json

input_file = "articleData.txt"
output_file = "dataInsertion.js"

with open(input_file, "r") as infile:
    lines = infile.readlines()

with open(output_file, "w") as outfile:
    outfile.write("// MongoDB Data Insertion Script\n")
    outfile.write("use dailyNewsArchive;\n")  
    outfile.write("db.articles.drop();\n")
    outfile.write("db.createCollection('articles');\n\n")

    for line in lines:
        line = line.strip()
        if line:
            outfile.write(f"db.articles.insertOne({line});\n")

print(f" MongoDB insertion script '{output_file}' has been generated.")







