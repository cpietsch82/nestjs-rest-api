import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string): Promise<UserDocument | unknown> {
    const users = await this.userModel.find({});
    return users.find((user: UserDocument) => user.username === username);
  }

  async update(user_id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    return await this.userModel.updateOne(
      {
        _id: user_id,
      },
      {
        $set: {
          password_hash: hashedPassword,
        },
      },
    );
  }
}
