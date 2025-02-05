"use client";

import { Crown, Share2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

const testTournament = {
  tournamentName: "BGMI Prom leauge ",
  gameType: "BGMI",
  matches: [
    {
      id: "1",
      stageName: "Playoffs - Losers Bracket",
      roundNumber: "LB Round 5",
      opponent1Name: "Molten Army",
      opponent2Name: "Les Roublards",
      status: "completed",
      result: "win",
    },
    {
      id: "2",
      stageName: "Playoffs - Grand Final",
      roundNumber: "GF Round 1",
      opponent1Name: "Viperz",
      opponent2Name: "Molten Army",
      status: "pending",
    },
    {
      id: "3",
      stageName: "League - Division 1",
      roundNumber: "Day 1",
      opponent1Name: "UUU",
      opponent2Name: "TripleMen",
      status: "pending",
    },
    {
      id: "4",
      stageName: "League - Division 1",
      roundNumber: "Day 2",
      opponent1Name: "Viperz",
      opponent2Name: "ArticGaming",
      status: "pending",
    },
  ],
  totalMatches: 63,
  remainingMatches: 42,
};

export default function TournamentMatches() {
  // const [matches, setMatches] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const unwrappedId = React.use(params);

  // useEffect(() => {
  //   const fetchMatches = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/tournaments/${unwrappedId.id}/matches`,
  //       );
  //       const data = await response.json();

  //       if (!response.ok) throw new Error(data.error);

  //       setMatches(data.matches);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //     // fetchMatches();
  //   };
  // }, [unwrappedId.id, fetchMatches]);

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "In Progress";``
      case 2:
        return "Pending";
      case 3:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  // if (!loading) return <div>Loading matches...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-950">
      {/* Tournament Header */}
      <div className="border-b border-purple-800/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {testTournament.tournamentName}
                </h1>
                <p className="text-purple-300">{testTournament.gameType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 rounded-lg">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="bg-purple-900/20 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-purple-100">
              Matches overview
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-white">
                  {testTournament.totalMatches}
                </p>
                <p className="text-sm text-purple-300">Matches</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-blue-400">
                  {testTournament.remainingMatches}
                </p>
                <p className="text-sm text-purple-300">Remaining</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Matches List */}
        <div className="space-y-4 rounded-lg">
          {testTournament.matches.map((match) => (
            <Card
              key={match.id}
              className="bg-purple-900/20 p-4 transition-all hover:bg-purple-900/30 rounded-xl"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <p className="text-sm text-purple-300">
                      Match #{match.id} | {match.roundNumber}
                    </p>
                    <Badge
                      variant="outline"
                      className={`${
                        match.status === "completed"
                          ? "border-green-500 text-green-500"
                          : "border-purple-500 text-purple-500"
                      } px-2 py-1 text-xs`}
                    >
                      {match.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-purple-200">
                    {match.stageName}
                  </p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex-1 text-right sm:text-left">
                    <p
                      className={`font-semibold ${match.result === "win" ? "text-green-400" : "text-white"} px-2 py-1 text-sm`}
                    >
                      {match.opponent1Name}
                    </p>
                  </div>
                  <span className="text-purple-300">vs</span>
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${match.result === "loss" ? "text-green-400" : "text-white"}`}
                    >
                      {match.opponent2Name}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
