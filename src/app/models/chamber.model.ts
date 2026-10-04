export type ChamberSector = 'INNER_CELL' | 'LOYALTY' | 'HOROLOGY' | 'CRUMBLING_CASTLE';

export type ChamberDifficulty = 'INICIANTE' | 'PROVAÇÃO' | 'LETAL' | 'TETRACROMÁTICA';

export interface Chamber {
  id: number;
  apiOriginalId: number;
  code: string;
  name: string;
  sector: ChamberSector;
  sectorLabel: string;
  difficulty: ChamberDifficulty;
  difficultyLevel: number; // 1 to 5
  description: string;
  ritualLore: string;
  timeLimitMinutes: number;
  minInitiates: number;
  maxInitiates: number;
  escapeSuccessRate: number; // percentage (e.g. 23%)
  pricePerInitiate: number; // BRL
  argSecretCode: string;
  argClue: string;
  argDiscountPercent: number;
  isUnlocked?: boolean;
}

export interface ChamberFilter {
  query: string;
  sector: ChamberSector | 'ALL';
  difficulty: ChamberDifficulty | 'ALL';
}
