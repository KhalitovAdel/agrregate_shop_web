export class ArrayUtils {
    static isLastIndex(data: unknown[] = [], currentIndex: number) {
        return data.length === currentIndex + 1;
    }
}
