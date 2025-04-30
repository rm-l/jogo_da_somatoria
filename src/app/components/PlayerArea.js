import Image from "next/image";

export default function PlayerArea({ playerName, cards, score, isActive }) {
  return (
    <div
      className={`border rounded-lg p-3 w-[45%] text-white ${
        isActive ? "shadow-lg bg-green-800 shadow-green-950" : "border-gray-300"
      }`}
    >
      <h2 className="text-xl font-semibold mb-2">{playerName}</h2>
      <div className="flex min-h-[120px] items-end relative">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative"
            style={{
              zIndex: index,
              marginLeft: index > 0 ? "-60px" : "0",
            }}
          >
            <Image
              src={card.image}
              width={200}
              height={200}
              alt={`${card.value} de ${card.suit}`}
              className="h-[120px] w-auto hover:translate-y-[-10px] hover:scale-105 transition-transform shadow-md rounded-md"
            />
          </div>
        ))}
      </div>
      <p className="mt-2">
        Pontuação: <span className="font-bold">{score}</span>
      </p>
    </div>
  );
}
