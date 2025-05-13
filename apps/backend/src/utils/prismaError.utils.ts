export class UniqueConstraintError extends Error {
    field: string;

    constructor(field: string) {
        super(`A record with this ${field} already exists.`);
        this.name = "UniqueConstraintError";
        this.field = field;
    }
}