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
    it("Sortable Data Tables", () => {
      // - Sortable Data Tables"
      cy.get('a[href="/tables"]').click();

      cy.get("#table1 > thead").click();
      cy.get('#table1 > tbody >  > :nth-child(1)').then(($titles) => {
        const title = $titles.toArray().map(($el) => $el.innerText);
        expect(title.sort()).to.be.sorted();
      });

      cy.get("#table2 > thead ").click();
      cy.get("#table2 > tbody > > .last-name").then(($titles) => {
        const title = $titles.toArray().map(($el) => $el.innerText);
        expect(title.sort()).to.be.sorted();
      });
    });
  });
});
// });
