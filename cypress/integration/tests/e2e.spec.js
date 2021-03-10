/// <reference types="cypress" />
import { TOURNAMENTS_SELECT, GROUP_SELECT, GROUP_TABLE_CHECKBOX, SEARCH_TOURNAMENTS_INPUT, STAGE_SELECT, CONSTRUCT_BUTTON, NOTIFICATIONS_BLOCK, TO_BASKET_BUTTON, CARD_PREVIEW } from '../locators/mainPage'
import { BASKET, BASKET_COUNTER } from '../locators/menu'
import { DELETE_ALL_BUTTON } from '../locators/basket'

describe("Functional E2E Automation", () => {

    beforeEach("pre-conditions", () => {
        cy.visit("/");
        cy.log("login")
        cy.fixture('users').as('users');
        cy.get("@users").then((user) => {
            // login located in cypress\support\commands.js
            cy.login(user.email, user.password);
        })
        cy.get("#user-nav-item").click();
        cy.get("#user-menu .nav-link").should("have.text", "Sign out");
    })

    // in this test i don`t use if condition because this is conditional testing and cypress developers do not recommend using it in tests
    it("tournament list is not empty", () => {
        cy.get(TOURNAMENTS_SELECT).click();
        // check that TOURNAMENTS_SELECT have at least 2 item and it include Search tournament item
        cy.get(TOURNAMENTS_SELECT).find(".navbar-nav .nav-item").then(($el) => {
            cy.get($el).should("have.length.at.least", 2);
            cy.get($el).first().should("have.text", "Search tournament");
            cy.get($el).eq(1).find("span").should("not.have.text", "Search tournament").click().trigger("click");
        })
    })

    it("Check and confirm the stages available", () => {
        // select stage mode in a GROUP_SELECT and check that active value is a stage mode
        // then click GROUP_TABLE_CHECKBOX and check that this item have class active
        cy.get(GROUP_SELECT).click();
        cy.contains('Stage mode').click();
        cy.wait(200);
        cy.get(".input-form.btg-selector.select-game").trigger("click").should("have.attr", "aria-expanded").should("include", "false");
        cy.wait(200);
        cy.get(GROUP_SELECT).find(".active-txt").should("have.text", "Stage mode");
        cy.get(GROUP_TABLE_CHECKBOX).click();
        cy.get(".card-checkbox-list .nav-item").should("have.class", "active");

        // select Search tournament in a TOURNAMENTS_SELECT
        // in a SEARCH_TOURNAMENTS_INPUT type 2020 BLAST Premier Global Final and select it in a list
        cy.get(TOURNAMENTS_SELECT).click();
        cy.get(TOURNAMENTS_SELECT).find(".nav-item .nav-link").first().should("have.text", "Search tournament").click();
        cy.wait(200);
        cy.get(".input-form.btg-selector.select-league").trigger("click").should("have.attr", "aria-expanded").should("include", "false");
        cy.wait(200);
        cy.get(SEARCH_TOURNAMENTS_INPUT).find(".input-form").type("2020 BLAST Premier Global Final{enter}");
        cy.get("#past-leagues-group .nav-item .nav-link").should("be.visible").and("have.text", "2020 BLAST Premier Global Final").click();

        // select first item in a STAGE_SELECT , getting its name, then i compare resulting name with the name in a STAGE_SELECT
        cy.get(STAGE_SELECT).click();
        cy.get(STAGE_SELECT).find(".nav-item .nav-link").then(($el) => {
            const itemName = $el.text();
            cy.get($el).eq(0).click();

            cy.wait(200);
            cy.get(".input-form.btg-selector.select-stage").trigger("click").should("have.attr", "aria-expanded").and("include", "false");
            cy.wait(200);
            cy.get(STAGE_SELECT).find(".active-txt").should("have.text", itemName);
        })
        // click on CONSTRUCT_BUTTON and check that NOTIFICATIONS_BLOCK have correct title and text
        cy.get(CONSTRUCT_BUTTON).click();

        cy.get(NOTIFICATIONS_BLOCK).find(".title").should("have.text", "Notification").and("be.visible");
        cy.get(NOTIFICATIONS_BLOCK).find(".text").should("have.text", "Pictures have been generated.").and("be.visible");
        cy.get(".notification-box.collapse.show").invoke("removeClass", "show");

        // hover on CARD_PREVIEW  after that i click on TO_BASKET_BUTTON and check that NOTIFICATIONS_BLOCK have correct title and text
        // check that BASKET_COUNTER have correct number
        cy.get(CARD_PREVIEW).realHover();
        cy.get(TO_BASKET_BUTTON).should("be.visible").and("have.text", "To Basket").click();
        cy.get(NOTIFICATIONS_BLOCK).find(".text").should("have.text", "The item has been added to the basket.").and("be.visible");
        cy.get(".notification-box.collapse.show").invoke("removeClass", "show");
        cy.get(BASKET_COUNTER).should("have.text", "1");

        //go to basket and check that 2020 BLAST Premier Global Final exist in a page
        cy.get(BASKET).click();
        cy.get(".game-name").should("have.text", "2020 BLAST Premier Global Final");

        // delete all product and check that text The Basket is Empty. Please Add Items. is exist
        cy.get(DELETE_ALL_BUTTON).eq(0).click();
        cy.get(".title").should("have.text", "The Basket is Empty. Please Add Items.");

    })

})