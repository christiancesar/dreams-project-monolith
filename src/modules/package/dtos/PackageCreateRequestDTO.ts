type PackageCreateRequestDTO = {
  userId: string;
  hotel: {
    hotel: any;
    offers: any;
  };
  flight: {
    itineraries: any;
    price: any;
  };
  amount: number;
  off: number;
}
