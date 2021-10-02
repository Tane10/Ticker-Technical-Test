# How to run

- npm i
- npm start

## Example curl

curl for mk robot version 1

``` bash
curl --location --request POST 'http://localhost:5000/robotspiders/commands/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startingCoordinates": {
        "X": 10,
        "Y": 50
    },
    "movementCommands": "FRRRFFFFRFRFFFRFFLRLFFFFLRFF"
}'
```

curl for mk robot version 2

``` bash
curl --location --request POST 'http://localhost:5000/robotspiders/commands/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startingCoordinates": {
        "X": 10,
        "Y": 50
    },
    "movementCommands": "FRRRFFFFRFRFFFRFFLRLFFFFLRFF"
}'
```
