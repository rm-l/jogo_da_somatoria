"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import PlayerArea from "./components/PlayerArea";

export default function Home() {
  const [deckId, setDeckId] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("maria");
  const [mariaCards, setMariaCards] = useState([]);
  const [joaquimCards, setJoaquimCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [totalMariaScore, setTotalMariaScore] = useState(null);
  const [totalJoaquimScore, setTotalJoaquimScore] = useState(null);

  const startGame = async () => {
    const response = await fetch(
      "https://www.deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true"
    );
    const data = await response.json();
    setDeckId(data.deck_id);
    resetGame();
  };

  const resetGame = () => {
    setCurrentPlayer("maria");
    setMariaCards([]);
    setJoaquimCards([]);
    setGameOver(false);
    setWinner(null);
    setTotalMariaScore(null);
    setTotalJoaquimScore(null);
  };

  const drawCard = async () => {
    if (gameOver || !deckId) return;

    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    const card = data.cards[0];

    const newMariaCards =
      currentPlayer === "maria" ? [...mariaCards, card] : mariaCards;
    const newJoaquimCards =
      currentPlayer === "joaquim" ? [...joaquimCards, card] : joaquimCards;

    if (currentPlayer === "maria") {
      setMariaCards(newMariaCards);
    } else {
      setJoaquimCards(newJoaquimCards);
    }

    if (card.value === "JOKER") {
      setTotalMariaScore(null);
      setTotalJoaquimScore(null);
      setGameOver(true);
      setWinner(currentPlayer === "maria" ? "joaquim" : "maria");
      return;
    }

    if (newMariaCards.length + newJoaquimCards.length === 10) {
      endGame(newMariaCards, newJoaquimCards);
    }

    setCurrentPlayer(currentPlayer === "maria" ? "joaquim" : "maria");
  };

  const endGame = (mariaCards, joaquimCards) => {
    setGameOver(true);
    const mariaScore = calculateScore(mariaCards);
    const joaquimScore = calculateScore(joaquimCards);

    setTotalMariaScore(mariaScore);
    setTotalJoaquimScore(joaquimScore);

    if (mariaScore > joaquimScore) {
      setWinner("maria");
    } else if (joaquimScore > mariaScore) {
      setWinner("joaquim");
    } else {
      setWinner("empate");
    }
  };

  const calculateScore = (cards) => {
    return cards.reduce((total, card) => {
      if (!card || !card.value) return total;

      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        return (
          total +
          (card.value === "KING" ? 13 : card.value === "QUEEN" ? 12 : 11)
        );
      } else if (card.value === "ACE") {
        return total + 1;
      } else {
        const numericValue = parseInt(card.value);
        return isNaN(numericValue) ? total : total + numericValue;
      }
    }, 0);
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (winner && winner !== "empate") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [winner]);

  return (
    <div className="text-center p-5 w-full">
      <h1 className="text-3xl font-bold mb-6 text-white">Jogo da somatória</h1>
      <div
        className="cursor-pointer mx-auto my-5 w-[150px] hover:scale-105 transition-transform"
        onClick={drawCard}
      >
        <img
          src="https://www.deckofcardsapi.com/static/img/back.png"
          alt="Cartas"
          className="w-full"
        />
      </div>
      {gameOver && (
        <div
          className={`flex justify-items-center justify-center text-2xl my-5  ${
            winner === "empate" ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {winner === "empate" ? (
            <div className="bg-yellow-300 text-white p-4 rounded-md">
              Empate!
            </div>
          ) : (
            <div className="flex">
              {winner === "maria" ? (
                totalMariaScore ? (
                  <div className="bg-green-600 text-white p-4 rounded-md">
                    Maria Venceu!
                    <br /> {totalMariaScore} Pontos.
                  </div>
                ) : (
                  <div className="bg-green-600 text-white p-4 rounded-md">
                    Maria Venceu!
                  </div>
                )
              ) : totalJoaquimScore ? (
                <div className="bg-green-600 text-white p-4 rounded-md">
                  Joaquim Venceu! <br /> {totalJoaquimScore} Pontos.
                </div>
              ) : (
                <div className="bg-green-600 text-white p-4 rounded-md">
                  Joaquim Venceu!
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="flex justify-around my-5 mx-2 gap-4">
        <PlayerArea
          playerName="Maria"
          cards={mariaCards}
          score={calculateScore(mariaCards) || 0}
          isActive={currentPlayer === "maria" && !gameOver}
        />
        <PlayerArea
          playerName="Joaquim"
          cards={joaquimCards}
          score={calculateScore(joaquimCards) || 0}
          isActive={currentPlayer === "joaquim" && !gameOver}
        />
      </div>
      <button
        onClick={startGame}
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Reiniciar Jogo
      </button>
    </div>
  );
}
