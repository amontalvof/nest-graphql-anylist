import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { LoginInput } from './dto/inputs/login.input';

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

    // @Query(,{name:'revalidateToken'})
    // async revalidateToken(@Args('token') token: string) {
    //     // return this.authService.revalidateToken(token);
    // }
}
