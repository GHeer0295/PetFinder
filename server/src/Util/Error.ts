import { z } from "zod";
import { ResponseError } from "../Api/Common";

export const caseUnreachable = (): never => {
    throw new Error('Case unreachable.');
};

export const createValidationError = <T>(name: string, zodError?: z.SafeParseError<T>): ResponseError => {
    if(!zodError || zodError.error.issues.length === 0) return { error: name, issues: [] };
    
    const mapIssues = (issue: z.ZodIssue): string => {
        if(issue.path.length === 0) return issue.message;
        return `${issue.path.join('.')}: ${issue.message}`;
    };
    return {
        error: name,
        issues: zodError.error.issues.map(mapIssues)
    };
};

class ResultSuccess<T> {
    public readonly success = true;
    constructor(public readonly value: T) {}

    public map = <U>(f: (val: T) => U | Error): Result<U> => result(f(this.value));
}

class ResultError<T> {
    public readonly success = false;
    constructor(public readonly error: Error) {}

    public map = <U>(_: (val: T) => U | Error): Result<U> => result<U>(this.error);
}

/**
 * A result type that can be either a success or an error.
 */
export type Result<T> = ResultSuccess<Readonly<T>> | ResultError<Readonly<T>>;
/**
 * Creates a {@link Result} from a value or an error.
 */
export const result = <T>(value: T | Error): Result<T> => {
    if(value instanceof Error) return new ResultError(value);
    return new ResultSuccess(value);
}
