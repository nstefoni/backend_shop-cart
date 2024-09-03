import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingThresholdService {
  //servicio de umbral de envío.
  getShippingThreshold(): { freeShippingThreshold: number } {
    const freeShippingThreshold = 5000;
    return { freeShippingThreshold };
  }
}
