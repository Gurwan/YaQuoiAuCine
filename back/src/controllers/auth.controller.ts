
import { Controller, Post, Body, ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    private readonly token: string;

    constructor(private configService: ConfigService) {
        this.token = this.configService.get<string>('TOKEN_BOXOFFICE') ?? "";
    }

    @Post('login')
    login(@Body('password') password: string) {
        if (password === this.token) {
            return { token: this.token };
        }
        return { error: 'Mot de passe incorrect' };
    }
}