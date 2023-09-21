import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloWorldController {
  @Get()
  helloWorld(): string {
    return 'Hello World!';
  }
}
