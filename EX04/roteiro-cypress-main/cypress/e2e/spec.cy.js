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

  // Teste 01
  it('Marca uma tarefa como concluída', () => {
    cy.visit(''); 

    // Adiciona tarefa
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para marcar como concluída{enter}');

    // Verifica se tarefa foi adicionada
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    // Marca tarefa como concluída
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();

    // Verifica se a tarefa foi marcada como concluída
    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  });

  // Teste 02
  it('Desmarca tarefa como concluída', () => {
    cy.visit(''); 
  
    // Adiciona tarefa
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para desmarcar{enter}');
    
    // Verifica se tarefa foi adicionada
    cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1);
  
    // Marca tarefa como concluída
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();
  
    // Verifica que a tarefa foi marcada como concluída
    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  
    // Desmarca a tarefa
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();
  
    // Verifica que a tarefa foi desmarcada como concluída
    cy.get('[data-cy=todos-list] > li')
      .should('not.have.class', 'completed');
  });

  // Teste 03
  it('Verifica o filtro "Todos" para mostrar todas as tarefas', () => {
    cy.visit(''); 
  
    // Adiciona tarefa
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
  
    // Verifica se todas as tarefas foram adicionadas
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);
  
    // Clica no filtro All
    cy.get('[data-cy=filter-all-link]')
      .click();
  
    // Verifica se todas as tarefas aparecem
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);
  });
});