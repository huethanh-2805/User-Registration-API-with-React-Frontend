import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModule : Model<User>) {}

    async createUser(createUserDto: CreateUserDto) : Promise<User>{
        const {email, password} = createUserDto;

        //Kiểm tra email đã tồn tại hay chưa
        const existingUser = await this.userModule.findOne({email});

        //Thông báo lỗi nếu email đã tồn tại
        if(existingUser){
            throw new BadRequestException('Email đã được sử dụng');
        }

        const hashPassword = await bcrypt.hash(password, 10); //Mã hóa mật khẩu
        const user = new this.userModule({email, password:hashPassword});

        return user.save();
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<{ message: string }> {
        const { email, password } = loginUserDto;
    
        // Tìm người dùng theo email
        const user = await this.userModule.findOne({ email });
        if (!user) {
            throw new BadRequestException('Email không tồn tại');
        }
    
        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Mật khẩu không chính xác');
        }
    
        return { message: 'Đăng nhập thành công' };
    }
}