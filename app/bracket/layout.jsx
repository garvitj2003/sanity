'use client'
import { TournamentProvider } from '../../context/tournamentContext'

export const BracketsLayout = ({children}) => {
  return (
    <TournamentProvider>
    <div>
      {children}
    </div>
    </TournamentProvider>
  )
}

export default BracketsLayout