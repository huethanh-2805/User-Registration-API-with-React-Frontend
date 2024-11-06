import { Controller, Post, Body, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from "express";

@Controller('user') // Đường dẫn chính
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @Post('register') // Đường dẫn phụ
    // async register(@Body() createUserDto: CreateUserDto) {
    //     const user = await this.userService.createUser(createUserDto);
    //     return { message: 'Đăng ký thành công!', user };
    // }

    @Post('register') // Đường dẫn phụ
    async register(@Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.createUser(createUserDto);
            return { message: 'Đăng ký thành công!', user: { email: user.email } };
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }

    // @Post('login')
    // async login(@Body() loginUserDto: LoginUserDto) {
    //     return this.userService.loginUser(loginUserDto);
    // }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        try {
            const { accessToken, user } = await this.userService.loginUser(loginUserDto);

            return {
                message: "Đăng nhập thành công",
                accessToken,
                user
            };
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: Request) {
        console.log("Dữ liệu user từ JWT:", req.user);
        
        return {
            message: 'Thông tin người dùng',
            user: req.user,
        };
    }
}
