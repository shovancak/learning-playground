declare namespace NodeJS {
  export interface ProcessEnv {
    API_URL: string

    DB_PORT: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    DB_URL: string

    NODE_ENV: string

    NEXT_PUBLIC_FIREBASE_API_KEY: string
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
    FIREBASE_PRIVATE_KEY: string
    FIREBASE_CLIENT_EMAIL: string

    AWS_REGION: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY_ID: string
    AWS_S3_API_VERSION: string
    AWS_S3_PRIVATE_BUCKET_NAME: string
  }
}
