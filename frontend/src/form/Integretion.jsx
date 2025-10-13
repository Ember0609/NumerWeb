import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { useState } from "react";

export default function XLRform({ onCalculate }) {
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [fx, setFx] = useState("");

  const Submit = () => {
    if (onCalculate) {
      onCalculate({ a,b,fx });
    }
  };

   const LoadRandomExample = async () => {
    try {
      const example = await fetch("http://127.0.0.1:8000/examples/integration")
        .then(res => res.json());
      if (!example || example.a === undefined) return;
      setA(parseFloat(example.a));
      setB(parseFloat(example.b));
      setFx(example.fx);
    } catch (error) {
      console.error("Failed to load integration example:", error);
      alert("Failed to load example from backend");
    }
  };

  return (
    <VStack spacing={6}>
      <Center>
        <Box p={6} bg="gray.800" w="40vw" borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} w="100%">
            <Flex gap={4} w="90%">
              <FormControl>
                <FormLabel color="white">A</FormLabel>
                <NumberInput value={a} onChange={(val) => setA(val)}>
                  <NumberInputField bg="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel color="white">B</FormLabel>
                <NumberInput value={b} onChange={(val) => setB(val)}>
                  <NumberInputField bg="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>

            <FormControl maxW="90%">
              <FormLabel color="white">F(x)</FormLabel>
              <Input bg="white" value={fx} onChange={(e) => setFx(e.target.value)} />
            </FormControl>

            <Button colorScheme="teal" w="90%" onClick={Submit}>
              Calculate
            </Button>
            <Button colorScheme="purple" w="90%" onClick={LoadRandomExample}>
              Load Random Example
            </Button>
          </VStack>
        </Box>
      </Center>
    </VStack>
  );
}
