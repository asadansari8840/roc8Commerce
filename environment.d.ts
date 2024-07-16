declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DATABASE_URL: string;
            ACCESS_TOKEN_JWT_SECRET: string;
            REFRESH_TOKEN_JWT_SECRET: string;
            COOKIE_EXPIRE: string;
            JWT_REFRESH_TOKEN_EXPIRE: string;
            JWT_ACCESS_TOKEN_EXPIRE: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
