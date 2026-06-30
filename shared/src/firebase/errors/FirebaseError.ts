export class FirebaseError extends Error {
  public readonly code: string;
  public readonly module: string;

  constructor(message: string, code: string, module: string = 'core') {
    super(message);
    this.name = 'FirebaseError';
    this.code = code;
    this.module = module;

    // Maintain V8 stack trace context
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FirebaseError);
    }
  }
}
