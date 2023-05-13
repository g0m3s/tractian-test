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
  maxTemp: number;
}

type AssetStatus = 'inOperation' | 'inDowntime' | 'inAlert' | 'unplannedStop'

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
  status: AssetStatus;
  assignedUserIds: number[];
  specifications: Specifications;
  healthHistory: HealthHistoryEntry[];
}
