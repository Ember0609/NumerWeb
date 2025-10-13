import { useState, useEffect } from "react";
import {
  Box, Button, VStack, HStack,
  FormControl, FormLabel, Text, NumberInput,
  NumberInputField, Input, Radio, RadioGroup,Heading
} from "@chakra-ui/react";

export default function RegressionForm({ onCalculate }) {
  const [type, setType] = useState('polynomial'); // 'polynomial' or 'multiple'
  const [numPoints, setNumPoints] = useState(4);
  const [numVars, setNumVars] = useState(2);
  const [order, setOrder] = useState(2);
  
  const [points, setPoints] = useState([]);
  const [xValuesToPredict, setXValuesToPredict] = useState([]);

  // Effect to resize data structures when points/vars/type change
  useEffect(() => {
    const vars = type === 'polynomial' ? 1 : numVars;
    
    setPoints(currentPoints => {
      const newPoints = Array.from({ length: numPoints }, (_, i) => {
          const oldPoint = currentPoints[i] || { x: [], y: '0' };
          const newX = Array.from({ length: vars }, (_, j) => oldPoint.x[j] || '0');
          return { x: newX, y: oldPoint.y };
      });
      return newPoints;
    });

    setXValuesToPredict(currentPredict => {
        const newXToPredict = Array.from({ length: vars }, (_, j) => currentPredict[j] || '0');
        return newXToPredict;
    });

  }, [numPoints, numVars, type]);

  // ** START: FIX ** - Immutable state updates
  const handlePointChange = (pIndex, varIndex, value) => {
    setPoints(currentPoints => 
        currentPoints.map((point, index) => {
            if (index !== pIndex) return point;
            
            if (varIndex === 'y') {
                return { ...point, y: value };
            }
            
            const newX = point.x.map((xVal, xIndex) => xIndex === varIndex ? value : xVal);
            return { ...point, x: newX };
        })
    );
  };
  
  const handlePredictChange = (index, value) => {
      setXValuesToPredict(currentValues => 
        currentValues.map((v, i) => i === index ? value : v)
      );
  }
  // ** END: FIX **

  const handleSubmit = () => {
    const numericPoints = points.map(p => ({
        x: p.x.map(val => parseFloat(val)),
        y: parseFloat(p.y)
    }));
    const numericXtoPredict = xValuesToPredict.map(val => parseFloat(val));

    if (numericPoints.some(p => isNaN(p.y) || p.x.some(isNaN)) || numericXtoPredict.some(isNaN)) {
        alert("Please ensure all inputs are valid numbers before calculating.");
        return;
    }

    onCalculate(numericPoints, numericXtoPredict, type, order);
  };

  const LoadRandomExample = async () => {
    const problemType = type === 'polynomial' ? 'regression_poly' : 'regression_multi';
    try {
      const example = await fetch(`http://127.0.0.1:8000/examples/${problemType}`)
        .then(res => res.json());
      
      if (!example || !example.points) return;

      setNumPoints(example.points.length);
      setPoints(example.points.map(p => ({
          x: p.x.map(String), // แปลงเป็น string สำหรับ input
          y: String(p.y)
      })));
      setXValuesToPredict(example.xToPredict.map(String));
      
      if (type === 'polynomial' && example.order) {
        setOrder(example.order);
      }
      if (type === 'multiple') {
        setNumVars(example.points[0]?.x.length || 2);
      }

    } catch (error) {
      console.error("Failed to load regression example:", error);
      alert("Failed to load example from backend");
    }
  };

  return (
    <Box p={6} bg="gray.800" borderRadius="lg" boxShadow="md" w="auto">
      <VStack spacing={6}>
        <FormControl as="fieldset">
            <FormLabel as="legend" color="white">Regression Type</FormLabel>
            <RadioGroup onChange={setType} value={type}>
                <HStack spacing="24px">
                <Radio value="polynomial" colorScheme="teal"><Text color="white">Polynomial</Text></Radio>
                <Radio value="multiple" colorScheme="teal"><Text color="white">Multiple</Text></Radio>
                </HStack>
            </RadioGroup>
        </FormControl>

        <HStack spacing={4} justify="center">
          <FormControl>
            <FormLabel color="white">Data Points</FormLabel>
            <NumberInput value={numPoints} onChange={(val) => setNumPoints(parseInt(val) || 1)} min={2}>
              <NumberInputField bg="white" />
            </NumberInput>
          </FormControl>
          {type === 'polynomial' ? (
            <FormControl>
                <FormLabel color="white">Order</FormLabel>
                <NumberInput value={order} onChange={(val) => setOrder(parseInt(val) || 1)} min={1}>
                <NumberInputField bg="white" />
                </NumberInput>
            </FormControl>
          ) : (
            <FormControl>
                <FormLabel color="white">Variables (X)</FormLabel>
                <NumberInput value={numVars} onChange={(val) => setNumVars(parseInt(val) || 1)} min={1}>
                <NumberInputField bg="white" />
                </NumberInput>
            </FormControl>
          )}
        </HStack>

        <Box p={4} borderRadius="md" w="100%" maxH="300px" overflowY="auto">
          <VStack spacing={4} align="stretch">
            {points.map((point, pIndex) => (
              <HStack key={pIndex}>
                <Text color="white" fontWeight="bold" w="30px">{pIndex + 1}.</Text>
                {point.x.map((xVal, xIndex) => (
                   <FormControl key={xIndex}>
                       <FormLabel color="white" fontSize="sm">{type === 'polynomial' ? 'X' : `X${xIndex + 1}`}</FormLabel>
                       <Input bg="white" value={xVal} onChange={(e) => handlePointChange(pIndex, xIndex, e.target.value)} />
                   </FormControl>
                ))}
                <FormControl>
                   <FormLabel color="white" fontSize="sm">Y</FormLabel>
                   <Input bg="white" value={point.y} onChange={(e) => handlePointChange(pIndex, 'y', e.target.value)} />
                </FormControl>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Heading size="md" color="white" mt={4}>Predict Y for:</Heading>
        <HStack>
            {xValuesToPredict.map((val, i) => (
                 <FormControl key={i}>
                    <FormLabel color="white">{type === 'polynomial' ? 'X' : `X${i+1}`}</FormLabel>
                    <Input bg="white" value={val} onChange={(e) => handlePredictChange(i, e.target.value)}/>
                 </FormControl>
            ))}
        </HStack>
        
        <Button colorScheme="teal" w="90%" onClick={handleSubmit}>
          Calculate
        </Button>
         <Button colorScheme="purple" w="90%" onClick={LoadRandomExample}>
          Load Random Example
        </Button>
      </VStack>
    </Box>
  );
}