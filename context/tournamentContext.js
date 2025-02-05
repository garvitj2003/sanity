// tournamentContext.js
import { createContext, useContext, useState } from "react";

const TournamentContext = createContext();

export function TournamentProvider({ children }) {
  const [tournamentData, setTournamentData] = useState(null);
  return (
    <TournamentContext.Provider value={{ tournamentData, setTournamentData }}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament() {
  return useContext(TournamentContext);
}