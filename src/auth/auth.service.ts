import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/inputs/login.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    private getJwtToken(userId: string): string {
        return this.jwtService.sign({ id: userId });
    }

    async signUp(signupInput: SignUpInput): Promise<AuthResponse> {
        const user = await this.usersService.create(signupInput);
        const token = this.getJwtToken(user.id);
        return {
            user,
            token,
        };
    }

    async login(loginInput: LoginInput): Promise<AuthResponse> {
        const { email, password } = loginInput;
        const user = await this.usersService.findOneByEmail(email);
        if (!bcrypt.compareSync(password, user.password)) {
            throw new BadRequestException('Invalid credentials');
        }
        const token = this.getJwtToken(user.id);
        return {
            user,
            token,
        };
    }
}
