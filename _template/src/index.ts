

console.log('hello')

type SUM<T> = {
    (a: T, b: T): T
}

const sum = (a, b) => a + b;

export { sum }