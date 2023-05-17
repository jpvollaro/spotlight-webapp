import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightTextPipe } from '@app/common/pipe/highight-text/highlight-text.pipe';
import { TransformCamelCasePipe } from '@app/common/pipe/transform-camel-case/transform-camel-case.pipe';

@NgModule({
  declarations: [HighlightTextPipe, TransformCamelCasePipe],
  imports: [CommonModule],
  exports: [HighlightTextPipe, TransformCamelCasePipe]
})
export class PipeModule {}
