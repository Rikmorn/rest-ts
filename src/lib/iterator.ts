export function* iterator(max: number, min = 0): IterableIterator<number> {
  if (min >= max) {
    return;
  }

  while (min < max) {
    yield min;
    min++;
  }
}
