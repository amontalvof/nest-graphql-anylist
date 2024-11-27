import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(,{name:'signup'})
    async signUp(@Args('input') input: SignUpInput) {
        // return this.authService.signUp(input);
    }

    @Mutation(,{name:'login'})
    async login(@Args('input') input: LoginInput) {
        // return this.authService.login(input);
    }

    @Query(,{name:'revalidateToken'})
    async revalidateToken(@Args('token') token: string) {
        // return this.authService.revalidateToken(token);
    }

}
