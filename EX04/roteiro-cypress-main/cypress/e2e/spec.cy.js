describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca uma tarefa como concluída', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('Tarefa para marcar como concluída{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  });

  it('Desmarca tarefa como concluída', () => {
    cy.visit(''); 
  
    // Add a task
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para desmarcar{enter}');
  
    // Mark the task as completed
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();
  
    // Verify the task is marked as completed
    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  
    // Unmark the task (desmarcar)
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();
  
    // Verify the task is no longer completed
    cy.get('[data-cy=todos-list] > li')
      .should('not.have.class', 'completed');
  });

  it('Verifica o filtro "Todos" para mostrar todas as tarefas', () => {
    cy.visit(''); 
  
    // Add tasks
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
  
    // Ensure all tasks are added
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);
  
    // Click the "All" filter
    cy.get('[data-cy=filter-all-link]')
      .click();
  
    // Verify that all tasks are shown
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);
  });
});