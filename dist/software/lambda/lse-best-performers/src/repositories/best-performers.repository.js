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
exports.BestPerformersRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_constant_1 = require("../constants/database.constant");
const best_performers_pipeline_1 = require("../pipelines/best-performers.pipeline");
let BestPerformersRepository = class BestPerformersRepository {
    constructor(mongoDbClient) {
        this.mongoDbClient = mongoDbClient;
    }
    async findBestPerformers(limit = 10) {
        const pipeline = best_performers_pipeline_1.BestPerformersPipeline.getBestPerformersPipeline(limit);
        const results = await this.mongoDbClient.aggregate(database_constant_1.Database.collections.ftse100PriceAnalysis, pipeline);
        if (!results || results.length === 0) {
            return [];
        }
        return this.transformToBestPerformers(results);
    }
    transformToBestPerformers(results) {
        return results.map(result => ({
            Symbol: result.Symbol,
            Change1m: result['1m'].ChangePercent,
            Change3m: result['3m'].ChangePercent,
            Change6m: result['6m'].ChangePercent,
            LinearRegression1m: result['1m'].R2 * 100,
            LinearRegression3m: result['3m'].R2 * 100,
            LinearRegression6m: result['6m'].R2 * 100
        }));
    }
};
exports.BestPerformersRepository = BestPerformersRepository;
exports.BestPerformersRepository = BestPerformersRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('MongoDbClient'))
], BestPerformersRepository);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVzdC1wZXJmb3JtZXJzLnJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb2Z0d2FyZS9sYW1iZGEvbHNlLWJlc3QtcGVyZm9ybWVycy9zcmMvcmVwb3NpdG9yaWVzL2Jlc3QtcGVyZm9ybWVycy5yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE4QztBQUk5QyxzRUFBMEQ7QUFDMUQsb0ZBQStFO0FBR3hFLElBQU0sd0JBQXdCLEdBQTlCLE1BQU0sd0JBQXdCO0lBQ2pDLFlBQ3FDLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQzlELENBQUM7SUFFSixLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBZ0IsRUFBRTtRQUN2QyxNQUFNLFFBQVEsR0FBRyxpREFBc0IsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUM5Qyw0QkFBUSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFDekMsUUFBUSxDQUNYLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLHlCQUF5QixDQUFDLE9BQXdCO1FBQ3RELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYTtZQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWE7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhO1lBQ3BDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRztZQUN6QyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUc7WUFDekMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHO1NBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztDQUNKLENBQUE7QUE5QlksNERBQXdCO21DQUF4Qix3QkFBd0I7SUFEcEMsSUFBQSxxQkFBVSxHQUFFO0lBR0osV0FBQSxJQUFBLGlCQUFNLEVBQUMsZUFBZSxDQUFDLENBQUE7R0FGbkIsd0JBQXdCLENBOEJwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ3RzeXJpbmdlJztcclxuaW1wb3J0IHsgTW9uZ29EYkNsaWVudCB9IGZyb20gJ0BzaGFyZWQvc3JjL2NsaWVudHMvbW9uZ29kYi5jbGllbnQnO1xyXG5pbXBvcnQgeyBQcmljZUFuYWx5c2lzIH0gZnJvbSAnLi4vbW9kZWxzL3ByaWNlLWFuYWx5c2lzLm1vZGVsJztcclxuaW1wb3J0IHsgSUJlc3RQZXJmb3JtZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Jlc3QtcGVyZm9ybWVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSAnLi4vY29uc3RhbnRzL2RhdGFiYXNlLmNvbnN0YW50JztcclxuaW1wb3J0IHsgQmVzdFBlcmZvcm1lcnNQaXBlbGluZSB9IGZyb20gJy4uL3BpcGVsaW5lcy9iZXN0LXBlcmZvcm1lcnMucGlwZWxpbmUnO1xyXG5cclxuQGluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmVzdFBlcmZvcm1lcnNSZXBvc2l0b3J5IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBpbmplY3QoJ01vbmdvRGJDbGllbnQnKSBwcml2YXRlIG1vbmdvRGJDbGllbnQ6IE1vbmdvRGJDbGllbnRcclxuICAgICkge31cclxuXHJcbiAgICBhc3luYyBmaW5kQmVzdFBlcmZvcm1lcnMobGltaXQ6IG51bWJlciA9IDEwKTogUHJvbWlzZTxJQmVzdFBlcmZvcm1lcltdPiB7XHJcbiAgICAgICAgY29uc3QgcGlwZWxpbmUgPSBCZXN0UGVyZm9ybWVyc1BpcGVsaW5lLmdldEJlc3RQZXJmb3JtZXJzUGlwZWxpbmUobGltaXQpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLm1vbmdvRGJDbGllbnQuYWdncmVnYXRlPFByaWNlQW5hbHlzaXM+KFxyXG4gICAgICAgICAgICBEYXRhYmFzZS5jb2xsZWN0aW9ucy5mdHNlMTAwUHJpY2VBbmFseXNpcyxcclxuICAgICAgICAgICAgcGlwZWxpbmVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3VsdHMgfHwgcmVzdWx0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtVG9CZXN0UGVyZm9ybWVycyhyZXN1bHRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybVRvQmVzdFBlcmZvcm1lcnMocmVzdWx0czogUHJpY2VBbmFseXNpc1tdKTogSUJlc3RQZXJmb3JtZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubWFwKHJlc3VsdCA9PiAoe1xyXG4gICAgICAgICAgICBTeW1ib2w6IHJlc3VsdC5TeW1ib2wsXHJcbiAgICAgICAgICAgIENoYW5nZTFtOiByZXN1bHRbJzFtJ10uQ2hhbmdlUGVyY2VudCxcclxuICAgICAgICAgICAgQ2hhbmdlM206IHJlc3VsdFsnM20nXS5DaGFuZ2VQZXJjZW50LFxyXG4gICAgICAgICAgICBDaGFuZ2U2bTogcmVzdWx0Wyc2bSddLkNoYW5nZVBlcmNlbnQsXHJcbiAgICAgICAgICAgIExpbmVhclJlZ3Jlc3Npb24xbTogcmVzdWx0WycxbSddLlIyICogMTAwLFxyXG4gICAgICAgICAgICBMaW5lYXJSZWdyZXNzaW9uM206IHJlc3VsdFsnM20nXS5SMiAqIDEwMCxcclxuICAgICAgICAgICAgTGluZWFyUmVncmVzc2lvbjZtOiByZXN1bHRbJzZtJ10uUjIgKiAxMDBcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn1cclxuIl19