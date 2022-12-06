import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import Row from '../components/Row';
import seatLegend from '../utils/helpers';

const Home = () => {
  const toast = useToast();
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRows = async () => {
    if (rowCount > 2 && rowCount < 11) {
      try {
        setLoading(true);
        const resposne = await fetch(`${process.env.REACT_APP_API_URL}/seats?count=${rowCount}`);
        const data = await resposne.json();
        setRows(data?.data?.seats);
      } catch (error) {
        toast({
          duration: '2500',
          title: error?.message || 'Something went wrong',
          isClosable: true,
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        duration: '2500',
        title: 'Number of rows should be between 2 & 11',
        isClosable: true,
        status: 'error',
      });
    }
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
          <Box overflowX="auto" width="100%">
            <Flex gap="1rem" direction="column" w={`${rowCount * 5}rem`} mx="auto">
              {rows?.map(rowDetails => (
                <Row key={rowDetails?.id} seats={rowDetails?.seats} />
              ))}
            </Flex>
          </Box>
          <Flex flexWrap="wrap" px="1rem" mt="2rem" justifyContent="center" gap="1rem">
            {seatLegend.map(e => (
              <Flex key={e.name} align="center" gap="0.3rem">
                <Box w="1rem" h="1rem" borderRadius="0.3rem" bg={e.color} />
                <Text>{e.name}</Text>
              </Flex>
            ))}
          </Flex>
          <Flex gap="2rem" align="center">
            <Box>
              <Text fontSize="1.2rem" fontWeight="500">
                $512.00
              </Text>
              <Text fontStyle="italic" color="grey">
                4 seats
              </Text>
            </Box>

            <Button w="10rem" colorScheme="teal">
              Book now
            </Button>
          </Flex>
          <Button
            onClick={() => setRows(null)}
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
