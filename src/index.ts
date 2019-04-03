import { Writable } from 'stream';

import { Observable, Observer } from 'rxjs';

import ReadableStream = NodeJS.ReadableStream;

export function streamObservable<T>(stream: ReadableStream): Observable<T> {
  return new Observable((observer: Observer<T>) => {
    const observerWritable = new Writable({
      objectMode: true,

      write(chunk: any, encoding: string, callback: () => void) {
        observer.next(chunk);

        callback();
      },

      final(callback: () => void) {
        observer.complete();

        callback();
      }
    });

    stream
      .on('error', error => observer.error(error))
      .pipe(observerWritable);

    return () => stream.unpipe(observerWritable);
  });
}
