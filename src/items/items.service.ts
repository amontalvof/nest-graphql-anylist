import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) {}

    async create(createItemInput: CreateItemInput): Promise<Item> {
        const newItem = this.itemRepository.create(createItemInput);
        return this.itemRepository.save(newItem);
    }

    findAll() {
        return `This action returns all items`;
    }

    findOne(id: number) {
        return `This action returns a #${id} item`;
    }

    update(id: number, updateItemInput: UpdateItemInput) {
        return `This action updates a #${id} item`;
    }

    remove(id: number) {
        return `This action removes a #${id} item`;
    }
}
