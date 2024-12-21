export interface ApiResponse<T> {
    statusCode: number;
    content: T;
    dateTime: Date;
  }
  