export interface IAccount {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}
export interface IUnit {
  id: number;
  name: string;
  companyId: number;
}

export type AssetStatus = "inOperation" | "inDowntime" | "inAlert" | "unplannedStop";

export interface IAsset {
  assignedUserIds: number[];
  companyId: number;
  healthHistory: Array<{
    status: AssetStatus;
    timestamp: string;
  }>;
  healthscore: number;
  id: number;
  image: string;
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  model: string;
  name: string;
  sensors: string[];
  specifications: {
    maxTemp: number;
  };
  status: AssetStatus;
  unitId: number;
}
