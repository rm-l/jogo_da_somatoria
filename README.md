## Jogo da Somatória

Aplicação web interativa onde dois jogadores (Maria e Joaquim) competem somando o valor das cartas sorteadas.
Quem tiver a maior pontuação no final vence — a menos que um coringa seja sorteado e elimine o jogador da vez.

---

## Funcionalidades

- Dois jogadores alternam turnos.
- Sorteio de cartas usando a [Deck of Cards API](https://deckofcardsapi.com/).
- Curinga (`JOKER`) elimina o jogador que o sorteou e dá a vitória ao adversário.
- Após 10 cartas (5 para cada), a pontuação é somada e o vencedor é definido.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

---

## Instalação Local

1. Clone o repositório:

```bash
git clone https://github.com/rm-l/jogo_da_somatoria
```

2. Acesse o repositório

```bash
cd jogo_da_somatoria
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse o projeto em seu navegador:

```
http://localhost:3000
```
