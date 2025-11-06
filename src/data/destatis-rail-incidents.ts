// Destatis: Accidents and casualties in railway transport by group of persons
// Source: https://www.destatis.de/EN/Themes/Society-Environment/Traffic-Accidents/Tables/accidents-casualties-rail-traffic.html (as at 14 Nov 2023)

export type DestatisRailYear = 2019 | 2020 | 2021 | 2022

export interface DestatisRailIncidentsRecord {
  year: DestatisRailYear
  accidentsInvolvingPersonalInjury: number
  casualties: {
    total: number
    passengers: number
    railwayStaff: number
    otherPersons: number
  }
  personsKilled: {
    total: number
    passengers: number
    railwayStaff: number
    otherPersons: number
  }
  personsSeriouslyInjured: {
    total: number
    passengers: number
    railwayStaff: number
    otherPersons: number
  }
  personsSlightlyInjured: {
    total: number
    passengers: number
    railwayStaff: number
    otherPersons: number
  }
}

export const destatisRailIncidents: DestatisRailIncidentsRecord[] = [
  {
    year: 2019,
    accidentsInvolvingPersonalInjury: 452,
    casualties: { total: 709, passengers: 114, railwayStaff: 230, otherPersons: 365 },
    personsKilled: { total: 147, passengers: 1, railwayStaff: 3, otherPersons: 143 },
    personsSeriouslyInjured: { total: 132, passengers: 16, railwayStaff: 9, otherPersons: 107 },
    personsSlightlyInjured: { total: 430, passengers: 97, railwayStaff: 218, otherPersons: 115 }
  },
  {
    year: 2020,
    accidentsInvolvingPersonalInjury: 432,
    casualties: { total: 646, passengers: 64, railwayStaff: 208, otherPersons: 374 },
    personsKilled: { total: 160, passengers: 2, railwayStaff: 6, otherPersons: 152 },
    personsSeriouslyInjured: { total: 103, passengers: 6, railwayStaff: 15, otherPersons: 82 },
    personsSlightlyInjured: { total: 383, passengers: 56, railwayStaff: 187, otherPersons: 140 }
  },
  {
    year: 2021,
    accidentsInvolvingPersonalInjury: 395,
    casualties: { total: 615, passengers: 31, railwayStaff: 252, otherPersons: 332 },
    personsKilled: { total: 124, passengers: 0, railwayStaff: 8, otherPersons: 116 },
    personsSeriouslyInjured: { total: 98, passengers: 4, railwayStaff: 7, otherPersons: 87 },
    personsSlightlyInjured: { total: 393, passengers: 27, railwayStaff: 237, otherPersons: 129 }
  },
  {
    year: 2022,
    accidentsInvolvingPersonalInjury: 490,
    casualties: { total: 927, passengers: 250, railwayStaff: 294, otherPersons: 383 },
    personsKilled: { total: 170, passengers: 8, railwayStaff: 8, otherPersons: 154 },
    personsSeriouslyInjured: { total: 154, passengers: 37, railwayStaff: 13, otherPersons: 104 },
    personsSlightlyInjured: { total: 603, passengers: 205, railwayStaff: 273, otherPersons: 125 }
  }
]

export const latestDestatisRail = destatisRailIncidents.find(r => r.year === 2022)!



