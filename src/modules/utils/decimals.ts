export function applyDecimals(value: bigint, decimals: number): number {
  const factor = 10 ** decimals;
  return Number(value) / factor;
}
