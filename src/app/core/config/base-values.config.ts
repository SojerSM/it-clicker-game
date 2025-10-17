export interface BaseValuesConfig {
  impact: {
    mpi: number;
    pps: number;
  };
  resources: {
    money: number;
    exp: number;
  };
}

export const BASE_VALUES: BaseValuesConfig = {
  impact: {
    mpi: 1,
    pps: 0,
  },
  resources: {
    money: 0,
    exp: 0,
  },
};
