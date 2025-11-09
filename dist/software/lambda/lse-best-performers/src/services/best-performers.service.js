"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestPerformersService = void 0;
const tsyringe_1 = require("tsyringe");
let BestPerformersService = class BestPerformersService {
    constructor(bestPerformersRepository, snsClient, logger, messageFormatter) {
        this.bestPerformersRepository = bestPerformersRepository;
        this.snsClient = snsClient;
        this.logger = logger;
        this.messageFormatter = messageFormatter;
    }
    async analyzeBestPerformers() {
        this.logger.info('Executing aggregation pipeline');
        const performers = await this.bestPerformersRepository.findBestPerformers(10);
        if (performers.length === 0) {
            this.logger.info('No best performers found');
            return [];
        }
        this.logger.info(`Found ${performers.length} best performers`);
        return performers;
    }
    async publishBestPerformers(performers) {
        if (performers.length === 0) {
            return;
        }
        const message = this.messageFormatter.formatBestPerformersMessage(performers);
        this.logger.info(`Publishing to SNS topic`);
        await this.snsClient.publishCommand({
            Subject: '📈 Best Performers',
            Message: message
        });
        this.logger.info('SNS message published successfully');
    }
};
exports.BestPerformersService = BestPerformersService;
exports.BestPerformersService = BestPerformersService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('BestPerformersRepository')),
    __param(1, (0, tsyringe_1.inject)('SnsClient')),
    __param(2, (0, tsyringe_1.inject)('LoggerService')),
    __param(3, (0, tsyringe_1.inject)('MessageFormatterHelper'))
], BestPerformersService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVzdC1wZXJmb3JtZXJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb2Z0d2FyZS9sYW1iZGEvbHNlLWJlc3QtcGVyZm9ybWVycy9zcmMvc2VydmljZXMvYmVzdC1wZXJmb3JtZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQThDO0FBUXZDLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXFCO0lBQzlCLFlBQ2dELHdCQUFrRCxFQUNqRSxTQUFvQixFQUNoQixNQUFxQixFQUNaLGdCQUF3QztRQUh0Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2pFLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNaLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBd0I7SUFDbkYsQ0FBQztJQUVKLEtBQUssQ0FBQyxxQkFBcUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUNuRCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU5RSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUM3QyxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDLENBQUM7UUFDL0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxVQUE0QjtRQUNwRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTztRQUNYLENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM1QyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO1lBQ2hDLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0osQ0FBQTtBQXBDWSxzREFBcUI7Z0NBQXJCLHFCQUFxQjtJQURqQyxJQUFBLHFCQUFVLEdBQUU7SUFHSixXQUFBLElBQUEsaUJBQU0sRUFBQywwQkFBMEIsQ0FBQyxDQUFBO0lBQ2xDLFdBQUEsSUFBQSxpQkFBTSxFQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ25CLFdBQUEsSUFBQSxpQkFBTSxFQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZCLFdBQUEsSUFBQSxpQkFBTSxFQUFDLHdCQUF3QixDQUFDLENBQUE7R0FMNUIscUJBQXFCLENBb0NqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ3RzeXJpbmdlJztcclxuaW1wb3J0IHsgQmVzdFBlcmZvcm1lcnNSZXBvc2l0b3J5IH0gZnJvbSAnLi4vcmVwb3NpdG9yaWVzL2Jlc3QtcGVyZm9ybWVycy5yZXBvc2l0b3J5JztcclxuaW1wb3J0IHsgU25zQ2xpZW50IH0gZnJvbSAnQHNoYXJlZC9zcmMvY2xpZW50cy9zbnMuY2xpZW50JztcclxuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BzaGFyZWQvc3JjL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJlc3RQZXJmb3JtZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Jlc3QtcGVyZm9ybWVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VGb3JtYXR0ZXJIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL21lc3NhZ2UtZm9ybWF0dGVyLmhlbHBlcic7XHJcblxyXG5AaW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCZXN0UGVyZm9ybWVyc1NlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQGluamVjdCgnQmVzdFBlcmZvcm1lcnNSZXBvc2l0b3J5JykgcHJpdmF0ZSBiZXN0UGVyZm9ybWVyc1JlcG9zaXRvcnk6IEJlc3RQZXJmb3JtZXJzUmVwb3NpdG9yeSxcclxuICAgICAgICBAaW5qZWN0KCdTbnNDbGllbnQnKSBwcml2YXRlIHNuc0NsaWVudDogU25zQ2xpZW50LFxyXG4gICAgICAgIEBpbmplY3QoJ0xvZ2dlclNlcnZpY2UnKSBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyU2VydmljZSxcclxuICAgICAgICBAaW5qZWN0KCdNZXNzYWdlRm9ybWF0dGVySGVscGVyJykgcHJpdmF0ZSBtZXNzYWdlRm9ybWF0dGVyOiBNZXNzYWdlRm9ybWF0dGVySGVscGVyXHJcbiAgICApIHt9XHJcblxyXG4gICAgYXN5bmMgYW5hbHl6ZUJlc3RQZXJmb3JtZXJzKCk6IFByb21pc2U8SUJlc3RQZXJmb3JtZXJbXT4ge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0V4ZWN1dGluZyBhZ2dyZWdhdGlvbiBwaXBlbGluZScpO1xyXG4gICAgICAgIGNvbnN0IHBlcmZvcm1lcnMgPSBhd2FpdCB0aGlzLmJlc3RQZXJmb3JtZXJzUmVwb3NpdG9yeS5maW5kQmVzdFBlcmZvcm1lcnMoMTApO1xyXG5cclxuICAgICAgICBpZiAocGVyZm9ybWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnTm8gYmVzdCBwZXJmb3JtZXJzIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEZvdW5kICR7cGVyZm9ybWVycy5sZW5ndGh9IGJlc3QgcGVyZm9ybWVyc2ApO1xyXG4gICAgICAgIHJldHVybiBwZXJmb3JtZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHB1Ymxpc2hCZXN0UGVyZm9ybWVycyhwZXJmb3JtZXJzOiBJQmVzdFBlcmZvcm1lcltdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHBlcmZvcm1lcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VGb3JtYXR0ZXIuZm9ybWF0QmVzdFBlcmZvcm1lcnNNZXNzYWdlKHBlcmZvcm1lcnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFB1Ymxpc2hpbmcgdG8gU05TIHRvcGljYCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zbnNDbGllbnQucHVibGlzaENvbW1hbmQoe1xyXG4gICAgICAgICAgICBTdWJqZWN0OiAn8J+TiCBCZXN0IFBlcmZvcm1lcnMnLFxyXG4gICAgICAgICAgICBNZXNzYWdlOiBtZXNzYWdlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnU05TIG1lc3NhZ2UgcHVibGlzaGVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==