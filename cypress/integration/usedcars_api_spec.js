describe('Trade me used cars category api tests', () => {	
   const apiRoot = 'https://api.trademe.co.nz/v1/'; 
   beforeEach(() => {
     cy.request(apiRoot + 'Categories/UsedCars.json?with_counts=true').as('usedCarRequest'); 
   });
  
  it('Return the number of used car brands from the TradeMe UsedCars category api', () => {
    cy.get('@usedCarRequest')
      .its('body.Subcategories')
      .then((carCategories) => {
        cy.task('log', 'Number of used car brands = ' + carCategories.length);
    });
  });
   
  it('Return the number of Kia cars from the TradeMe UsedCars category', () => {   
     cy.get('@usedCarRequest')
       .its('body.Subcategories')
       .then((carCategories) => {
          let kiaCategory = carCategories.find(category => category.Name === "Kia");
          cy.task('log', 'Number of Kia cars = ' + kiaCategory.Count);                     
      });  
  });
 
  it('Expect the brand "Hispano Suiza" does not exist', () => {
    cy.get('@usedCarRequest')
      .its('body.Subcategories')
      .then((carCategories) => {
          let hispanoCategory = carCategories.find(category => category.Name === "Hispano Suiza");                   
          expect(hispanoCategory).to.be.undefined; //no Hispano Suiza found                 
      });
    });
    
});
