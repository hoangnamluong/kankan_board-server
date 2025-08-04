import 'dotenv/config';
import * as bcrypt from 'bcrypt';

export class EncryptionUtil {
  private static readonly saltOrRound: number = Number(process.env['SALT']);

  static encrypt(value: string): string {
    const salt = bcrypt.genSaltSync(this.saltOrRound);
    const hashPassword = bcrypt.hashSync(value, salt);

    return hashPassword;
  }

  static compare(value: string, comparedValue: string): boolean {
    return bcrypt.compareSync(value, comparedValue);
  }
}
