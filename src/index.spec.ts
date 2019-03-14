import 'mocha';

import streamArray from 'stream-array';
import util from 'util';

import { expect } from 'chai';

import { streamObservable } from '.';

const timeout = util.promisify(setTimeout);

context('@kjots/stream-observable', () => {
  describe('streamObservable()', () => {
    it('should create an observable from the provided readable object stream', async () => {
      // Given
      const testStream = streamArray([ 'Test Value 1', 'Test Value 2', 'Test Value 3' ]);

      // When
      const results: Array<string> = [];

      await streamObservable<string>(testStream)
        .subscribe(value => results.push(value));

      // Then
      expect(results).to.eql([ 'Test Value 1', 'Test Value 2', 'Test Value 3' ]);
    });

    context('when the provided stream emits an error', () => {
      it('should cause the returned observable to emit an error', async () => {
        // Given
        const testError = new Error('Test Error');
        const testStream = streamArray([]);

        // When
        let error;

        streamObservable(testStream)
          .subscribe({ error: e => error = e });

        testStream.emit('error', testError);

        await timeout(0);

        // Then
        expect(error).to.equal(testError);
      });
    });
  });
});
