import { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixForm";
import { LUDecomposition } from "../utils/LUDecomposition";

export default function App() {
const [L, setL] = useState([]);
  const [U, setU] = useState([]);
  const [x, setX] = useState([]);
  const [yback, setYback] = useState([]);
  const [xback, setXback] = useState([]);

const handleSolve = (matrix, vector) => {
  try {
    const lu = new LUDecomposition(matrix, vector);
      const result = lu.solve();
      setL(result.L);
      setU(result.U);
      setX(result.x);
      setYback(result.yback);
      setXback(result.xback);
    } catch (err) {
      alert(err.message);
    }
};


  return (
    <Box p={6} bg="gray.700" minW="100vw" minH="100vh">
      <VStack spacing={6}>
        <Heading color="white">LU-Decomposition</Heading>

        <MatrixForm onSolve={handleSolve} />

        {x.length > 0 && (
          <MathJaxContext>
            <Box p={6} bg="white" w="80%" borderRadius="lg">
              <Heading size="md">L</Heading>
              <MathJax>{`\\(${LUDecomposition.matrixToLatex(L)}\\)`}</MathJax>

              <Heading size="md" mt={4}>U</Heading>
              <MathJax>{`\\(${LUDecomposition.matrixToLatex(U)}\\)`}</MathJax>

              <Heading size="md" mt={4}>Forward Substitution (y)</Heading>
              {yback.map((line, i) => (
                <MathJax key={i}>{`\\(${line}\\)`}</MathJax>
              ))}

              <Heading size="md" mt={4}>Backward Substitution (x)</Heading>
              {xback.map((line, i) => (
                <MathJax key={i}>{`\\(${line}\\)`}</MathJax>
              ))}

              <Heading size="md" mt={4}>Solution x</Heading>
              {x.map((val, i) => (
                <MathJax key={i}>{`\\(x_{${i+1}} = ${val.toFixed(3)}\\)`}</MathJax>
              ))}
            </Box>
          </MathJaxContext>
        )}
      </VStack>
    </Box>
  );
}
