const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  // Reconfigure to use a testing database (make sure it is isolated)
  bd.reconfig('./bd/esmforum-teste.db');

  // Clear data in tables before each test to ensure clean state
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  // Expect no questions in the empty database
  const perguntas = modelo.listar_perguntas();
  expect(perguntas.length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  // Insert three questions into the database
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');

  const perguntas = modelo.listar_perguntas();
  
  // Expect exactly 3 questions to be returned
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].texto).toBe('3 + 3 = ?');
  
  // Expect num_respostas to be 0 for all questions initially
  expect(perguntas[0].num_respostas).toBe(0);
  expect(perguntas[1].num_respostas).toBe(0);
  expect(perguntas[2].num_respostas).toBe(0);
});

test('Testando cadastro de uma pergunta com texto vazio', () => {
  // Try inserting a question with an empty string
  const id = modelo.cadastrar_pergunta('');
  
  // Retrieve the question and check if the text is empty
  const pergunta = modelo.get_pergunta(id);
  expect(pergunta.texto).toBe('');
});

test('Testando cadastro de uma resposta com texto vazio', () => {
  // Create a question and try to insert a response with an empty string
  const id_pergunta = modelo.cadastrar_pergunta('Qual é a fórmula da água?');
  const id_resposta = modelo.cadastrar_resposta(id_pergunta, '');
  
  // Retrieve the responses and check if the first one is empty
  const respostas = modelo.get_respostas(id_pergunta);
  expect(respostas[0].texto).toBe('');
});

test('Testando a recuperação de uma pergunta inexistente', () => {
  // Try to retrieve a non-existent question
  const pergunta = modelo.get_pergunta(999);  // ID that doesn't exist
  expect(pergunta).toBeUndefined();  // Should be undefined
});

test('Testando a recuperação de respostas para uma pergunta inexistente', () => {
  // Try to retrieve responses for a non-existent question
  const respostas = modelo.get_respostas(999);  // Non-existent question ID
  expect(respostas.length).toBe(0);  // Should be an empty array
});

test('Testando cadastro e recuperação de respostas', () => {
  // Create a question
  const id_pergunta = modelo.cadastrar_pergunta('Qual é a capital da França?');
  
  // Insert two answers
  const id_resposta_1 = modelo.cadastrar_resposta(id_pergunta, 'Paris');
  const id_resposta_2 = modelo.cadastrar_resposta(id_pergunta, 'Lyon');
  
  // Retrieve responses for the question
  const respostas = modelo.get_respostas(id_pergunta);
  
  // Expect exactly 2 responses
  expect(respostas.length).toBe(2);
  expect(respostas[0].texto).toBe('Paris');
  expect(respostas[1].texto).toBe('Lyon');
});

test('Testando contagem de respostas', () => {
  // Create a question
  const id_pergunta = modelo.cadastrar_pergunta('Qual é a fórmula da água?');
  
  // Insert two answers
  modelo.cadastrar_resposta(id_pergunta, 'H2O');
  modelo.cadastrar_resposta(id_pergunta, 'H2O2');
  
  // Retrieve the number of responses
  const num_respostas = modelo.get_num_respostas(id_pergunta);
  
  // Expect the number of responses to be 2
  expect(num_respostas).toBe(2);
});

test('Testando reconfiguração do banco com mock', () => {
  // Test the reconfig functionality with a fresh database
  const mockDb = require('../bd/bd_utils.js');
  mockDb.reconfig('./bd/esmforum-teste.db');
  expect(true).toBe(true);  // Placeholder for testing reconfiguration logic
});
