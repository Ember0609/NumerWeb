import { useEffect, useState } from "react";
import { Box, Input, Button, Grid, VStack, HStack, Heading } from "@chakra-ui/react";

export default function MatrixForm({ onSolve, problemType = 'matrix' }) {
  const [size, setSize] = useState(3);

  const [matrix, setMatrix] = useState([

  ]);

  const [vector, setVector] = useState([]);

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = value;
    setMatrix(newMatrix);
  };

  const handleVectorChange = (i, value) => {
    const newVector = [...vector];
    newVector[i] = value;
    setVector(newVector);
  };

  const handleResize = (n) => {
    if (n < 1) return;
    setSize(n);
    setMatrix(Array.from({ length: n }, () => Array(n).fill("")));
    setVector(Array(n).fill(""));
  };

    useEffect(() => {
      handleResize(size);
    }, []);


  const LoadRandomExample = async () => {
    try {
      // ❗️ ใช้ `problemType` ที่ได้รับมาในการสร้าง URL
      const example = await fetch(`http://127.0.0.1:8000/examples/${problemType}`)
        .then(res => res.json());

      if (!example || !example.matrix_a) {
        alert("No matrix example data received");
        return;
      }

      setSize(example.matrix_a.length);
      setMatrix(example.matrix_a);
      setVector(example.vector_b);
    } catch (error) {
      console.error(`Failed to load ${problemType} example:`, error);
      alert("Failed to load example from backend");
    }
  }

  return (
    <Box
      p={6}
      bg="gray.800"
      borderRadius="lg"
      boxShadow="md"
      maxW="70vw"
    >
      <VStack spacing={4}>
        <HStack>
          <Input
            bg="white"
            type="number"
            value={size}
            onChange={(e) => handleResize(Number(e.target.value))}
            w="100px"
          />
          <Box color="white">Matrix Size (n x n)</Box>
        </HStack>

        <HStack align="start" spacing={8}>
          {/* A matrix */}
          <VStack>
            <Heading size="sm" color="white">Matrix A</Heading>
            <Box overflow="auto" maxW="50vw">
              <Grid templateColumns={`repeat(${size}, 80px)`} gap={2}>
                {matrix.map((row, i) =>
                  row.map((val, j) => (
                    <Input
                      bg="white"
                      key={`${i}-${j}`}
                      type="number"
                      value={val}
                      placeholder="0"
                      onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                    />
                  ))
                )}
              </Grid>
            </Box>
          </VStack>

          {/* Vector B */}
          <VStack>
            <Heading size="sm" color="white">Vector B</Heading>
            <Box overflow="auto" maxH="1000px">
              <Grid templateColumns={`repeat(1, 80px)`} gap={2}>
                {vector.map((val, i) => (
                  <Input
                    bg="white"
                    key={`b-${i}`}
                    type="number"
                    value={val}
                    placeholder="0"
                    onChange={(e) => handleVectorChange(i, e.target.value)}
                  />
                ))}
              </Grid>
            </Box>
          </VStack>
        </HStack>

        <Button
          colorScheme="teal"
          onClick={() =>
            onSolve(
              matrix.map(row => row.map(val => parseFloat(val) || 0)),
              vector.map(val => parseFloat(val) || 0)
            )
          }
        >
          Solve
        </Button>

        <Button colorScheme="purple" w="90%" onClick={LoadRandomExample}>
              Load Random Example
        </Button>
      </VStack>
    </Box>
  );
}
