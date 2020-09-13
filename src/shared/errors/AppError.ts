interface Message {
    pt_message: string;

    en_message: string;
}

class AppError {
    public readonly message: Message;

    public readonly statusCode: number;

    constructor(en_message: string, pt_message: string, statusCode = 400) {
        this.message = { en_message, pt_message };
        this.statusCode = statusCode;
    }
}

export default AppError;
