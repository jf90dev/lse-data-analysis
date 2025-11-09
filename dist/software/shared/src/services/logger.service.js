"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const tsyringe_1 = require("tsyringe");
const winston_1 = require("winston");
let LoggerService = class LoggerService {
    constructor() {
        this.logLevel = process.env.LOG_LEVEL || 'info';
        const logLevels = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
            trace: 5
        };
        this.logger = (0, winston_1.createLogger)({
            levels: logLevels,
            level: this.logLevel,
            format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), winston_1.format.printf((info) => `${info.level.toUpperCase()} ${info.message}`)),
            transports: [
                new winston_1.transports.Console()
            ]
        });
    }
    info(message) {
        this.logger.info(this.addTaskName(this.addCorrelationId(message)));
    }
    errorMessage(message) {
        this.logger.error(this.addTaskName(this.addCorrelationId(message)));
    }
    error(error) {
        const message = `${error.stack ? error.stack : error.message}`;
        this.logger.error(this.addTaskName(this.addCorrelationId(message)));
    }
    debug(message) {
        this.logger.debug(this.addTaskName(this.addCorrelationId(message)));
    }
    warn(message) {
        this.logger.warn(this.addTaskName(this.addCorrelationId(message)));
    }
    setCorrelationId(correlationId) {
        this.correlationId = correlationId || null;
    }
    setTaskName(taskName) {
        this.taskName = taskName;
    }
    addCorrelationId(message) {
        return this.correlationId ? `[${this.correlationId}] ${message}` : message;
    }
    addTaskName(message) {
        return this.taskName ? `[${this.taskName}] ${message}` : message;
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, tsyringe_1.injectable)()
], LoggerService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zb2Z0d2FyZS9zaGFyZWQvc3JjL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDQUFxQztBQUNyQyxxQ0FBbUU7QUFJNUQsSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQU90QjtRQUxRLGFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUM7UUFPdkQsTUFBTSxTQUFTLEdBQUc7WUFDZCxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBSUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLHNCQUFZLEVBQUM7WUFDdkIsTUFBTSxFQUFFLFNBQVM7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3BCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FDbEIsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFDOUIsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxFQUN2RCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUM5RTtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLG9CQUFVLENBQUMsT0FBTyxFQUFFO2FBQzNCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLElBQUksQ0FBQyxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sWUFBWSxDQUFDLE9BQWU7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxLQUFLLENBQW1CLEtBQW1CO1FBQzlDLE1BQU0sT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQWU7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxJQUFJLENBQUMsT0FBZTtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUdNLGdCQUFnQixDQUFDLGFBQXNCO1FBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxJQUFJLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRU0sV0FBVyxDQUFDLFFBQWdCO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFlO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDL0UsQ0FBQztJQUVPLFdBQVcsQ0FBQyxPQUFlO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckUsQ0FBQztDQUNKLENBQUE7QUF2RVksc0NBQWE7d0JBQWIsYUFBYTtJQUR6QixJQUFBLHFCQUFVLEdBQUU7R0FDQSxhQUFhLENBdUV6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdGFibGV9IGZyb20gJ3RzeXJpbmdlJztcclxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyLCBMb2dnZXIsIGZvcm1hdCwgdHJhbnNwb3J0cyB9IGZyb20gJ3dpbnN0b24nO1xyXG5pbXBvcnQgeyBFcnJvckJhc2UgfSBmcm9tICcuLi9tb2RlbHMvZXJyb3ItaGFuZGxpbmcvZXJyb3ItYmFzZS5tb2RlbCc7XHJcblxyXG5AaW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXI7XHJcbiAgICBwcml2YXRlIGxvZ0xldmVsOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5MT0dfTEVWRUwgfHwgJ2luZm8nO1xyXG4gICAgcHJpdmF0ZSBjb3JyZWxhdGlvbklkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSB0YXNrTmFtZTogc3RyaW5nO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgbG9nTGV2ZWxzID0ge1xyXG4gICAgICAgICAgICBmYXRhbDogMCxcclxuICAgICAgICAgICAgZXJyb3I6IDEsXHJcbiAgICAgICAgICAgIHdhcm46IDIsXHJcbiAgICAgICAgICAgIGluZm86IDMsXHJcbiAgICAgICAgICAgIGRlYnVnOiA0LFxyXG4gICAgICAgICAgICB0cmFjZTogNVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xyXG4gICAgICAgICAgICBsZXZlbHM6IGxvZ0xldmVscyxcclxuICAgICAgICAgICAgbGV2ZWw6IHRoaXMubG9nTGV2ZWwsXHJcbiAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0LmNvbWJpbmUoXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQuZXJyb3JzKHsgc3RhY2s6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQudGltZXN0YW1wKHsgZm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcy5TU1MnIH0pLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0LnByaW50ZigoaW5mbzogYW55KSA9PiBgJHtpbmZvLmxldmVsLnRvVXBwZXJDYXNlKCl9ICR7aW5mby5tZXNzYWdlfWApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcclxuICAgICAgICAgICAgICAgIG5ldyB0cmFuc3BvcnRzLkNvbnNvbGUoKVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyh0aGlzLmFkZFRhc2tOYW1lKHRoaXMuYWRkQ29ycmVsYXRpb25JZChtZXNzYWdlKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvck1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5hZGRUYXNrTmFtZSh0aGlzLmFkZENvcnJlbGF0aW9uSWQobWVzc2FnZSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3I8VCBleHRlbmRzIHN0cmluZz4oZXJyb3I6IEVycm9yQmFzZTxUPik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3IubWVzc2FnZX1gO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMuYWRkVGFza05hbWUodGhpcy5hZGRDb3JyZWxhdGlvbklkKG1lc3NhZ2UpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlYnVnKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKHRoaXMuYWRkVGFza05hbWUodGhpcy5hZGRDb3JyZWxhdGlvbklkKG1lc3NhZ2UpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdhcm4obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmFkZFRhc2tOYW1lKHRoaXMuYWRkQ29ycmVsYXRpb25JZChtZXNzYWdlKSkpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIHNldENvcnJlbGF0aW9uSWQoY29ycmVsYXRpb25JZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29ycmVsYXRpb25JZCA9IGNvcnJlbGF0aW9uSWQgfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGFza05hbWUodGFza05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFza05hbWUgPSB0YXNrTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZENvcnJlbGF0aW9uSWQobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb3JyZWxhdGlvbklkID8gYFske3RoaXMuY29ycmVsYXRpb25JZH1dICR7bWVzc2FnZX1gIDogbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFRhc2tOYW1lKG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza05hbWUgPyBgWyR7dGhpcy50YXNrTmFtZX1dICR7bWVzc2FnZX1gIDogbWVzc2FnZTtcclxuICAgIH1cclxufSJdfQ==