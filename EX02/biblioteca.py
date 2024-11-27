from typing import List, Dict

from livro import Livro
from usuario import Usuario
from repositorio import Repositorio


class Biblioteca:
    def __init__(self, repo: Repositorio):
        self.repo = repo

    def adicionar_livro_acervo(self, livro: Livro):
        self.repo.adicionar_livro_acervo(livro.isbn, livro)

    def emprestar_livro(self, livro: Livro, usuario: Usuario):
        self.repo.emprestar_livro(livro, usuario)

    def receber_livro_emprestado(self, livro: Livro):
        self.repo.receber_livro_emprestado(livro)

    def livros_emprestados_usuario(self, usuario: Usuario) -> List[Livro]:
        return self.repo.livros_emprestados_usuario(usuario)
