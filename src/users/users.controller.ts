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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

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
