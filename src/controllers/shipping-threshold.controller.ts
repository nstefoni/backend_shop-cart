import { Controller, Get } from '@nestjs/common';
import { ShippingThresholdService } from '../services/shipping-threshold.service';

@Controller('shipping-threshold') //ruta del controlador.
export class ShippingThresholdController {
  constructor(
    private readonly shippingThresholdService: ShippingThresholdService,
    //se inyecta el servicio de 'ShippingThresholdService'.
  ) {}

  @Get()
  getShippingThreshold() {
    //método para obtener el umbral de envío.
    return this.shippingThresholdService.getShippingThreshold();
  }
}
