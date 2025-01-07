import {
    createParamDecorator,
    ExecutionContext,
    ForbiddenException,
    InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
    (roles: ValidRoles[] = [], context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        if (!user) {
            throw new InternalServerErrorException(
                'No user inside the request'
            );
        }
        if (roles.length) {
            const hasRole = roles.some((role) => user.roles.includes(role));
            if (!hasRole) {
                throw new ForbiddenException(
                    'User does not have the necessary role'
                );
            }
        }
        return user;
    }
);
