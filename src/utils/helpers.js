export const seatLegend = [
  {
    name: 'Reserverd',
    color: 'primary.reservedSeat',
  },
  {
    name: 'Available',
    color: 'primary.availableSeat',
  },
  {
    name: 'Selected',
    color: 'white',
  },
];

export const toastDefaultConfigs = {
  duration: '2500',
  isClosable: true,
};

export const callApi = async (url, options) => {
  try {
    const fetchResponse = await fetch(url, options);
    const response = await fetchResponse?.json();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};
