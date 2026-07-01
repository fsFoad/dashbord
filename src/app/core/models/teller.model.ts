/** Teller (cashier) identity shown on the optional till-status widget. */
export interface TellerProfile {
  fullName: string;
  personnelNo: string;
  /** i18n key, e.g. 'teller.role.teller' */
  roleKey: string;
  branchCode: string;
  branchName: string;
  /** i18n key, e.g. 'teller.access.operator' */
  accessLevelKey: string;
}

export interface CurrencyBalance {
  code: string; // ISO 4217, e.g. 'USD'
  amount: number;
}

/** Cash-drawer balance for the signed-in teller. */
export interface TillBalance {
  /** base currency for `cash`/`transfer`, e.g. 'IRR' */
  currency: string;
  cash: number;
  transfer: number;
  others: CurrencyBalance[];
}

export type SystemStatusLevel = 'online' | 'degraded' | 'offline';

export interface SystemStatusItem {
  key: string;
  /** i18n key, e.g. 'teller.system.coreBanking' */
  labelKey: string;
  level: SystemStatusLevel;
}

/** Aggregate payload behind the optional teller till-status widget. */
export interface TellerDashboard {
  profile: TellerProfile;
  till: TillBalance;
  systemStatus: SystemStatusItem[];
  /** ISO datetime the snapshot was taken */
  asOf: string;
}
