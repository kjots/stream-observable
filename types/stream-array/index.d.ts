declare module 'stream-array' {
  import ReadableStream = NodeJS.ReadableStream;

  function streamArray(array: Array<any>): ReadableStream;

  export = streamArray;
}
