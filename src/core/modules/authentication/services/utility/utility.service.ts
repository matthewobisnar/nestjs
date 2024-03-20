import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleUtilEntity } from 'src/shared/db/entities/role.util.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilityService {
    constructor(@InjectRepository(RoleUtilEntity) private readonly roleUtilEntity: Repository<RoleUtilEntity>) {}

    async getRoles() {
        return (await this.roleUtilEntity.find()).map(role => role.roleName.toUpperCase());
    }
}
