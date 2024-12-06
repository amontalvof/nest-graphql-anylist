import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async create(signupInput: SignUpInput): Promise<User> {
        try {
            const newUser = this.userRepository.create(signupInput);
            return await this.userRepository.save(newUser);
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }

    async findAll(): Promise<User[]> {
        return [];
    }

    async findOne(id: string): Promise<User> {
        return null;
    }

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    block(id: string) {
        return null;
    }
}
