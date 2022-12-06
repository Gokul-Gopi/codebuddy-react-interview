import { Flex, Text } from '@chakra-ui/react';

const Row = ({ seats }) => (
  <Flex justifyContent="center" gap="2rem">
    {seats.map(seat => (
      <Flex
        key={seat?.id}
        direction="column"
        bg={seat?.isReserved ? 'primary.reservedSeat' : 'primary.availableSeat'}
        cursor={seat?.isReserved ? 'not-allowed' : 'pointer'}
        borderRadius="0.3rem"
        minH="3rem"
        minW="3rem"
        align="center"
        justifyContent="center"
        fontSize="0.7rem"
      >
        <Text fontSize="1rem">{seat?.seatNumber}</Text>
        <Text>row: {seat?.row}</Text>
      </Flex>
    ))}
  </Flex>
);
export default Row;
