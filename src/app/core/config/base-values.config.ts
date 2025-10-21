export interface BaseValuesConfig {
  impact: {
    mpi: number;
    pps: number;
  };
  progress: {
    sprint: number;
    sprintRequiredTickets: number;
  };
  resources: {
    money: number;
    exp: number;
  };
}

export const BASE_VALUES: BaseValuesConfig = {
  impact: {
    mpi: 10,
    pps: 0,
  },
  progress: {
    sprint: 1,
    sprintRequiredTickets: 10,
  },
  resources: {
    money: 0,
    exp: 0,
  },
};
