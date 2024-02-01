#! /bin/bash
# With credit to ChatGPT.

input_file="comics.json"
output_dir="content/comics"

rm -rf "$output_dir"
mkdir -p "$output_dir"

count=0
jq -c '.[]' "$input_file" | while read -r obj; do
	count=$((count + 1))
    title=$(echo "$obj" | jq -r '.title')
    date=$(echo "$obj" | jq -r '.date')
	author=$(echo "$obj" | jq -r '.author')
    image=$(echo "$obj" | jq -r '.image')
	source=$(echo "$obj" | jq -r '.source')
    note=$(echo "$obj" | jq -r '.note')

    filename=$(echo "$date-$count" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-zA-Z0-9-]//g')

    cat <<EOF >"$output_dir/$filename.md"
---
type: comics
title: "$title"
date: $date
author: $author
source: $source
image: /assets/comics/$image
slug: $count
---

![](/assets/comics/$image)

$note
EOF

done
