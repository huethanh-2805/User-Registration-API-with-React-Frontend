import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;

        // Kiểm tra email đã tồn tại hay chưa
        const existingUser = await this.userModel.findOne({ email });

        // Thông báo lỗi nếu email đã tồn tại
        if (existingUser) {
            throw new BadRequestException('Email đã được sử dụng');
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ email, password: hashedPassword });

        return user.save();
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<{ accessToken: string; user: { email: string } }> {
        const { email, password } = loginUserDto;

        // Tìm người dùng theo email
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new BadRequestException('Email không tồn tại');
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Mật khẩu không chính xác');
        }

        // Tạo JWT token
        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);

        // Trả về token và thông tin người dùng
        return { accessToken, user: { email: user.email } };
    }

    async validateUser(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }
}
