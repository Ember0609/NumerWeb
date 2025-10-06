import { Box,  Center, Heading,  VStack,} from "@chakra-ui/react";
import { useEffect,useState } from "react";
import SecentForm from "../form/Secentform";
import Chart from "../component/Chart";
import NewtonTable from "../component/NewtonTable";
import { Secent } from "../utils/Secent";


export default function App() {

    const [result, setResult] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
            document.title = "Newton-Raphson Methods";
        },[]);

        
    const SecentMetods = ({ x0,x1, fx, et }) => {
        try {
            const cal = new Secent(x0,x1, fx, et);
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
                <Heading color={"white"}>Secent Methods</Heading>
                <Center>
                  <SecentForm onCalculate={SecentMetods}/>
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
                            <NewtonTable data={data} />
                        </VStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}
