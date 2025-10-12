export function debounceText(
  callback: (text: string) => void,
  delay: number = 300
): (text: string) => void {
  let timeoutId: number | undefined;

  return (text: string): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(text);
    }, delay);
  };
}