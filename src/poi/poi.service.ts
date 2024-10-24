import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { lastValueFrom } from 'rxjs';
import { Poi } from './poi.entitty';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PoiService {
  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
    private httpService: HttpService,
  ) {}

  async createPoi(poiData: Partial<Poi>): Promise<Poi> {
    const poi = this.poiRepository.create(poiData);
    return this.poiRepository.save(poi);
  }

  async findAll(): Promise<Poi[]> {
    return this.poiRepository.find();
  }

  async findNearbyPois(referenceCep: string, maxDistance: number): Promise<Poi[]> {
    // Obter coordenadas do CEP de referência
    const referenceCoordinates = await this.getCoordinatesFromCep(referenceCep);
    const pois = await this.poiRepository.find();
    const nearbyPois = [];

    for (const poi of pois) {
      // Obter coordenadas do CEP do POI
      const poiCoordinates = await this.getCoordinatesFromCep(poi.cep);
      if (poiCoordinates) {
        const distance = this.calculateDistance(
          referenceCoordinates.lat,
          referenceCoordinates.lng,
          poiCoordinates.lat,
          poiCoordinates.lng,
        );
        // Verificar se o POI está dentro da distância máxima
        if (distance <= maxDistance) {
          nearbyPois.push(poi);
        }
      }
    }
    return nearbyPois;
  }

  // Função para obter coordenadas (lat/lng) a partir do CEP
  private async getCoordinatesFromCep(cep: string): Promise<{ lat: number; lng: number }> {
    const response = await lastValueFrom(
      this.httpService.get(`https://cep.awesomeapi.com.br/json/${cep}`)
    );
    const { lat, lng } = response.data;
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }

  // Função para calcular a distância entre duas coordenadas (Haversine formula)
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  }

  // Função para converter graus em radianos
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
