/// <reference types="cypress" />
import schema from '../schema/schema'

const Ajv = require("ajv").default
const ajv = new Ajv()

describe("Functional API Testing", () => {
    it("Functional API Testing", () => {
        // Get a random user (userID) and print out email address to console
        cy.request("https://jsonplaceholder.typicode.com/users").then((res) => {
            const randomUser = res.body[Math.floor(Math.random() * 10)];
            cy.log(randomUser.email);

            const randomIdUser = randomUser.id;
            // Using random userID, get user’s associated posts and verifying that they contain valid Post IDs (an Integer between 1 and 100).
            // check is in schema
            cy.request(`https://jsonplaceholder.typicode.com/posts?userId=${randomIdUser}`).then((res) => {
                const response = res.body;
                expect(ajv.validate(schema, response), JSON.stringify(ajv.errors)).to.be.true;
            })
            // sent post using the random userID with a non-empty title and body, verifying that response is returned correct status(201)
            // check that post is created with id 101
            cy.request({
                "url": `https://jsonplaceholder.typicode.com/posts?userId=${randomIdUser}`,
                "method": "POST",
                "headers": {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                "body": {
                    "title": 'foo',
                    "body": 'bar',
                }
            }).then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body.id).to.equal(101);
            })

        })

    })

})