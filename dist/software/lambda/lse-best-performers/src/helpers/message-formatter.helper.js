"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormatterHelper = void 0;
const tsyringe_1 = require("tsyringe");
let MessageFormatterHelper = class MessageFormatterHelper {
    formatBestPerformersMessage(performers) {
        if (performers.length === 0) {
            return 'No best performers found';
        }
        let message = '';
        for (const performer of performers) {
            message += `${performer.Symbol}\n`;
            message += `  1m: +${performer.Change1m.toFixed(2)}% (${performer.LinearRegression1m.toFixed(2)}) | `;
            message += `3m: +${performer.Change3m.toFixed(2)}% (${performer.LinearRegression3m.toFixed(2)}) | `;
            message += `6m: +${performer.Change6m.toFixed(2)}% (${performer.LinearRegression6m.toFixed(2)})\n\n`;
        }
        return message;
    }
};
exports.MessageFormatterHelper = MessageFormatterHelper;
exports.MessageFormatterHelper = MessageFormatterHelper = __decorate([
    (0, tsyringe_1.injectable)()
], MessageFormatterHelper);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1mb3JtYXR0ZXIuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc29mdHdhcmUvbGFtYmRhL2xzZS1iZXN0LXBlcmZvcm1lcnMvc3JjL2hlbHBlcnMvbWVzc2FnZS1mb3JtYXR0ZXIuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDQUFzQztBQUkvQixJQUFNLHNCQUFzQixHQUE1QixNQUFNLHNCQUFzQjtJQUMvQiwyQkFBMkIsQ0FBQyxVQUE0QjtRQUNwRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTywwQkFBMEIsQ0FBQztRQUN0QyxDQUFDO1FBRUQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ25DLE9BQU8sSUFBSSxVQUFVLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN0RyxPQUFPLElBQUksUUFBUSxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDcEcsT0FBTyxJQUFJLFFBQVEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3pHLENBQUM7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0osQ0FBQTtBQWhCWSx3REFBc0I7aUNBQXRCLHNCQUFzQjtJQURsQyxJQUFBLHFCQUFVLEdBQUU7R0FDQSxzQkFBc0IsQ0FnQmxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ3RzeXJpbmdlJztcclxuaW1wb3J0IHsgSUJlc3RQZXJmb3JtZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Jlc3QtcGVyZm9ybWVyLmludGVyZmFjZSc7XHJcblxyXG5AaW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRm9ybWF0dGVySGVscGVyIHtcclxuICAgIGZvcm1hdEJlc3RQZXJmb3JtZXJzTWVzc2FnZShwZXJmb3JtZXJzOiBJQmVzdFBlcmZvcm1lcltdKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAocGVyZm9ybWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICdObyBiZXN0IHBlcmZvcm1lcnMgZm91bmQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICBmb3IgKGNvbnN0IHBlcmZvcm1lciBvZiBwZXJmb3JtZXJzKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCR7cGVyZm9ybWVyLlN5bWJvbH1cXG5gO1xyXG4gICAgICAgICAgICBtZXNzYWdlICs9IGAgIDFtOiArJHtwZXJmb3JtZXIuQ2hhbmdlMW0udG9GaXhlZCgyKX0lICgke3BlcmZvcm1lci5MaW5lYXJSZWdyZXNzaW9uMW0udG9GaXhlZCgyKX0pIHwgYDtcclxuICAgICAgICAgICAgbWVzc2FnZSArPSBgM206ICske3BlcmZvcm1lci5DaGFuZ2UzbS50b0ZpeGVkKDIpfSUgKCR7cGVyZm9ybWVyLkxpbmVhclJlZ3Jlc3Npb24zbS50b0ZpeGVkKDIpfSkgfCBgO1xyXG4gICAgICAgICAgICBtZXNzYWdlICs9IGA2bTogKyR7cGVyZm9ybWVyLkNoYW5nZTZtLnRvRml4ZWQoMil9JSAoJHtwZXJmb3JtZXIuTGluZWFyUmVncmVzc2lvbjZtLnRvRml4ZWQoMil9KVxcblxcbmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxufVxyXG4iXX0=