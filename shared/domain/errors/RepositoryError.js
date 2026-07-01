"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.RepositoryError = void 0;
const DomainError_1 = require("./DomainError");
class RepositoryError extends DomainError_1.DomainError {
    constructor(message, details) {
        super(message, 'REPOSITORY_ERROR', details);
    }
}
exports.RepositoryError = RepositoryError;
class NotFoundError extends RepositoryError {
    constructor(entityName, id) {
        super(`${entityName} with id ${id} not found`, { entityName, id });
    }
}
exports.NotFoundError = NotFoundError;
