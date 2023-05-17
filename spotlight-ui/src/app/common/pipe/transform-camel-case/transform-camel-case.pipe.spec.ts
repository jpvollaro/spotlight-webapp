import { TransformCamelCasePipe } from '@app/common/pipe/transform-camel-case/transform-camel-case.pipe';

describe('TransformCamelCasePipe', () => {
  it('create an instance', () => {
    const pipe = new TransformCamelCasePipe();
    expect(pipe).toBeTruthy();
  });
});
