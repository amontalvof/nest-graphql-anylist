import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { LoginInput } from './dto/inputs/login.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthResponse, { name: 'signup' })
    async signUp(
        @Args('signupInput') signupInput: SignUpInput
    ): Promise<AuthResponse> {
        return this.authService.signUp(signupInput);
    }

    @Mutation(() => AuthResponse, { name: 'login' })
    async login(
        @Args('loginInput') loginInput: LoginInput
    ): Promise<AuthResponse> {
        return this.authService.login(loginInput);
    }

    @Query(() => AuthResponse, { name: 'revalidateToken' })
    @UseGuards(JwtAuthGuard)
    revalidateToken() // @CurrentUser() user: User,
    : AuthResponse {
        // return this.authService.revalidateToken(token);
        throw new Error('Not implemented');
    }
}
