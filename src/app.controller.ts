import { Controller, Get, Render, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('Foglalas')
  @Render('Foglalas')
  foglalas() {
    return {
      data: [],
      errors: []
    }
  }

  @Post('Foglalas')
  postFoglalas(@Body() foglalasDto: FoglalasDto,@Res() response: Response) {
    var errors = []
    var data = foglalasDto
    console.log(foglalasDto);
    if(!foglalasDto.nev || !foglalasDto.email || !foglalasDto.date || !foglalasDto.viewers){
      errors.push("Minden adatot meg kell adni!")
    }
    console.log(errors.length)
    if(errors.length > 0){
      response.render('foglalas')
      return {
        data: data,
        errors: errors
      }
      
    }
    response.redirect("siker")
  }

  @Get('siker')
  @Render('siker')
  siker(){
  }
}
