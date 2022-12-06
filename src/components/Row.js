import { Flex, Text } from '@chakra-ui/react';

const Row = ({ seats, selectedSeats, setSelectedSeats, setTotalPrice }) => (
  <Flex justifyContent="center" gap="2rem">
    {seats.map(seat => (
      <Flex
        key={seat?.id}
        onClick={() => {
          if (!selectedSeats.includes(seat?.id)) {
            setSelectedSeats(preState => [...preState, seat?.id]);
            setTotalPrice(preState => preState + (seat?.row + 1) * 10);
          }
        }}
        direction="column"
        bg={
          selectedSeats.includes(seat?.id)
            ? 'white'
            : seat?.isReserved
            ? 'primary.reservedSeat'
            : 'primary.availableSeat'
        }
        cursor={seat?.isReserved ? 'auto' : 'pointer'}
        pointerEvents={seat?.isReserved ? 'none' : 'auto'}
        color={selectedSeats.includes(seat?.id) ? 'black' : 'inherit'}
        borderRadius="0.3rem"
        minH="3rem"
        minW="3rem"
        align="center"
        justifyContent="center"
      >
        <Text fontWeight="500">{seat?.seatNumber}</Text>
        <Text fontSize="0.7rem">Row: {seat?.row + 1}</Text>
      </Flex>
    ))}
  </Flex>
);
export default Row;
