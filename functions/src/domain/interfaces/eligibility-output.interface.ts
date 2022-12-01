export interface EligibilityOutput {
  eligible: boolean;
  co2Economy?: number;
  notEligibleReasons?: string[];
}
