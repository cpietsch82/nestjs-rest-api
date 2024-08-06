import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../../common/decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.mongoose.pingCheck('mongoose'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      // The used disk storage should not exceed 500 GB (only for testing)
      () =>
        this.disk.checkStorage('disk health', {
          threshold: 500 * 1024 * 1024 * 1024,
          path: '/',
        }),
    ]);
  }
}
