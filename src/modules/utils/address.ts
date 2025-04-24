export function filterUniqueAddresses(addresses: string[]): `0x${string}`[] {
  return [...new Set(addresses.map(address => address.toLowerCase()))] as `0x${string}`[];
}

export function isSameAddress(address1: string, address2: string): boolean {
  return address1.toLowerCase() === address2.toLowerCase();
}

export function prettyAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
