import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeders.module';
import { TransactionSeederService } from './seeder/transaction/transaction-seeder.service';
import { Logger } from '@nestjs/common';
import { UserSeederService } from './seeder/user/user-seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const logger = appContext.get(Logger);
      const transactionSeeder = appContext.get(TransactionSeederService);
      const userSeeder = appContext.get(UserSeederService);

      await userSeeder.clear();
      await transactionSeeder.clear();
      logger.debug('Seeder cleared');

      await userSeeder.seed();
      logger.debug('Seededed Users');

      transactionSeeder.seed().finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}

bootstrap();
