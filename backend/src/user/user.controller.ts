import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user') // Đường dẫn chính
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register') // Đường dẫn phụ
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);
        return { message: 'Đăng ký thành công!', user };
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.loginUser(loginUserDto);
    }
}
