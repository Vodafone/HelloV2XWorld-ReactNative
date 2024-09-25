export const StationTypes: {stationType: string, value: number}[] = [
  { stationType: "PEDESTRIAN", value: 1 },
  { stationType: "CYCLIST", value: 2 },
  { stationType: "MOPED", value: 3 },
  { stationType: "MOTORCYCLE", value: 4 },
  { stationType: "PASSENGER CAR", value: 5 },
  { stationType: "BUS", value: 6 },
  { stationType: "LIGHT TRUCK", value: 7 },
  { stationType: "HEAVY TRUCK", value: 8 },
  { stationType: "TRAILER", value: 9 },
  { stationType: "SPECIAL VEHICLES", value: 10 },
  { stationType: "TRAM", value: 11 },
  { stationType: "ROAD SIDE UNITS", value: 15 },
  { stationType: "ANIMAL", value: 90 },
  { stationType: "UNKNOWN", value: 0 },
];

export function getStationType(value: number): {stationType: string, value: number} {
  let types =  StationTypes.filter(stationType => (stationType.value === value));
  return types.length > 0 ? types[0] : { stationType: "PASSENGER CAR", value: 5 };
}
