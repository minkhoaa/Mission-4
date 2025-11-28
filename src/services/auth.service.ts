import { Account } from "../models/account";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { generateTokens, JwtPayload } from "../utils/jwt";
import { AppError } from "../core/errors/AppError";
export interface RegisterDto {
  name: string;
  gender: "M" | "F";
  dob: Date;
  username: string;
  password: string;
}
export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface UserDto {}
export const AuthService = {
  async Resgister(registerDto: RegisterDto) {
    const existingUser = await Account.findOne({
      username: registerDto.username,
    });
    if (existingUser) throw new Error("Username is already used");
    const user = new User({
      name: registerDto.name,
      gender: registerDto.gender,
      dob: registerDto.dob,
    });
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const account = new Account({
      username: registerDto.username,
      user: user._id,
      hashedPassword: hashedPassword,
      status: "ACTIVATE",
    });
    const payload: JwtPayload = {
      sub: account._id.toString(),
      userId: user._id.toString(),
      userName: account.username,
    };

    const { accessToken, refreshToken } = generateTokens(payload);
    account.accessToken = accessToken;
    account.refreshToken = refreshToken;
    await account.save();
    await user.save();
    return user;
  },
  async Login(dto: LoginDto) {
    var account = await Account.findOne({ username: dto.username }).populate(
      "user"
    );
    if (!account) throw new Error("User is not existed");
    if (account.status !== "ACTIVATE")
      throw new AppError("User account is DEACTIVATED");

    const isMatch = await bcrypt.compare(dto.password, account.hashedPassword);

    if (!isMatch) throw new AppError("Invalid credentials");

    const user = account.user as any;
    const payload: JwtPayload = {
      sub: account._id.toString(),
      userId: user.id.toString(),
      userName: account.username.toString(),
    };
    const { accessToken, refreshToken } = generateTokens(payload);
    account.accessToken = accessToken;
    account.refreshToken = refreshToken;
    await account.save();
    const userInfo: LoginResponseDto = {
      userId: user.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return userInfo;
  },
};
