// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Made<T> = { [P in keyof T]: jest.Mock<any, any> | any }
