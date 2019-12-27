import { CountdownFormatPipe } from './countdown.pipe';

describe('CountdownPipe', () => {
  it('create an instance', () => {
    const pipe = new CountdownFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
