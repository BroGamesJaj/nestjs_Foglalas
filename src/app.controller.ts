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
    let dateTime = new Date()
    var errors = []
    if(!foglalasDto.nev || !foglalasDto.email || !foglalasDto.date || !foglalasDto.viewers){
      errors.push("Minden adatot meg kell adni!")
    }
    if(!/^\w+@+\w+$/.test(foglalasDto.email)){
      errors.push("Az email cím helytelen!")
    }
    if(foglalasDto.viewers < 1 || foglalasDto.viewers > 10){
      errors.push("A nézők száma minimum 1 és maximum 10 fő lehet!")
    }
    if(new Date(foglalasDto.date) < dateTime){
      errors.push("A dátum nem lehet az aktuálisnál kisebb!")
    }
    if(errors.length > 0){
      response.render('foglalas',
      {
        data: foglalasDto,
        errors: errors
      })
      return
    }
    response.redirect("siker")
  }

  @Get('siker')
  @Render('siker')
  siker(){
  }
}
