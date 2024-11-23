import { PublicKey, Connection } from '@solana/web3.js';
import { 
  FAKE_TOKEN_MINT, 
  PoolToken, 
  TokenMeta, 
  makeHeliusTokenFetcher 
} from 'gamba-react-ui-v2';
import { fetchAmmPools } from '@raydium-io/raydium-sdk';

// Get RPC from the .env file or default to the public RPC.
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT ?? 'https://api.mainnet-beta.solana.com';

// Solana address that will receive fees when somebody plays on this platform
export const PLATFORM_CREATOR_ADDRESS = new PublicKey(
  'EXjZJegm5i4mESkVmPDhcxvdvTrXbFERnPtYrga9jAUf',
);

// Gamba explorer URL - Appears in RecentPlays
export const EXPLORER_URL = 'https://solscan.io/';

// Platform URL - Appears in ShareModal
export const PLATFORM_SHARABLE_URL = 'play.gamba.so';

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 0.01; // 1% (1/100 = 0.01)  !!max 5%!!

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.001; // 0.1% (0.1/100 = 0.001)

// Helper function to create pool tokens
const lp = (tokenMint: PublicKey | string, poolAuthority?: PublicKey | string): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority: poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
});

/**
 * Fetch Raydium Liquidity Pools
 * Dynamically fetches available Raydium pools for supported tokens.
 */
export const fetchRaydiumPools = async (connection: Connection) => {
  const pools = await fetchAmmPools(connection);
  console.log('Fetched Raydium Pools:', pools);

  // Filter pools based on tokens you support (e.g., USDC, SOL)
  return pools.filter(pool => 
    ['So11111111111111111111111111111111111111112', 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', '9hTF4azRpZQFqgZ3YpgACD3aSbbB4NkeEUhp7NKZvmWe',].includes(
      pool.tokenMintA.toBase58()
    )
  );
};

/**
 * List of pools supported by this platform.
 * Dynamically fetches Raydium pools and adds them to the list.
 */
export const POOLS = [
  lp(FAKE_TOKEN_MINT), // Fake token
  lp('So11111111111111111111111111111111111111112'), // SOL
  lp('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC
  lp('5ZN19wdWkAbFi6qYGyBARCVjxFzSgewenYj59GSDyq7t'), // ACRES
];

/**
 * Dynamically add Raydium pools to the supported pool list.
 */
export const updatePoolsWithRaydium = async (connection: Connection) => {
  const raydiumPools = await fetchRaydiumPools(connection);
  raydiumPools.forEach(pool => {
    const mint = pool.tokenMintA.toBase58();
    if (!POOLS.some(p => p.token.toBase58() === mint)) {
      POOLS.push(lp(mint));
    }
  });
};

// The default token to be selected
export const DEFAULT_POOL = POOLS[0];

/**
 * List of token metadata for the supported tokens.
 */
export const TOKEN_METADATA: (Partial<TokenMeta> & { mint: PublicKey })[] = [
  {
    mint: FAKE_TOKEN_MINT,
    name: 'Fake',
    symbol: 'FAKE',
    image: '/fakemoney.png',
    baseWager: 1e9,
    decimals: 9,
    usdPrice: 0,
  },
  {
    mint: new PublicKey('9hTF4azRpZQFqgZ3YpgACD3aSbbB4NkeEUhp7NKZvmWe'),
    name: 'REPARATIONS',
    symbol: 'ACRES',
    image: '/MLK LOGO.JPG',
    baseWager: 1e6,
    decimals: 6,
    usdPrice: 0,
  },
];

/** HTML to display to user that they need to accept in order to continue */
export const TOS_HTML = `
  <p><b>1. Age Requirement:</b> Must be at least 18 years old.</p>
  <p><b>2. Legal Compliance:</b> Follow local laws responsibly.</p>
  <p><b>3. Risk Acknowledgement:</b> Games involve risk; no guaranteed winnings.</p>
  <p><b>4. No Warranty:</b> Games provided "as is"; operate randomly.</p>
  <p><b>5. Limitation of Liability:</b> We're not liable for damages.</p>
  <p><b>6. Licensing Disclaimer:</b> Not a licensed casino; for simulation only.</p>
  <p><b>7. Fair Play:</b> Games are conducted fairly and transparently.</p>
  <p><b>8. Data Privacy:</b> Your privacy is important to us.</p>
  <p><b>9. Responsible Gaming:</b> Play responsibly; seek help if needed.</p>
`;

/**
 * A method for automatically fetching Token Metadata.
 * Uses Helius metadata API if an API key exists in the environment.
 */
export const TOKEN_METADATA_FETCHER = (
  () => {
    if (import.meta.env.VITE_HELIUS_API_KEY) {
      return makeHeliusTokenFetcher(
        import.meta.env.VITE_HELIUS_API_KEY,
        { dollarBaseWager: 1 },
      );
    }
  }
)();

/**
 * Example Usage:
 * Fetch Raydium pools and update the platform's pool list dynamically.
 */
(async () => {
  const connection = new Connection(RPC_ENDPOINT);
  await updatePoolsWithRaydium(connection);
  console.log('Updated Pools:', POOLS);
})();
