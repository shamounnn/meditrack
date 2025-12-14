import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  async check(): Promise<{ ok: boolean; database: string; timestamp: string }> {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        ok: true,
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        ok: false,
        database: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
