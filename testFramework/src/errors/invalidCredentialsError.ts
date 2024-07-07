export default class InvalidCredentialsError extends Error {
    
    public static MessagePattern : string;

    constructor(userEmail : string) {
        const messagePattern = `Given user: ${userEmail} does not exist in database, or given password is incorrect!`; 
        super(messagePattern);
        this.name = this.constructor.name;

        InvalidCredentialsError.MessagePattern = messagePattern;
    }
  }
  