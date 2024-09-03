import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() //se define un guardia de autenticación local.
export class LocalAuthGuard extends AuthGuard('local') {}
