import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PoiService } from './poi.service';
import { Poi } from './poi.entitty';


@Controller('pois')
export class PoiController {
  constructor(private readonly poiService: PoiService) {}

  @Post()
  async create(@Body() poiData: Partial<Poi>): Promise<Poi> {
    return this.poiService.createPoi(poiData);
  }

  @Get()
  async findAll(): Promise<Poi[]> {
    return this.poiService.findAll();
  }

  @Get('nearby')
  async findNearby(
    @Query('cep') referenceCep: string,
    @Query('maxDistance') maxDistance: number,
  ): Promise<Poi[]> {
    return this.poiService.findNearbyPois(referenceCep, maxDistance);
  }
}
