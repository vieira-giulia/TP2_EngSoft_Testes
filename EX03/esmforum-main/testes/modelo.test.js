const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

// Teste 01
test('Testando cadastro de uma pergunta com texto vazio', () => {
  const id = modelo.cadastrar_pergunta('');
  const pergunta = modelo.get_pergunta(id);
  expect(pergunta.texto).toBe('');
});

// Teste 02
test('Testando cadastro de uma resposta com texto vazio', () => {
  const id_pergunta = modelo.cadastrar_pergunta('Qual é a fórmula da água?');
  const id_resposta = modelo.cadastrar_resposta(id_pergunta, '');
  const respostas = modelo.get_respostas(id_pergunta);
  expect(respostas[0].texto).toBe('');
});

// Teste 03
test('Testando a recuperação de uma pergunta inexistente', () => {
  const pergunta = modelo.get_pergunta(999);
  expect(pergunta).toBeUndefined();
});

// Teste 04
test('Testando a recuperação de respostas para uma pergunta inexistente', () => {
  const respostas = modelo.get_respostas(999);
  expect(respostas.length).toBe(0);
});

// Teste 05
test('Testando cadastro e recuperação de respostas', () => {
  const id_pergunta = modelo.cadastrar_pergunta('Qual é a capital da França?');
  const id_resposta_1 = modelo.cadastrar_resposta(id_pergunta, 'Paris');
  const id_resposta_2 = modelo.cadastrar_resposta(id_pergunta, 'Lyon');
  const respostas = modelo.get_respostas(id_pergunta);
  expect(respostas.length).toBe(2);
  expect(respostas[0].texto).toBe('Paris');
  expect(respostas[1].texto).toBe('Lyon');
});

// Teste 06
test('Testando contagem de respostas', () => {
  const id_pergunta = modelo.cadastrar_pergunta('Qual é a fórmula da água?');
  modelo.cadastrar_resposta(id_pergunta, 'H2O');
  modelo.cadastrar_resposta(id_pergunta, 'H2O2');
  const num_respostas = modelo.get_num_respostas(id_pergunta);
  expect(num_respostas).toBe(2);
});

// Teste 07
test('Testando reconfiguração do banco com mock', () => {
  const mockDb = require('../bd/bd_utils.js');
  mockDb.reconfig('./bd/esmforum-teste.db');
  expect(true).toBe(true);
});
