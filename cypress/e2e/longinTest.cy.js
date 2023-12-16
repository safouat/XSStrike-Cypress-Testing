describe("Test de connexion", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8094/DiagnosticAI/Loginl");
  });

  afterEach(() => {
    cy.visit("http://localhost:8094/DiagnosticAI/Login1");
  });

  it("Test de connexion réussie", () => {
    cy.fixture("user.json").then((user) => {
      cy.get("#exampleInputEmaill").type(user.email);
      cy.get("#exampleInputPassword1").type(user.password);
      cy.get(".btn").click();
      cy.url().should("eq", "http://localhost:8094/DiagnosticAI/index.jsp");
    });
  });

  it("Test du message d'erreur", () => {
    cy.fixture("user.json").then((user) => {
      cy.get("#exampleInputEmaill").type(user.email);
      cy.get("#exampleInputPassword1").type("124");
      cy.get(".btn").click();
      cy.get(".alert-danger").should("be.visible");
    });
  });

  it("Test si le mot de passe et l'email sont de type password et email", () => {
    cy.get("#exampleInputPassword1").should("have.attr", "type", "password");
    cy.get("#exampleInputEmaill").should("have.attr", "type", "email");
  });

  it('Session dure plus de 30 minutes', () => {
    cy.fixture("user.json").then((user) => {
      cy.clock();
      const sessionDuration = 30 * 60 * 1000; // Correction: 30 minutes en millisecondes
      cy.login(user.email, user.password);
      cy.tick(sessionDuration);
      cy.get('.logout').contains("Logout").should('be.visible').then((element) => {
        cy.log("La session dure plus de 30 minutes");
      });
    });
  });
});
