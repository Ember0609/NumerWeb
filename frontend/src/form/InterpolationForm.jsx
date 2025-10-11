import { useState, useEffect } from "react";
import {
  Box, Button, VStack, HStack,
  FormControl, FormLabel, Text, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";

export default function InterpolationForm({ onCalculate }) {
  const [numPoints, setNumPoints] = useState(3);
  
  const [points, setPoints] = useState([
    { x: '1', y: '-2' },
    { x: '1.25', y: '1.8359375' },
    { x: '1.5', y: '12.5625' },
  ]);
  const [xValue, setXValue] = useState('1.4');

  useEffect(() => {
    const newPoints = Array.from({ length: numPoints }, (_, i) => {
      return points[i] || { x: '0', y: '0' };
    });
    setPoints(newPoints);
  }, [numPoints]);

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index][field] = value; 
    setPoints(newPoints);
  };
  
  const handleSubmit = () => {
    const numericPoints = points.map(p => ({
        x: parseFloat(p.x),
        y: parseFloat(p.y)
    }));
    const numericXValue = parseFloat(xValue);

    if (numericPoints.some(p => isNaN(p.x) || isNaN(p.y)) || isNaN(numericXValue)) {
        alert("Please make sure all inputs are valid numbers.");
        return;
    }

    onCalculate(numericPoints, numericXValue);
  };

  return (
    <Box p={6} bg="gray.800" borderRadius="lg" boxShadow="md" w="50vw">
      <VStack spacing={6}>

        <HStack spacing={8} w="30%" justify="center">
          <FormControl>
              <FormLabel color="white">Points</FormLabel>
              <NumberInput value={numPoints} onChange={(val) => setNumPoints(parseInt(val) || 1)} min={1}>
                <NumberInputField bg="white" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          <FormControl w="auto">
            <FormLabel color="white">X</FormLabel>
            <NumberInput value={xValue} onChange={(valueString) => setXValue(valueString)}>
              <NumberInputField bg="white" color="black" w="120px" />
            </NumberInput>
          </FormControl>
        </HStack>

        <Box p={4} borderRadius="md" w="90%">
          <VStack spacing={4} align="stretch">
            {points.map((point, index) => (
              <HStack key={index}>
                <Text color="white" fontWeight="bold" w="30px">{index + 1}.</Text>
                <FormControl>
                  <NumberInput value={point.x} onChange={(valueString) => handlePointChange(index, 'x', valueString)}>
                    <NumberInputField bg="white" placeholder={`x${index}`} />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <NumberInput value={point.y} onChange={(valueString) => handlePointChange(index, 'y', valueString)}>
                    <NumberInputField bg="white" placeholder={`f(x${index})`} />
                  </NumberInput>
                </FormControl>
              </HStack>
            ))}
          </VStack>
        </Box>
        
        <Button colorScheme="teal" w="90%" onClick={handleSubmit}>
          Calculate
        </Button>
      </VStack>
    </Box>
  );
}