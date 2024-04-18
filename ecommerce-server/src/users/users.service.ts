import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const documentAlreadyExists = await this.userRepository.exists({where: {document: userDto.document}});
    if (documentAlreadyExists) {
      throw new BadRequestException("Já existe um usuário cadastrado com esse CPF")
    }
    return this.userRepository.save(this.userRepository.create(userDto));
  }

  async getUsers(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserDto>> {

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .where('user.deletedAt IS NULL')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findUserByDocument(document: string) {
    return this.userRepository.findOne({ where: { document } });
  }

  async remove(id: number) {
    const updateResult: UpdateResult = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ deletedAt: new Date() })
      .where('id = :id', { id })
      .execute();

    if (updateResult.affected === 0) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
  }
}
