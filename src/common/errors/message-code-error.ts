import { IErrorMessages } from './error-message.interface';
import { errorMessages } from './error-messages';
export class MessageCodeError extends Error {
  public messageCode: string;
  public httpStatus: number;
  public errorMessage: string;

  constructor(messageCode: string) {
    super();

    const errorMessageConfig = this._getMessageFromMessageCode(messageCode);
    if (!errorMessageConfig) {
      throw new Error('Unable to find message code error.');
    }

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.messageCode = messageCode;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.message = errorMessageConfig.userMessage;
  }

  /**
   * @description: Find the error config by the given message code.
   * @param {string} messageCode
   * @return {IErrorMessages}
   */
  private _getMessageFromMessageCode(messageCode: string): IErrorMessages {
    let errorMessageConfig: IErrorMessages | undefined;
    Object.keys(errorMessages).some((key) => {
      if (key === messageCode) {
        errorMessageConfig = errorMessages[key];
        return true;
      }
      return false;
    });

    if (!errorMessageConfig) {
      throw new Error('Unable to find the given message code error.');
    }
    return errorMessageConfig;
  }
}
