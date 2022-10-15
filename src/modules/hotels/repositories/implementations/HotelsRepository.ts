import { prisma } from "../../../../../prisma"
import { CreateHotelDTO } from "../../dtos/CreateHotelDTO"
import { Hotel } from "../../entities/HotelEntity"
import { IHotelsRepository } from "../interfaces/IHotelsRepository"


export class HotelsRepository implements IHotelsRepository {

  async create({ hotel, offers, userId, isPackage }: CreateHotelDTO): Promise<Hotel> {
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

  async deleteHotel(hotelId: string): Promise<void> {
      await prisma.hotel.delete({ where: { id: hotelId}});
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
