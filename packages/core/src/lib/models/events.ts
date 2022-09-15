

export const pgActivateNodeMode = {
  Single:'single',
  ByGroup:'byGroup',
  BySteps:'bySteps',
}

export type PgActivateNodeMode = typeof pgActivateNodeMode[keyof typeof pgActivateNodeMode]
