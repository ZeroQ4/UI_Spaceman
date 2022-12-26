import { FC, ReactNode } from "react"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {} from "@solana/web3.js"
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter, 
  SlopeWalletAdapter, 
  SolletWalletAdapter, 
  TorusWalletAdapter, 
  SolongWalletAdapter, 
  MathWalletAdapter, 
  Coin98WalletAdapter, 
  CloverWalletAdapter, 
  ExodusWalletAdapter,
  LedgerWalletAdapter,
  BloctoWalletAdapter,
  BackpackWalletAdapter,
  } from "@solana/wallet-adapter-wallets"
import { useMemo } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

//my
import { clusterApiUrl } from "../components/cluster"

require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const url = useMemo(() => clusterApiUrl("devnet"), [])
  const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new SolongWalletAdapter(),
      new MathWalletAdapter(),
      new Coin98WalletAdapter(),
      new CloverWalletAdapter(),
      new ExodusWalletAdapter(),
      new LedgerWalletAdapter(),
      new BackpackWalletAdapter(),
      new BloctoWalletAdapter({ network }),
    ],
    [network]
);

  return (
    <ConnectionProvider endpoint={url} >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider
