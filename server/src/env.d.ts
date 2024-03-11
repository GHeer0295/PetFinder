type ConfigKeys =
    'DB_HOST' |
    'DB_USER' |
    'DB_PORT' |
    'DB_PASS' |
    'DB_DATABASE'

type Config = {
    [K in ConfigKeys]: string | undefined
}

declare namespace NodeJS {
    interface ProcessEnv extends Config {}
}
