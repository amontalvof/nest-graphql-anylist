import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { UsersService } from 'src/users/users.service';

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
}
