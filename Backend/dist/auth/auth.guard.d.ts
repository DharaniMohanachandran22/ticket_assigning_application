import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from './schemas/user.schmas';
export declare class AuthGuard implements CanActivate {
    private readonly configService;
    private readonly userModel;
    constructor(configService: ConfigService, userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateRequest;
}
