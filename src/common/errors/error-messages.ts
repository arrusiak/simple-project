import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './error-message.interface';

export const errorMessages: { [messageCode: string]: IErrorMessages } = {
  'user:create:missingInformation': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new user with missing information.',
    userMessage: 'Unable to create a new user with missing information.',
  },
  'user:create:missingEmail': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new user without email.',
    userMessage: 'Unable to create a new user without email.',
  },
  'user:create:missingPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new user without password.',
    userMessage: 'Unable to create a new user without password.',
  },
  'user:create:emailAlreadyExist': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new user with this email.',
    userMessage: 'Unable to create a new user with this email.',
  },
  'user:show:missingId': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to find the user caused by missing information.',
    userMessage: 'Unable to find the user caused by missing information.',
  },
  'user:update:missingInformation': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update the user caused by missing information.',
    userMessage: 'Unable to update the user caused by missing information.',
  },
  'user:update:missingId': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update the user caused by missing information.',
    userMessage: 'Unable to update the user caused by missing information.',
  },
  'user:delete:missingId': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to delete the user caused by missing information.',
    userMessage: 'Unable to delete the user caused by missing information.',
  },
  'auth:userNotFound': {
    type: 'notFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'Unable to found the user with the provided information.',
    userMessage: 'Unable to found the user with the provided information.',
  },
  'auth:userAccountIsSuspended': {
    type: 'notFound',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'User account is suspended',
    userMessage: 'User account is suspended',
  },
  'auth:userNotActive': {
    type: 'notFound',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'User account is not active',
    userMessage: 'User account is not active',
  },
  'auth:logout:notLoggedIn': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'The user not logged in',
    userMessage: 'The user not logged in',
  },
  'request:unauthorized': {
    type: 'unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Access unauthorized.',
    userMessage: 'Access unauthorized.',
  },
  'auth:login:missingEmail': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to connect the user without email.',
    userMessage: 'Unable to connect the user without email.',
  },
  'auth:login:missingPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to connect the user without password.',
    userMessage: 'Unable to connect the user without password.',
  },
  'auth:mobile:expired': {
    type: 'NOT_ACCEPTABLE',
    httpStatus: HttpStatus.NOT_ACCEPTABLE,
    errorMessage: 'Expired Mobile Verification Code.',
    userMessage: 'Expired Mobile Verification Code.',
  },
  'auth:mobile:timeIn': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Mobile request timeIn.',
    userMessage: 'You can not send new SMS now.',
  },
  'auth:email:expired': {
    type: 'NOT_ACCEPTABLE',
    httpStatus: HttpStatus.NOT_ACCEPTABLE,
    errorMessage: 'The Verification Email Has Expired.',
    userMessage: 'The Verification Email Has Expired.',
  },
  'auth:email:verified': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'This email account already verified',
    userMessage: 'This email account already verified.',
  },
  'auth:mobile:verified': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'The user has verified phone number.',
    userMessage: 'The user has verified phone number.',
  },
  'auth:mobile:invalid': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'The verification code is invalid.',
    userMessage: 'The verification code is invalid.',
  },
};
