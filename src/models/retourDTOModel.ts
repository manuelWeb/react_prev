export class RetourDTOModel {

    constructor(error: boolean, returnCode: boolean, textError: string, textReturn: string, blockingErrors: string[], errorsInfos: string[], commandCreated: boolean, commandValidated: boolean) {
        this.Error = error;
        this.ReturnCode = returnCode;
        this.TextError = textError;
        this.BlockingErrors = blockingErrors;
        this.ErrorsInfos = errorsInfos;
        this.CommandCreated = commandCreated;
        this.CommandValidated = commandValidated;
        this.TextReturn = textReturn;
    }
    public Error: boolean;
    public ReturnCode: boolean;
    public TextError: string;
    public TextReturn: string;
    public BlockingErrors: string[];
    public ErrorsInfos: string[];
    public CommandCreated: boolean;
    public CommandValidated: boolean;
}