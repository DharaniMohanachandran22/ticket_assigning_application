import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(SignUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(LoginDto: LoginDto): Promise<{
        token: string;
    }>;
}
