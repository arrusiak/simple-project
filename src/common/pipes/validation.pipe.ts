import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe as SuperValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe
  extends SuperValidationPipe
  implements PipeTransform<any>
{
  async transform(val: any, arg: ArgumentMetadata) {
    try {
      return await super.transform(val, arg);
    } catch (err) {
      if (err.errors?.length > 0) {
        throw new BadRequestException(
          err.errors.map((e) => {
            const arrError = e.children?.reduce((acc, child) => {
              acc[child.property] = child.children.reduce((acc1, ch) => {
                acc1[ch.property] = ch.constraints;
                return acc1;
              }, {});
              return acc;
            }, {});
            const errObj = {
              ...e,
              target: undefined,
              children: undefined,
            };
            e.children.length && (errObj.constraints = arrError);
            return errObj;
          }),
        );
      }
      throw err;
    }
  }
}
