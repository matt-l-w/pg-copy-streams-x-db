rm -R people.csv
node genSourceData.js
psql -c "\\copy people FROM 'people.csv' WITH (FORMAT csv)"

