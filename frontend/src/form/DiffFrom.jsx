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
  Select, // <-- ใช้ Select ธรรมดา
} from "@chakra-ui/react";
import { useState , useEffect} from "react";

// ไม่จำเป็นต้องใช้ createListCollection
// export default function XLRform({ onCalculate }) { // ควรเปลี่ยนชื่อ Component ด้วย
export default function DiffForm({ onCalculate }) {
  const [order, setOrder] = useState(1); // กำหนดค่าเริ่มต้นเป็น 1
  const [error , setError] = useState(1);
  const [direction , setDirection] = useState(1);
  const [x, setX] = useState(1);
  const [fx, setFx] = useState("x^4-13");
  const [h, setH] = useState(0.25); // ตัวแปรนี้อาจไม่จำเป็นสำหรับ diff

  const [availableErrorOptions, setAvailableErrorOptions] = useState([]);

  const Submit = () => {
    if (onCalculate) {
      // ส่งค่าทั้งหมดที่จำเป็นไป
      onCalculate({ order, direction, error, x, fx, h });
    }
  };    

  // สร้าง list ของ options ธรรมดา
  const orderOptions = [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
  ];

  const errorOptions = [
    { label: "O(h)", value: 1 },
    { label: "O(h^2)", value: 2 },
    { label: "O(h^4)", value: 3 },
  ];

  const directionOptions = [
    { label: "Foward", value: 1 },
    { label: "Backward", value: 2 },
    { label: "Central", value: 3 },
  ];

  useEffect(() => {
    let newOptions = [];
    if (direction === 1 || direction === 2) { // Forward or Backward
      newOptions = [
        { label: "O(h)", value: 1 },
        { label: "O(h^2)", value: 2 },
      ];
      // ถ้าค่า error ที่เลือกไว้ตอนนี้ไม่มีใน options ใหม่, ให้ reset กลับไปค่าแรก
      if (error > 2) {
        setError(1);
      }
    } else if (direction === 3) { // Central
      newOptions = [
        { label: "O(h^2)", value: 2 },
        { label: "O(h^4)", value: 3 },
      ];
       // ถ้าค่า error ที่เลือกไว้ตอนนี้ไม่มีใน options ใหม่, ให้ reset กลับไปค่าแรก
      if (error < 2) {
        setError(2);
      }
    }
    setAvailableErrorOptions(newOptions);
  }, [direction, error]); // ให้ effect นี้ทำงานใหม่ทุกครั้งที่ direction หรือ error เปลี่ยน

  return (
    <VStack spacing={6}>
      <Center>
        <Box p={6} bg="gray.800" w="40vw" borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} w="100%">
            <Flex gap={4} w="90%">
              {/* Order Select */}
              <FormControl>
                <FormLabel color="white">Order</FormLabel>
                <Select bg="white" value={order} onChange={(e) => setOrder(parseInt(e.target.value))} color="black">
                  {orderOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </Select>
              </FormControl>
              
              {/* Direction Select */}
              <FormControl>
                <FormLabel color="white">Direction</FormLabel>
                <Select bg="white" value={direction} onChange={(e) => setDirection(parseInt(e.target.value))} color="black">
                  {directionOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </Select>
              </FormControl>

              {/* Error Select (ที่แก้ไขแล้ว) */}
              <FormControl>
                <FormLabel color="white">Error</FormLabel>
                <Select bg="white" value={error} onChange={(e) => setError(parseInt(e.target.value))} color="black">
                  {availableErrorOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </Select>
              </FormControl>
            </Flex>

            <FormControl maxW="90%">
              <FormLabel color="white">F(x)</FormLabel>
              <Input bg="white" value={fx} onChange={(e) => setFx(e.target.value)} />
            </FormControl>
            
            <FormControl maxW="90%">
              <FormLabel color="white">X</FormLabel>
              <NumberInput value={x} onChange={(val) => setX(val)} >
                <NumberInputField bg="white" />
              </NumberInput>
            </FormControl>

            <FormControl maxW="90%">
              <FormLabel color="white">H</FormLabel>
              <NumberInput value={h} onChange={(val) => setH(val)}>
                <NumberInputField bg="white" />
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