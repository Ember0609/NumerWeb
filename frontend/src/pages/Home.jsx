import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box p={6} bg="gray.800" minW="100vw" minH="100vh" display="flex" justifyContent="center"  overflowX="hidden">
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
        <Button as={Link} to="/JacobiPage" minW="15vw" colorScheme="teal">
          Jacobi
        </Button>
        <Button as={Link} to="/GaussSeidelPage" minW="15vw" colorScheme="teal">
          GaussSeidel
        </Button>
        <Button as={Link} to="/CholeskyPage" minW="15vw" colorScheme="teal">
          Cholesky
        </Button>
        <Button as={Link} to="/ConjugateGradientPage" minW="15vw" colorScheme="teal">
          Conjugate Gradient
        </Button>
        <Button as={Link} to="/TrapezoidalPage" minW="15vw" colorScheme="teal">
          Trapezoidal
        </Button>
        <Button as={Link} to="/CompositeTrapezoidalPage" minW="15vw" colorScheme="teal">
          Composite-Trapezoidal
        </Button>
        <Button as={Link} to="/SimpsonPage" minW="15vw" colorScheme="teal">
          Simpson
        </Button>
        <Button as={Link} to="/CompositeSimpsonPage" minW="15vw" colorScheme="teal">
          Composite-Simpson
        </Button>
        <Button as={Link} to="/DividedPage" minW="15vw" colorScheme="teal">
          Divided
        </Button>
        <Button as={Link} to="/NewtonDividedPage" minW="15vw" colorScheme="teal">
          Newton
        </Button>
        <Button as={Link} to="/NewtonDividedPage" minW="15vw" colorScheme="teal">
          NewtonDivied
        </Button>
        <Button as={Link} to="/LagrangePage" minW="15vw" colorScheme="teal">
          Lagrange
        </Button>
        <Button as={Link} to="/SplinePage" minW="15vw" colorScheme="teal">
          Spline
        </Button>
      </VStack>
    </Box>
  );
}