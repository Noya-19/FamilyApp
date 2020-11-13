module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'user',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASS || 'JG3eYPrG48iXFZmkgkwx',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'fmdb.c2rkrk7n1dly.us-east-2.rds.amazonaws.com',
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}