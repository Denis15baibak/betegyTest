const schema = {
    "items": {
        "required": [
            "userId",
            "id",
            "title",
            "body"
        ],
        "properties": {
            "userId": {
                "$id": "#/items/properties/userId",
                "type": "integer"
            },
            "id": {
                "$id": "#/items/properties/id",
                "type": "number",
                "minimum": 1,
                "exclusiveMaximum": 100
            },
            "title": {
                "$id": "#/items/properties/title",
                "type": "string"
            },
            "body": {
                "$id": "#/items/properties/body",
                "type": "string"
            }
        },
        "$id": "#/items",
        "type": "object"
    },
    "$id": "http://example.org/root.json#",
    "type": "array",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export default schema;