import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box p={6} bg="gray.800" minW="100vw" minH="100vh" display="flex" justifyContent="center"  >
      <VStack spacing={4}>
        <Heading color={"white"} >Numerical Methods</Heading>
        <Button as={Link} to="/graphicalpage" minW="15vw" colorScheme="teal">
          Graphical 
        </Button>
        <Button as={Link} to="/bisectionpage" minW="15vw" colorScheme="teal">
          Bisection
        </Button>
        <Button as={Link} to="/FalsePositionpage" minW="15vw" colorScheme="teal">
          False-Position
        </Button>
        <Button as={Link} to="/OnepointPage" minW="15vw" colorScheme="teal">
          One-Point
        </Button>
        <Button as={Link} to="/NewtonRaphsonPage" minW="15vw" colorScheme="teal">
          Newton
        </Button>
        <Button as={Link} to="/SecentPage" minW="15vw" colorScheme="teal">
          Secent
        </Button>
        <Button as={Link} to="/CramerPage" minW="15vw" colorScheme="teal">
          CramerRule
        </Button>
        <Button as={Link} to="/GaussElimanationPage" minW="15vw" colorScheme="teal">
          Gauss-Elimanation
        </Button>
        <Button as={Link} to="/GaussJordanPage" minW="15vw" colorScheme="teal">
          Gauss-Jordan
        </Button>
        <Button as={Link} to="/MatrixInversionPage" minW="15vw" colorScheme="teal">
          Matrix Inversion
        </Button>
        <Button as={Link} to="/LUDecompositionPage" minW="15vw" colorScheme="teal">
          LU
        </Button>
      </VStack>
    </Box>
  );
}