import { Request } from "express";
import { Result, result } from "./Error";

/**
 * Gets a configuration from process.env or exits the process.
 * @param key The key to look for in process.env
 * @returns The config value or throws an error
 */
export const getConfigOrThrow = (key: keyof typeof process.env): string => {
    const config = process.env[key];
    if(config) return config;

    console.error(`Error: Missing configuration for ${key} in process.env`);
    process.exit(1);
};

/**
 * Wrapper for try catch blocks that returns an error if one is thrown.
 * @param run The function to run
 * @returns The result of the function or an error
 */
export const tryRun = async <T>(run: (() => Promise<T>) | Promise<T>): Promise<Result<T>> => {
    try {
        return result(await (run instanceof Promise ? run : run()));
    } catch (err) {
        return result<T>(err instanceof Error ? err : new Error(String(err)));
    }
}

/**
 * Extracts the given keys from the request query.
 * @param req The request to extract from
 * @param keys The keys to extract
 * @returns An object with the keys and their values
 */
export const extractQueryByKeys = <TKeys extends string>(
    query: Request['query'],
    keys: TKeys[]
): Record<TKeys, string | string[]> => {
    return keys.reduce((search, field) => {
        const value = query[field];
        if(!value) return search;
        return { ...search, [field]: value };
    }, {} as Record<TKeys, string | string[]>);
};
