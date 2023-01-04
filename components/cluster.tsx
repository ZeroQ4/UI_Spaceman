const endpoint = {
    http: {
      devnet: 'https://compatible-crimson-darkness.solana-mainnet.discover.quiknode.pro/5d2b42bea577b9f83bab8cbd1ab629a7648a97ac/',
      testnet: 'http://api.testnet.solana.com',
      'mainnet-beta': 'http://api.mainnet-beta.solana.com/',
    },
    https: {
      devnet: 'https://compatible-crimson-darkness.solana-mainnet.discover.quiknode.pro/5d2b42bea577b9f83bab8cbd1ab629a7648a97ac/',
      testnet: 'https://api.testnet.solana.com',
      'mainnet-beta': 'https://api.mainnet-beta.solana.com/',
    },
  };
  
  export type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';
  
  /**
   * Retrieves the RPC API URL for the specified cluster
   */
  export function clusterApiUrl(cluster?: Cluster, tls?: boolean): string {
    const key = tls === false ? 'http' : 'https';
  
    if (!cluster) {
      return endpoint[key]['devnet'];
    }
  
    const url = endpoint[key][cluster];
    if (!url) {
      throw new Error(`Unknown ${key} cluster: ${cluster}`);
    }
    return url;
  }
  