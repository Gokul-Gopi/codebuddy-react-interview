import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Row from '../components/Row';
import { callApi, seatLegend, toastDefaultConfigs } from '../utils/helpers';

const Home = () => {
  const toast = useToast(toastDefaultConfigs);
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // default price set as 20, as movie costs 20 and the cost increases as seats are added
  const [totalPrice, setTotalPrice] = useState(20);

  const reset = () => {
    setRows(null);
    setRowCount(0);
    setSelectedSeats([]);
    setTotalPrice(20);
  };

  const fetchRows = async () => {
    if (rowCount <= 2 || rowCount >= 11) {
      return toast({
        description: 'Number of rows should be between 2 & 11',
        status: 'error',
      });
    }

    setLoading(true);
    const [response, error] = await callApi(
      `${process.env.REACT_APP_API_URL}/seats?count=${rowCount}`,
    );
    setLoading(false);

    if (error) {
      return toast({
        description: error?.message || 'Something went wrong',
        status: 'error',
      });
    }

    return setRows(response?.data?.seats);
  };

  const bookTicketHandler = async () => {
    if (selectedSeats?.length < 1 || selectedSeats?.length > 5) {
      return toast({
        description: 'Select a minimum of 1 seat and maximum of 5 seats.',
        status: 'error',
      });
    }

    setLoading(true);
    const [response, error] = await callApi(`${process.env.REACT_APP_API_URL}/submit`, {
      method: 'POST',
      body: JSON.stringify(selectedSeats),
    });
    setLoading(false);

    if (error) {
      return toast({
        description: error?.message || 'Something went wrong',
        status: 'error',
      });
    }

    toast({
      description: 'Tickets booked successfully',
      status: 'success',
    });
    reset();

    return response;
  };

  return (
    <Flex
      p="2rem"
      as="main"
      align="center"
      justify="center"
      minH="99vh"
      bg="primary.bg"
      color="white"
    >
      {!rows ? (
        <Box>
          <Text mb="0.2rem">Enter number of rows</Text>
          <Input
            placeholder="Number of rows"
            value={rowCount}
            onChange={e => setRowCount(e.target.value)}
          />
          <Button colorScheme="teal" w="100%" mt="1rem" onClick={fetchRows} isLoading={loading}>
            Submit
          </Button>
        </Box>
      ) : (
        <Flex direction="column" gap="2rem" w={{ base: '100%', md: '60rem' }} align="center">
          {/* screen */}
          <Box w="100%" textAlign="center" mb="2rem">
            <Text mb="1rem" fontSize="0.85rem" letterSpacing="3px">
              EYES HERE
            </Text>
            <Box
              borderRadius="0.2rem"
              boxShadow="0px 0px 10px 6px rgba(250,250,250,0.3)"
              h="0.6rem"
              bg="white"
            />
          </Box>
          {/* seats */}
          <Box
            className="custom-scrollbar"
            overflowX="auto"
            width="100%"
            py={{ base: '1rem', md: 0 }}
          >
            <Flex gap="1rem" direction="column" w={`${rowCount * 5}rem`} mx="auto">
              {rows?.map(rowDetails => (
                <Row
                  key={rowDetails?.id}
                  seats={rowDetails?.seats}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  setTotalPrice={setTotalPrice}
                />
              ))}
            </Flex>
          </Box>
          {/* legend */}
          <Flex flexWrap="wrap" px="1rem" mt="2rem" justifyContent="center" gap="1rem">
            {seatLegend.map(e => (
              <Flex key={e.name} align="center" gap="0.3rem">
                <Box w="1rem" h="1rem" borderRadius="0.3rem" bg={e.color} />
                <Text>{e.name}</Text>
              </Flex>
            ))}
          </Flex>
          {/* display price and seats */}
          <Flex gap="2rem" align="center">
            <Box>
              <Text fontSize="1.2rem" fontWeight="500">
                ${totalPrice}
              </Text>
              <Text fontStyle="italic" color="grey">
                {selectedSeats?.length} seats
              </Text>
            </Box>

            <Button
              onClick={bookTicketHandler}
              leftIcon={<AiOutlineArrowRight />}
              w="10rem"
              colorScheme="teal"
              isLoading={loading}
            >
              Book now
            </Button>
          </Flex>
          <Button
            onClick={reset}
            border="2px"
            borderColor="teal"
            bg="primary.bg"
            size="sm"
            _hover={{ bg: 'primary.bg' }}
          >
            Reset
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
