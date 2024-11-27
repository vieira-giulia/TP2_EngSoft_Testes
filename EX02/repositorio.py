
from excecao import ExcecaoLivroEmprestado

class Repositorio:
    def __init__(self):
        self.acervo = {}
        self.emprestimos = {}

    def adicionar_livro_acervo(self, isbn, livro):
        self.acervo[isbn] = livro

    def emprestar_livro(self, livro, usuario):
        if livro.isbn in self.emprestimos:
            raise ExcecaoLivroEmprestado(f"Livro '{livro.nome}' já está emprestado.")
        self.emprestimos[livro.isbn] = usuario

    def receber_livro_emprestado(self, livro):
        if livro.isbn in self.emprestimos:
            del self.emprestimos[livro.isbn]

    def livros_emprestados_usuario(self, usuario):
        return [
            livro for isbn, livro in self.acervo.items()
            if self.emprestimos.get(isbn) == usuario
        ]