"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestPerformersPipeline = void 0;
exports.BestPerformersPipeline = {
    // Aggregation pipeline to find best performers
    // Criteria:
    // 1. All periods positive (6m, 3m, 1m)
    // 2. 6m change > 1m change (long-term positive trend)
    // 3. 1m change > 6m/6 (accelerating faster than average)
    // 4. 1m change > 3m/3 (recent acceleration strong)
    getBestPerformersPipeline(limit = 10) {
        return [
            {
                $match: {
                    '6m.ChangePercent': { $gt: 0 },
                    '3m.ChangePercent': { $gt: 0 },
                    '1m.ChangePercent': { $gt: 0 }
                }
            },
            {
                $addFields: {
                    sixMonthAvg: { $divide: ['$6m.ChangePercent', 6] },
                    threeMonthAvg: { $divide: ['$3m.ChangePercent', 3] }
                }
            },
            {
                $match: {
                    $expr: {
                        $and: [
                            { $gt: ['$6m.ChangePercent', '$1m.ChangePercent'] },
                            { $gt: ['$1m.ChangePercent', '$sixMonthAvg'] },
                            { $gt: ['$1m.ChangePercent', '$threeMonthAvg'] }
                        ]
                    }
                }
            },
            {
                $sort: {
                    '6m.R2': -1
                }
            },
            {
                $limit: limit
            }
        ];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVzdC1wZXJmb3JtZXJzLnBpcGVsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc29mdHdhcmUvbGFtYmRhL2xzZS1iZXN0LXBlcmZvcm1lcnMvc3JjL3BpcGVsaW5lcy9iZXN0LXBlcmZvcm1lcnMucGlwZWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxzQkFBc0IsR0FBRztJQUNsQywrQ0FBK0M7SUFDL0MsWUFBWTtJQUNaLHVDQUF1QztJQUN2QyxzREFBc0Q7SUFDdEQseURBQXlEO0lBQ3pELG1EQUFtRDtJQUNuRCx5QkFBeUIsQ0FBQyxRQUFnQixFQUFFO1FBQ3hDLE9BQU87WUFDSDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0osa0JBQWtCLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO29CQUM5QixrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7b0JBQzlCLGtCQUFrQixFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtpQkFDakM7YUFDSjtZQUNEO2dCQUNJLFVBQVUsRUFBRTtvQkFDUixXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDbEQsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLEVBQUU7aUJBQ3ZEO2FBQ0o7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFO3dCQUNILElBQUksRUFBRTs0QkFDRixFQUFFLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLEVBQUU7NEJBQ25ELEVBQUUsR0FBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLEVBQUU7NEJBQzlDLEVBQUUsR0FBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTt5QkFDbkQ7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLEtBQUssRUFBRTtvQkFDSCxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUNkO2FBQ0o7WUFDRDtnQkFDSSxNQUFNLEVBQUUsS0FBSzthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0ssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBCZXN0UGVyZm9ybWVyc1BpcGVsaW5lID0ge1xyXG4gICAgLy8gQWdncmVnYXRpb24gcGlwZWxpbmUgdG8gZmluZCBiZXN0IHBlcmZvcm1lcnNcclxuICAgIC8vIENyaXRlcmlhOlxyXG4gICAgLy8gMS4gQWxsIHBlcmlvZHMgcG9zaXRpdmUgKDZtLCAzbSwgMW0pXHJcbiAgICAvLyAyLiA2bSBjaGFuZ2UgPiAxbSBjaGFuZ2UgKGxvbmctdGVybSBwb3NpdGl2ZSB0cmVuZClcclxuICAgIC8vIDMuIDFtIGNoYW5nZSA+IDZtLzYgKGFjY2VsZXJhdGluZyBmYXN0ZXIgdGhhbiBhdmVyYWdlKVxyXG4gICAgLy8gNC4gMW0gY2hhbmdlID4gM20vMyAocmVjZW50IGFjY2VsZXJhdGlvbiBzdHJvbmcpXHJcbiAgICBnZXRCZXN0UGVyZm9ybWVyc1BpcGVsaW5lKGxpbWl0OiBudW1iZXIgPSAxMCk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkbWF0Y2g6IHtcclxuICAgICAgICAgICAgICAgICAgICAnNm0uQ2hhbmdlUGVyY2VudCc6IHsgJGd0OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJzNtLkNoYW5nZVBlcmNlbnQnOiB7ICRndDogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICcxbS5DaGFuZ2VQZXJjZW50JzogeyAkZ3Q6IDAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkYWRkRmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l4TW9udGhBdmc6IHsgJGRpdmlkZTogWyckNm0uQ2hhbmdlUGVyY2VudCcsIDZdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyZWVNb250aEF2ZzogeyAkZGl2aWRlOiBbJyQzbS5DaGFuZ2VQZXJjZW50JywgM10gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkbWF0Y2g6IHtcclxuICAgICAgICAgICAgICAgICAgICAkZXhwcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYW5kOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ICRndDogWyckNm0uQ2hhbmdlUGVyY2VudCcsICckMW0uQ2hhbmdlUGVyY2VudCddIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ICRndDogWyckMW0uQ2hhbmdlUGVyY2VudCcsICckc2l4TW9udGhBdmcnXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyAkZ3Q6IFsnJDFtLkNoYW5nZVBlcmNlbnQnLCAnJHRocmVlTW9udGhBdmcnXSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRzb3J0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJzZtLlIyJzogLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJGxpbWl0OiBsaW1pdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufSBhcyBjb25zdDtcclxuIl19