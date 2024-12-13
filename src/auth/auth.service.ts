import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/inputs/login.input';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
    async signUp(signupInput: SignUpInput): Promise<AuthResponse> {
        const user = await this.usersService.create(signupInput);
        return {
            user,
            token: 'ABC123',
        };
    }

    async login(loginInput: LoginInput): Promise<AuthResponse> {
        const { email, password } = loginInput;
        const user = await this.usersService.findOneByEmail(email);

        return {
            user,
            token: 'ABC123',
        };
    }
}
