import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';

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
    <Flex as="main" align="center" justify="center" minH="99vh" bg="primary.bg" color="white">
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
        <Flex> {/* <Box /> */}</Flex>
      )}
    </Flex>
  );
};

export default Home;
