import { FC, ReactNode } from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { connected } = useWallet()

  return (
    <div className={styles.container}>
      <Head>
        <title>Mint | Spaceman</title>
        <meta name="The Spaceman NFT Collection" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={"url(/home-background.jpg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <NavBar />

          <Spacer />

          <Center>{children}</Center>

          <Spacer />

          <Center>
            <Box marginBottom={4} color="white">
              <a
                href="https://twitter.com/1space_me"
                target="_blank"
                rel="noopener noreferrer"
              >
                @onespace
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  )
}

export default MainLayout