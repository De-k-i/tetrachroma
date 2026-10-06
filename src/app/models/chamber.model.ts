export type ChamberSector = 'INNER_CELL' | 'LOYALTY' | 'HOROLOGY' | 'CRUMBLING_CASTLE';

export type ChamberDifficulty = 'INICIANTE' | 'PROVAÇÃO' | 'LETAL' | 'TETRACROMÁTICA';

export type ChamberStatus = 'ACTIVE' | 'UPCOMING';

export interface Chamber {
  id: number;
  code: string;
  name: string;
  sector: ChamberSector;
  sectorLabel: string;
  status: ChamberStatus;
  rotationLabel?: string;
  difficulty: ChamberDifficulty;
  difficultyLevel: number; // 1 to 5
  summary?: string;
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

