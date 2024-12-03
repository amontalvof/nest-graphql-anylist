import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';

@Injectable()
export class AuthService {
    async signUp(signupInput: SignUpInput): Promise<AuthResponse> {
        console.log({ signupInput });
        throw new Error('Method not implemented.');
    }
}
