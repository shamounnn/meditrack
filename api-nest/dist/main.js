"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: config.get('FRONTEND_URL') || '*',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('MediTrack API')
        .setDescription('Professional Medication Management System API Documentation')
        .setVersion('2.0.0')
        .addTag('auth', 'Authentication endpoints')
        .addTag('users', 'User management')
        .addTag('medications', 'Medication management')
        .addTag('schedules', 'Medication schedules')
        .addTag('alerts', 'Drug interaction alerts')
        .addTag('health', 'Health check endpoints')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = config.get('PORT') || 4000;
    await app.listen(port);
    console.log(`MediTrack Nest API running on http://localhost:${port}`);
    console.log(`Swagger Documentation available at http://localhost:${port}/api/docs`);
}
bootstrap().catch((error) => {
    console.error('Failed to bootstrap Nest application', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map