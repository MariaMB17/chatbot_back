import { HttpStatus } from "@nestjs/common";

export interface Errors {
    msg: string, 
    error?: string, 
    status?: HttpStatus
  }