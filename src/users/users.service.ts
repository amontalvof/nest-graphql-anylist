import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
    private readonly logger = new Logger('UsersService');

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(signupInput: SignUpInput): Promise<User> {
        try {
            const newUser = this.userRepository.create({
                ...signupInput,
                password: bcrypt.hashSync(signupInput.password, 10),
            });
            return await this.userRepository.save(newUser);
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async findAll(): Promise<User[]> {
        return [];
    }

    async findOneByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOneOrFail({
                where: { email },
            });
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    block(id: string) {
        return null;
    }

    private handleDBErrors(error: any): never {
        this.logger.error(error);
        if (error.code === '23505') {
            throw new BadRequestException(error.detail.replace('Key ', ''));
        }
        throw new InternalServerErrorException(
            'Internal Server Error, please try again later'
        );
    }
}
