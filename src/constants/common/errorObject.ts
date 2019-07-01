export default class ErrorObject extends Error {
   public status: string | number;
   public message: string;
   public name: string

   public constructor(status: string | number, message: string = '', name: string = '') {
      super(message);
      this.status = status;
      this.message = message;
      this.name = name;
   }

}