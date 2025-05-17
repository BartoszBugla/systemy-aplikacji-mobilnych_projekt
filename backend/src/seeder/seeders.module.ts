import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionSchema,
} from 'src/modules/transaction/schemas/transaction.schema';

import { TransactionSeederService } from './transaction/transaction-seeder.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { User, UserSchema } from 'src/modules/user/schemas/user.schema';
import { UserSeederService } from './user/user-seeder.service';
import { UserModule } from 'src/modules/user/user.module';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/${process.env.Db_PORT}`),
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [Logger, TransactionSeederService, UserSeederService],
})
export class SeederModule {}
