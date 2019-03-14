import streamToObservable from 'stream-to-observable';

import { Observable } from 'rxjs';

import ReadableStream = NodeJS.ReadableStream;

export function streamObservable<T>(stream: ReadableStream): Observable<T> {
  return streamToObservable(stream);
}
