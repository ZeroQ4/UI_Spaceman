import type { NextPage } from "next";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import MainLayout from "../components/MainLayout";
import {
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import Link from "next/link";

const NewMint: NextPage<NewMintProps> = ({ mint }) => {
  const [metadata, setMetadata] = useState<any>();
  const { connection } = useConnection();
  const walletAdapter = useWallet();
  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
  }, [connection, walletAdapter]);

  useEffect(() => {
    metaplex
      .nfts()
      .findByMint({ mintAddress: mint })
      .run()
      .then((nft) => {
        fetch(nft.uri)
          .then((res) => res.json())
          .then((metadata) => {
            setMetadata(metadata);
          });
      });
  }, [mint, metaplex, walletAdapter]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {},
    []
  );

  return (
    <MainLayout>
      <VStack spacing={20}>
        <Container>
          <VStack spacing={8}>
            <Heading color="white" as="h1" size="2xl" textAlign="center">
              This is your new Spaceman!
            </Heading>

            <Text color="bodyText" fontSize="xl" textAlign="center">
              Congratulations, you minted cool spaceman! <br />
              Time to stake your character to earn rewards or sell on marketplace.
            </Text>
          </VStack>
        </Container>

        <Image boxSize='300px' opacity='0.97' borderRadius='10' objectFit='cover' src={metadata?.image ?? ""} alt="" />
        <HStack>
        <Button
          bgColor="accent"
          color="white"
          maxW="380px"
          onClick={() => { window.location.assign('https://spaceman-stake.1space.me/'); }}
        >
          <HStack>
            <Text>STAKE MY SPACEMAN</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
        <Button
          bgColor="accent"
          color="white"
          maxW="380px"
          onClick={() => { window.location.assign('https://spaceman.1space.me/'); }}
        >
          <HStack>
            <Text>I NEED MORE!</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
        </HStack>
      </VStack>
    </MainLayout>
  );
};

interface NewMintProps {
  mint: PublicKey;
}

NewMint.getInitialProps = async ({ query }) => {
  const { mint } = query;

  if (!mint) throw { error: "no mint" };

  try {
    const mintPubkey = new PublicKey(mint);
    return { mint: mintPubkey };
  } catch {
    throw { error: "invalid mint" };
  }
};

export default NewMint;