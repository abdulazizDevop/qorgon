
export enum HealthStatus {
  HEALTHY = 'Healthy',
  DISEASED = 'Diseased',
  NOT_PLANT = 'NotPlant'
}

export enum UserRole {
  ADMIN = 'Admin',
  FARMER = 'Farmer',
  USER = 'Regular User'
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface AnalysisResult {
  plant: string;
  status: HealthStatus;
  disease_name: string;
  confidence: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  risk_level: RiskLevel;
}

export interface RegionOutbreak {
  id: string;
  name: string;
  disease_count: number;
  main_disease: string;
  risk: RiskLevel;
  path: string; // SVG path for the map
}

export type AppState = 
  | 'HOME' 
  | 'DATABASE' 
  | 'ANALYZER' 
  | 'ANALYZING' 
  | 'RESULT' 
  | 'ERROR' 
  | 'GREEN_MAP' 
  | 'DASHBOARD' 
  | 'AUTH'
  | 'PHARMACY'
  | 'AI_AGRONOM';
