import { Prisma } from "@prisma/client"
import { prisma } from "../../../../../prisma"
import ICreateHotelDTO from "../../dtos/ICreateHotelDTO"
import { Hotel } from "../../entities/HotelEntity"

interface IHotelsRepository {
  create(data: ICreateHotelDTO): Promise<Hotel>
  findByHotelId(hotelId: string): Promise<Hotel | null>
  findAllHotels(): Promise<Hotel[]>

  findHotelsByUserId(userId: string): Promise<Hotel[]>
}
export default class HotelsRepository implements IHotelsRepository {

  async create({ hotel, offers, userId, isPackage }: ICreateHotelDTO): Promise<Hotel> {
    const hotelCreated = await prisma.hotel.create({
      data: {
        userId,
        hotel,
        offers,
        isPackage
      }
    })

    return {
      id: hotelCreated.id,
      isPackage: hotelCreated.isPackage,
      userId: hotelCreated.userId,
      hotel: hotelCreated.hotel,
      offers: hotelCreated.offers,
      createdAt: hotelCreated.createdAt,
      updatedAt: hotelCreated.updatedAt
    }
  }

  async findByHotelId(hotelId: string): Promise<Hotel | null> {
    const hotel = await prisma.hotel.findFirst({ where: { id: hotelId } });

    return {
      id: hotel.id,
      isPackage: hotel.isPackage,
      userId: hotel.userId,
      hotel: hotel.hotel,
      offers: hotel.offers,
      createdAt: hotel.createdAt,
      updatedAt: hotel.updatedAt
    }
  }

  async findAllHotels(): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany();

    const hotelList = hotels.map((hotel) => {
      return {
        id: hotel.id,
        isPackage: hotel.isPackage,
        userId: hotel.userId,
        hotel: hotel.hotel,
        offers: hotel.offers,
        createdAt: hotel.createdAt,
        updatedAt: hotel.updatedAt
      }
    });

    return hotelList;
  }

  async findHotelsByUserId(userId: string): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany({
      where: {
        userId,
        isPackage: false
      }
    })

    const hotelList = hotels.map((hotel) => {
      return {
        id: hotel.id,
        isPackage: hotel.isPackage,
        userId: hotel.userId,
        hotel: hotel.hotel,
        offers: hotel.offers,
        createdAt: hotel.createdAt,
        updatedAt: hotel.updatedAt
      }
    });

    return hotelList;
  }
}