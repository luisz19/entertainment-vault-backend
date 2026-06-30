import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { typeOrmConfig } from './config/database.config';
import { appConfigSchema } from './config/config.types';
import { User } from './user/entities/user.entity';
import { TypedConfigService } from './config/typed-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // inicializa o TypeORM de forma assíncrona, permitindo que as configurações sejam carregadas dinamicamente
      imports: [ConfigModule], //após configurar o ConfigModule, ele é importado aqui para que possamos usar o ConfigService
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        //cria a configuração do TypeORM usando o ConfigService para acessar as variáveis de ambiente
        ...configService.get('database'),
        entities: [User],
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig, typeOrmConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),

    UserModule,
    MediaModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: TypedConfigService, // sempre que o TypedConfigService for injetado, o NestJS vai usar a instância do ConfigService existente
      useExisting: ConfigService, // apontam para a mesma instância
    },
  ],
})
export class AppModule {}
