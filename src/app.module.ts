import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoiModule } from './poi/poi.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Substitua pelo seu usuário do MySQL
      password: 'root', // Substitua pela sua senha do MySQL
      database: 'poi_service',
      autoLoadEntities: true,
      synchronize: true, // Sincroniza automaticamente o esquema, use com cuidado em produção
    }),
    PoiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
