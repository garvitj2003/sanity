import dbConnect from "../../../lib/dbConnect";
import Bracket from "../../../model/Bracket";
import { TeamModel } from "../../../model/Team";
import { NextResponse } from "next/server";
import Tournament from "../../../model/Tournament";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 },
      );
    }

    const brackets = await Bracket.find({ userId: session.user._id });

    return NextResponse.json(brackets, { status: 200 });
  } catch (error) {
    console.error("Error fetching brackets:", error);
    return new NextResponse(
      JSON.stringify({
        success: true,
        data: [],
        message: "Error fetching brackets",
      }),
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 },
      );
    }

    const { tournament_name, format, consolationFinal, grandFinalType, teams } =
      body;

    const userId = session.user._id;

    if (
      !tournament_name ||
      !format ||
      !grandFinalType ||
      typeof consolationFinal !== "boolean" ||
      !teams ||
      teams.length < 4
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid input: Ensure all fields are filled and at least 4 teams are provided.",
        },
        { status: 400 },
      );
    }

    let matches = generateMatches(format, teams, consolationFinal);

    console.log("UserId", session.user._id);

    const newBracket = new Bracket({
      tournament_name,
      format,
      consolationFinal,
      grandFinalType,
      matches,
      teams,
      userId,
    });
    console.log(newBracket);

    await newBracket.save();

    return NextResponse.json(
      { message: "Bracket created successfully", id: newBracket._id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating bracket:", error);
    return NextResponse.json(
      {
        error: "Error creating bracket",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

function generateMatches(format, teams, consolationFinal) {
  let matches = [];

  if (format === "single_elimination") {
    matches = generateSingleElimination(teams, consolationFinal);
  } else if (format === "double_elimination") {
    matches = generateDoubleElimination(teams, consolationFinal);
  } else if (format === "round_robin") {
    matches = generateRoundRobin(teams);
  }

  return matches;
}

function generateSingleElimination(teams, consolationFinal) {
  let round = 1;
  let matches = [];
  let currentTeams = [...teams];

  // If the number of teams is odd, add a "BYE" team for the perfect match-up
  if (currentTeams.length % 2 !== 0) {
    currentTeams.push("BYE");
  }

  // Generate rounds until we have 1 winner
  while (currentTeams.length > 1) {
    let numMatches = currentTeams.length / 2;
    let roundMatches = [];

    for (let i = 0; i < numMatches; i++) {
      const team1 = currentTeams[i * 2];
      const team2 = currentTeams[i * 2 + 1];

      if (team1 !== "BYE" && team2 !== "BYE") {
        roundMatches.push({
          round: round,
          team1: team1,
          team2: team2,
          winner: null, // Winner will be determined later
        });
      } else if (team1 === "BYE") {
        roundMatches.push({
          round: round,
          team1: team2,
          team2: null,
          winner: team2, // Team 2 wins by default
        });
      } else if (team2 === "BYE") {
        roundMatches.push({
          round: round,
          team1: team1,
          team2: null,
          winner: team1, // Team 1 wins by default
        });
      }
    }

    matches.push(...roundMatches);
    // Update the currentTeams array with the winners of the current round
    currentTeams = roundMatches.map((match) => match.winner);

    round++;
  }
  // this is for the consolation final where we decide the 3rd place
  if (consolationFinal && matches.lenght >= 2) {
    const semiFinal = [
      matches[matches.length - 2].team1,
      matches[matches.length - 2].team2,
    ];

    matches.push({
      round: round,
      team1: semiFinal[0],
      team2: semiFinal[1],
    });
  }
  return matches;
}

function generateDoubleElimination(teams, consolationFinal) {}

function generateRoundRobin(teams) {}
