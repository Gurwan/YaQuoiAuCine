import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    private token: string;

    constructor(private configService: ConfigService) {
        this.token = this.configService.get<string>('TOKEN_BOXOFFICE') ?? "";
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        return token === this.token;
    }
}