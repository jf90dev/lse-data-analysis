export const BestPerformersPipeline = {
    // Aggregation pipeline to find best performers
    // Criteria:
    // 1. All periods positive (6m, 3m, 1m)
    // 2. 6m change > 1m change (long-term positive trend)
    // 3. 1m change > 6m/6 (accelerating faster than average)
    // 4. 1m change > 3m/3 (recent acceleration strong)
    getBestPerformersPipeline(limit?: number): any[] {

        return [
            {
                $match: {
                    'm1.ChangePercent': { $gt: 0 },
                    'm1.R2': { $gt: 0.75 },
                }
            },
            // {
            //     $addFields: {
            //         sixMonthAvg: { $divide: ['$6m.ChangePercent', 6] },
            //         threeMonthAvg: { $divide: ['$3m.ChangePercent', 3] }
            //     }
            // },
            // {
            //     $match: {
            //         $expr: {
            //             $and: [
            //                 { $gt: ['$6m.ChangePercent', '$1m.ChangePercent'] },
            //                 { $gt: ['$1m.ChangePercent', '$sixMonthAvg'] },
            //                 { $gt: ['$1m.ChangePercent', '$threeMonthAvg'] }
            //             ]
            //         }
            //     }
            // },
            // {
            //     $sort: {
            //         '6m.R2': -1
            //     }
            // }
        ];
    }
} as const;
