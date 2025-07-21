import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameData, setGameData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "mid",
    preferences: [],
    groupType: "solo"
  });

  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
