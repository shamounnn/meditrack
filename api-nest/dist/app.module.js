"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const medications_module_1 = require("./modules/medications/medications.module");
const schedules_module_1 = require("./modules/schedules/schedules.module");
const alerts_module_1 = require("./modules/alerts/alerts.module");
const health_module_1 = require("./modules/health/health.module");
const database_module_1 = require("./modules/database/database.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                playground: true,
                path: '/graphql',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('PGHOST'),
                    port: Number(configService.get('PGPORT')) || 5432,
                    username: configService.get('PGUSER'),
                    password: configService.get('PGPASSWORD'),
                    database: configService.get('PGDATABASE'),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            database_module_1.DatabaseModule,
            health_module_1.HealthModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            medications_module_1.MedicationsModule,
            schedules_module_1.SchedulesModule,
            alerts_module_1.AlertsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map