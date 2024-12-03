import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthResponse, { name: 'signup' })
    async signUp(
        @Args('signupInput') signupInput: SignUpInput
    ): Promise<AuthResponse> {
        return this.authService.signUp(signupInput);
    }

    // @Mutation(,{name:'login'})
    // async login(@Args('input') input: LoginInput) {
    //     // return this.authService.login(input);
    // }

    // @Query(,{name:'revalidateToken'})
    // async revalidateToken(@Args('token') token: string) {
    //     // return this.authService.revalidateToken(token);
    // }
}
