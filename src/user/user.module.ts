import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypedConfigService } from 'src/config/typed-config.service';
import { AuthConfig } from 'src/config/auth.config';
import { PasswordService } from './password/password.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity into the module
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: TypedConfigService) => ({
        // just return a object with the configuration for the JwtModule
        secret: config.get<AuthConfig>('auth')?.jwt.secret,
        signOptions: {
          expiresIn: config.get<AuthConfig>('auth')?.jwt.expiresIn,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, PasswordService, AuthService, AuthGuard],
  exports: [AuthGuard, JwtModule],
})
export class UserModule {}
