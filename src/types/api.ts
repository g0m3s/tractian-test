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

export interface IUser {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}

export type AssetStatus =
  | "inOperation"
  | "inDowntime"
  | "inAlert"
  | "unplannedStop";

export interface IAsset {
  assetId: number;
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

type WorkOrderStatus = "todo" | "completed" | "in progress";

export interface IWorkOrder {
  assetId: number;
  assignedUserIds: number[];
  checklist: Array<{
    task: string;
    completed: boolean;
  }>;
  description: string;
  id: number;
  priority: "high";
  status: WorkOrderStatus;
  title: string;
}

export interface ICompany {
  id: string;
  name: string;
}

export interface FullReturn {
  users: IUser[];
  units: IUnit[];
  assets: IAsset[];
  companies: ICompany[];
  workorders: IWorkOrder[];
}
