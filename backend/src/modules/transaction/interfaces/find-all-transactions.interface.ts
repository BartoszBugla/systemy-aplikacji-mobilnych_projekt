export interface FindAllTransactions {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
  userId: string;
}
