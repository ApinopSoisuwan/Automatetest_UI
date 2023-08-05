import { slowCypressDown } from "cypress-slow-down";
import "cypress-file-upload";
chai.use(require("chai-sorted"));
slowCypressDown(500);

describe("Case", () => {
  describe("Automate test UI", () => {
    beforeEach(() => {
      cy.visit("https://the-internet.herokuapp.com/");
    });
    it("File Upload(PASS)", () => {
      // - File Upload
      cy.get('a[href="/upload"]').click();

      const image = "test.jpg";
      cy.get("#file-upload").attachFile(image, {
        force: true,
      });
      cy.get("#file-submit").click();

      cy.contains("File Uploaded!").should("be.visible");
      cy.contains("test.jpg").should("be.visible");
    });
    it("File Upload(FAILED)", () => {
      // - File Upload
      cy.get('a[href="/upload"]').click();

      cy.get("#file-submit").click();

      cy.contains("Internal Server Error").should("be.visible");
    });
    it("Multiple Windows", () => {
      // - Multiple Windows
      cy.get('a[href="/windows"]').click();
      cy.get('a[href="/windows/new"]').invoke("removeAttr", "target").click();
      cy.contains("New Window").should("be.visible");
    });
    it.only("Sortable Data Tables", () => {
      // - Sortable Data Tables"
      cy.get('a[href="/tables"]').click();

      // 1 table
      for (let i = 1; i <= 5; i++) {
        if (i === 4) {
          cy.get(`#table1 > thead > tr > :nth-child(${i})`)
            .click()
            .get(`#table1 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(
                names.map((element) => parseInt(element.replace("$", ""), 10))
              ).to.be.ascending;
            });
          cy.get(".headerSortDown")
            .click()
            .get(`#table1 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(
                names.map((element) => parseInt(element.replace("$", ""), 10))
              ).to.be.descending;
            });
        } else {
          cy.get(`#table1 > thead > tr > :nth-child(${i})`)
            .click()
            .get(`#table1 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(names).to.be.ascending;
            });
          cy.get(".headerSortDown")
            .click()
            .get(`#table1 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(names).to.be.descending;
            });
        }
        cy.get("#table1 > tbody >> :nth-child(1)").should("have.length", 4);
      }

      // 2 table
      for (let i = 1; i <= 5; i++) {
        if (i === 4) {
          cy.get(`#table2 > thead > tr > :nth-child(${i})`)
            .click()
            .get(`#table2 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(
                names.map((element) => parseInt(element.replace("$", ""), 10))
              ).to.be.ascending;
            });
          cy.get(".headerSortDown")
            .click()
            .get(`#table2 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(
                names.map((element) => parseInt(element.replace("$", ""), 10))
              ).to.be.descending;
            });
        } else {
          cy.get(`#table2 > thead > tr > :nth-child(${i})`)
            .click()
            .get(`#table2 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(names).to.be.ascending;
            });
          cy.get(".headerSortDown")
            .click()
            .get(`#table2 > tbody >> :nth-child(${i})`)
            .should(($cells) => {
              const names = Cypress._.map($cells, ($cell) => $cell.innerText);
              console.log(names);
              expect(names).to.be.descending;
            });
        }
        cy.get("#table2 > tbody >> :nth-child(1)").should("have.length", 4);
      }
    });
  });
});
