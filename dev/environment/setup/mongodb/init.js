db = db.getSiblingDB('admin')

db.createUser({
    "user": "lse_user",
    "pwd": "lse_password",
    "roles": [
        { "role": "dbOwner", "db": "local" },
        { "role": "dbOwner", "db": "admin" },
        { "role": "dbOwner", "db": "config" },
        { "role": "dbOwner", "db": "lse" }
    ]
});

db = db.getSiblingDB('lse')

db.createUser({
    "user": "lse_user",
    "pwd": "lse_password",
    "roles": [
        { "role": "dbOwner", "db": "local" },
        { "role": "dbOwner", "db": "admin" },
        { "role": "dbOwner", "db": "config" },
        { "role": "dbOwner", "db": "lse" }
    ]
});

db.ftse100_constituents.insertMany([
    {
    "_id" : ObjectId("688f3bd1fd8c9e4c325ac319"),
    "symbol" : "PSON",
    "company_name" : "PEARSON PLC ORD 25P",
    "currency" : "GBX",
    "market_cap" : 6967.2,
    "price" : 1137.5,
    "price_change" : 65.0,
    "price_change_percentage" : 6.06,
    "_inserted_at" : ISODate("2025-08-03T10:37:05.584+0000")
},
{
    "_id" : ObjectId("688f3bd1fd8c9e4c325ac324"),
    "symbol" : "BA",
    "company_name" : "BAE SYSTEMS PLC ORD 2.5P",
    "currency" : "GBX",
    "market_cap" : 54319.87,
    "price" : 1816.5,
    "price_change" : 12.5,
    "price_change_percentage" : 0.69,
    "_inserted_at" : ISODate("2025-08-03T10:37:05.630+0000")
},
{
    "_id" : ObjectId("688f3bdefd8c9e4c325ac32f"),
    "symbol" : "BT-A",
    "company_name" : "BT GROUP PLC ORD 5P",
    "currency" : "GBX",
    "market_cap" : 20641.38,
    "price" : 207.2,
    "price_change" : 0.1,
    "price_change_percentage" : 0.05,
    "_inserted_at" : ISODate("2025-08-03T10:37:18.506+0000")
},
{
    "_id" : ObjectId("688f3be8fd8c9e4c325ac344"),
    "symbol" : "LAND",
    "company_name" : "LAND SECURITIES GROUP PLC ORD 10 2/3P",
    "currency" : "GBX",
    "market_cap" : 4302.05,
    "price" : 573.5,
    "price_change" : 4.0,
    "price_change_percentage" : 0.69,
    "_inserted_at" : ISODate("2025-08-03T10:37:28.464+0000")
},
{
    "_id" : ObjectId("688f3be8fd8c9e4c325ac346"),
    "symbol" : "STJ",
    "company_name" : "ST.JAMES'S PLACE PLC ORD 15P",
    "currency" : "GBX",
    "market_cap" : 6994.03,
    "price" : 1298.0,
    "price_change" : 10.5,
    "price_change_percentage" : 0.8,
    "_inserted_at" : ISODate("2025-08-03T10:37:28.470+0000")
}
]);