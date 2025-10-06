import { Box,  Center, Heading,  VStack,} from "@chakra-ui/react";
import { useEffect,useState } from "react";
import XLRform from "../form/XLRform";
import { Bisection } from "../utils/";
import Chart from "../component/Chart";
import Table from "../component/Table";


export default function App() {

    const [result, setResult] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
            document.title = "Bisection Methods";
        },[]);

        
    const BisectionCal = ({ xl, xr, fx, et }) => {
        try {
            const cal = new Bisection(fx, xl, xr, et);
            const res = cal.solve();
            setResult(`X ≈ ${res.root.toFixed(5)} , Error Tolerance ≈ ${res.error.toFixed(7)}`);
            setData(res.history);

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh">
            <VStack spacing={4}>
                <Heading color={"white"}>Bisection Methods</Heading>
                <Center>
                    <XLRform onCalculate={BisectionCal} />
                </Center>

                {result && (
                    <Box p={6} bg="gray.800" w="40vw" borderRadius="lg" boxShadow="lg">

                        <VStack spacing={3}>
                            <Center>
                                <Heading color={"white"} >Result</Heading>
                            </Center>
                            <Box
                                mt={4}
                                p={4}
                                bg="white"
                                border="2px"
                                borderColor="teal.500"
                                borderRadius="md"
                                w="60%"
                            >{result}</Box>
                            <Chart data = {data}/>
                            <Table data={data} />
                        </VStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}
