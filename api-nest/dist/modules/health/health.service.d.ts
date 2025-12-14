import { DataSource } from 'typeorm';
export declare class HealthService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    check(): Promise<{
        ok: boolean;
        database: string;
        timestamp: string;
    }>;
}
