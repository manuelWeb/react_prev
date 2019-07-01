
import * as http from './httpStatusHelper';

describe('services', () => {
  describe('http', () => {
    describe('isResponseOk', () => {
      it('should return false on empty response', () => {
        expect(http.isResponseOk(null)).toBe(false);
      });

      it('should return false on non-OK response', () => {
        expect(http.isResponseOk(new Response({} as ReadableStream<Uint8Array>, { status: 401 }))).toBe(false);
      });

      it('should return true on OK response', () => {
        expect(http.isResponseOk(new Response({} as ReadableStream<Uint8Array>, { status: 200 }))).toBe(true);
      });
    });

    describe('isResponseUnauthorized', () => {
      it('should return false on empty response', () => {
        expect(http.isResponseUnauthorized(null)).toBe(false);
      });

      it('should return false on authorized response', () => {
        expect(http.isResponseUnauthorized(new Response({} as ReadableStream<Uint8Array>, { status: 200 }))).toBe(false);
      });

      it('should return true on unauthorized response', () => {
        expect(http.isResponseUnauthorized(new Response({} as ReadableStream<Uint8Array>, { status: 401 }))).toBe(true);
      });
    });
  });
});