import { TravelClass } from "./TravelClass";

export interface FlightOfferSearchRequest {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass: string;
  currencyCode: string;
  max: number;
}
