import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionCurrency } from 'src/common/enums/transaction-currency.enum';
import { TransactionCategory } from 'src/common/enums/transaction-category.enum';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: TransactionCurrency,
    enumName: 'TransactionCurrency',
  })
  @IsEnum(TransactionCurrency)
  currency: TransactionCurrency;

  @ApiProperty({
    enum: TransactionType,
    enumName: 'TransactionType',
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    enum: TransactionCategory,
    enumName: 'TransactionCategory',
  })
  @IsEnum(TransactionCategory)
  category: TransactionCategory;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  accountReceiver: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  secondUserEmail?: string;
}
