import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  CandyMachine,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";

const Connected: FC = () => {
  const { connection } = useConnection();
  const walletAdapter = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [isMinting, setIsMinting] = useState(false);

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
  }, [connection, walletAdapter]);

  useEffect(() => {
    if (!metaplex) return;

    metaplex
      .candyMachines()
      .findByAddress({
        address: new PublicKey("E5mq5hPPFY5ruceVNUBRvS5Xyy5XS3qj3v6g28mCRPBB"),
      })
      .run()
      .then((candyMachine) => {
        console.log(candyMachine);
        setCandyMachine(candyMachine);
      })
      .catch((error) => {
        alert(error);
      });
  }, [metaplex]);
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return;

      if (!walletAdapter.connected || !candyMachine) {
        return;
      }

      try {
        setIsMinting(true);
        const nft = await metaplex.candyMachines().mint({ candyMachine }).run();

        console.log(nft);
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
      } catch (error) {
        alert(error);
      } finally {
        setIsMinting(false);
      }
    },
    [metaplex, walletAdapter, candyMachine]
  );
  return (
    <VStack spacing={20}>
      <Container>
        <VStack spacing={8}>
          <Heading
            color="white"
            as="h1"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            Welcome Spaceman.
          </Heading>

          <Text color="bodyText" fontSize="xl" textAlign="center">
          Each NFT is randomly generated and can be staked to earn 
            <Text as="b"> $1SP</Text> tokens <Text as="b">500🔥per day</Text>. 30 000
            <Text as="b"> $1SP</Text> tokens to mint.<br />
            <Text as="b">Launch 2022.12.27 22:00:00 UTC.</Text>
          </Text>
        </VStack>
      </Container>

      <HStack spacing={10}>
        <Image boxSize={250} borderRadius={10} opacity={0.9} src="avatar1.png" alt="" />
        <Image boxSize={250} borderRadius={10} opacity={0.9} src="avatar2.png" alt="" />
        <Image boxSize={250} borderRadius={10} opacity={0.9} src="avatar3.png" alt="" />
        <Image boxSize={250} borderRadius={10} opacity={0.9} src="avatar4.png" alt="" />
        
      </HStack>
      <HStack spacing={10}>
      <Button
        bgColor="accent"
        color="white"
        maxW="380px"
        onClick={handleClick}
        isLoading={isMinting}
      >
        <HStack>
          <Text>MINT SPACEMAN</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button>
      <Button
        bgColor="accent"
        color="white"
        maxW="380px"
        onClick={() => { window.location.assign('https://jup.ag/swap/USDC-1SP'); }}
        
      >
        <HStack>
          <Text>BUY $1SP</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button>
      </HStack>
    </VStack>
  );
};

export default Connected;