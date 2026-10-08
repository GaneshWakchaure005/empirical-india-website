// Shared helper types for centralized content.
// Data modules use `as const`, so their exact types are inferred automatically.

export type ValueOf<T> = T[keyof T];
export type ArrayItem<T extends readonly unknown[]> = T[number];
