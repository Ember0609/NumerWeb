import { useState } from "react";
import { Box, Input, Button, Grid, VStack, HStack, Heading } from "@chakra-ui/react";

export default function MatrixForm({ onSolve }) {
  const [size, setSize] = useState(3);

  // state เป็น string เพื่อให้ overwrite 0 ได้
  const [matrix, setMatrix] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(""))
  );
  const [vector, setVector] = useState(Array(3).fill(""));

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
                      placeholder="0" // แสดง 0 จาง ๆ
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
              // แปลง string เป็น number ก่อนส่ง
              matrix.map(row => row.map(val => parseFloat(val) || 0)),
              vector.map(val => parseFloat(val) || 0)
            )
          }
        >
          Solve
        </Button>
      </VStack>
    </Box>
  );
}
