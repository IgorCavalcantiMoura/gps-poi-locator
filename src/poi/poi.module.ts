import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoiService } from './poi.service';
import { PoiController } from './poi.controller';
import { Poi } from './poi.entitty';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [TypeOrmModule.forFeature([Poi]), HttpModule],
  providers: [PoiService],
  controllers: [PoiController],
})
export class PoiModule {}
