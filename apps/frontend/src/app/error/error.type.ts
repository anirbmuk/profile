export interface IError {
  code: number;
  message: string;
  path?: string;
  url: string | null | undefined;
}
