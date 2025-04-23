import { useEffect, useState } from 'react';

function calcAnimationData(texts: string[]): [number, string[]] {
  const maxSymbols = texts.reduce((acc, title) => {
    return acc.length > title.length ? acc : title;
  }, '').length;

  const allSymbols = texts.reduce((acc, text) => {
    acc.push(...text);
    return acc;
  }, [] as string[]);

  return [maxSymbols, allSymbols];
}

function randomText(maxSymbols: number, allSymbols: string[]): string {
  const symbols = [...allSymbols];
  let output = '';

  let count = 0;
  while (symbols.length && count < maxSymbols) {
    const randomId = Math.floor(Math.random() * symbols.length);
    output += symbols[randomId];
    count++;
    symbols.splice(randomId, 1);
  }

  return output;
}

interface Options {
  texts: string[];
  duration?: number;
  laggingRatio?: number;
  laggingOffset?: number;
}

function startAnimation(options: Options, update: (text: string) => void): () => void {
  const { texts, duration = 3200, laggingRatio = 0.35, laggingOffset = 1 - laggingRatio } = options;
  const [maxSymbols, allSymbols] = calcAnimationData(texts);
  const speed = (1 / duration) / texts.length;
  let progress = 0;
  let lastUpdate = Date.now();

  const iterationFn = () => {
    const now = Date.now();
    const past = now - lastUpdate;
    lastUpdate = now;

    progress += past * speed;
    progress %= 1;

    const index = Math.floor(progress * texts.length);
    const indexProgress = progress * texts.length % 1;
    const isLagging = indexProgress >= laggingOffset && indexProgress <= laggingOffset + laggingRatio;

    const text = isLagging ? randomText(maxSymbols, allSymbols) : texts[index];
    update(text);
  }

  iterationFn();
  const intervalId = setInterval(iterationFn, 48);

  return () => clearInterval(intervalId);
}

function useLaggingText(options: Options): string {
  const [text, setText] = useState<string>(options.texts[0]);

  useEffect(() => {
    return startAnimation(options, setText);
  }, [options]);

  return text;
}

export default function LaggingText(props: Options) {
  const text = useLaggingText(props);
  return text;
}
