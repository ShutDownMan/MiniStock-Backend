export default {
    "definition": {
        "openapi": "3.0.0",
        "info": {
            "title": "MiniStock API Documentation",
            "version": "1.0.0",
            "description": "This is the API documentation for the MiniStock application. MiniStock is a stock management application that allows users to manage their stock portfolio. It is built with Node.js, Express, and MongoDB.",
            "license": {
                "name": "MIT",
                "url": "https://spdx.org/licenses/MIT.html"
            },
            "contact": {
                "name": "Jedson Gabriel",
                "url": "jesuisjedi.com",
                "email": "[email protected]"
            }
        },
        "servers": [
            {
                "url": "http://localhost:" + (process.env.PORT || 8080)
            }
        ]
    },
    "apis": [
        "./src/routes/*.ts"
    ]
}