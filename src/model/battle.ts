import { PilotSummary } from "./pilot";

export class BattleSummary {
  constructor(
    public code: string,
    public nr: number,
    public name: string,
    public missions: number,
    public ratingAvg: string,
    public URL: string
  ) {}
}

export class Battle extends BattleSummary {
  constructor(
    code: string,
    nr: number,
    name: string,
    missions: number,
    ratingAvg: string,
    URL: string,
    public added: string,
    public updated: string,
    public comments: string,
    public medal: string,
    public medalFilename: string,
    public wavpackFilename: string,
    public reviews: Review[],
    public bugs: Bug[],
    public creators: PilotSummary[],
    public patches: string[],
    public highScores: Score[],
    public statistics: Statistics
  ) {
    super(code, nr, name, missions, ratingAvg, URL);
  }
}

export interface Review {
  pilot: PilotSummary;
  date: string;
  rating: number;
  review: string;
}
export interface Bug {
  pilot: PilotSummary;
  date: string;
  report: string;
}
export interface Score {
  pilot: PilotSummary;
  score: number;
  date: string;
}
export interface Statistics {
  uniquePilots: number;
  totalBSFs: number;
}
