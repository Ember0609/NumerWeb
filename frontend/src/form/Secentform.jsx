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

export default function SecentForm({ onCalculate }) {
  const [x0, setX0] = useState(1);
  const [x1, setX1] = useState(10);
  const [fx, setFx] = useState("");
  const [et, setEt] = useState(0.000001);

  const Submit = () => {
    if (onCalculate) {
      onCalculate({ x0, x1, fx, et });
    }
  };

  return (
    <VStack spacing={6}>
      <Center>
        <Box p={6} bg="gray.800" w="40vw" borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} w="100%">
            <Flex gap={4} w="90%">
              <FormControl>
                <FormLabel color="white">X0</FormLabel>
                <NumberInput value={x0} onChange={(val) => setX0(val)}>
                  <NumberInputField bg="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel color="white">X1</FormLabel>
                <NumberInput value={x1} onChange={(val) => setX1(val)}>
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

            <FormControl maxW="90%">
              <FormLabel color="white">Error Tolerance</FormLabel>
              <NumberInput value={et} onChange={(val) => setEt(val)} step={0.000001}>
                <NumberInputField bg="white" />
                <NumberInputStepper >
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button colorScheme="teal" w="90%" onClick={Submit}>
              Calculate
            </Button>
          </VStack>
        </Box>
      </Center>
    </VStack>
  );
}
