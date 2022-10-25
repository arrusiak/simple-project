import { registerDecorator } from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';

export function IsE164PhoneNumber(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isE164PhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} is invalid,the phone must have the format +xxxxxxxxxxx`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const phoneNumber = parsePhoneNumberFromString(value || '');
          return phoneNumber?.isValid();
        },
      },
    });
  };
}
