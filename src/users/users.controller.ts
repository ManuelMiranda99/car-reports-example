import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('sign-up')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  @UseInterceptors(SerializeInterceptor)
  @Get(':id')
  async findUser(@Param('id', new ParseIntPipe()) id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Get('')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch(':id')
  updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  removeUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.remove(id);
  }
}
