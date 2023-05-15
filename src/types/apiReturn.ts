import { AssetStatusBadgeProps } from "~/modules/dashboard/components";

interface HealthHistoryEntry {
  status: 'inOperation' | 'inDowntime' | 'inAlert' | 'unplannedStop';
  timestamp: string;
}

interface Metrics {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
}

interface Specifications {
  rpm: number;
  power: number;
  maxTemp: number;
}

interface Asset {
  id: number;
  name: string;
  image: string;
  model: string;
  unitId: number;
  metrics: Metrics;
  companyId: number;
  sensors: string[];
  healthscore: number;
  status: AssetStatusBadgeProps;
  assignedUserIds: number[];
  specifications: Specifications;
  healthHistory: HealthHistoryEntry[];
}
