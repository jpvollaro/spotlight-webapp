import { HighlightTextPipe } from '@app/common/pipe/highight-text/highlight-text.pipe';

describe('HighlightTextPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightTextPipe();
    expect(pipe).toBeTruthy();
  });
});
