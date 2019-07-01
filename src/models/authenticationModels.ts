import * as Automapper from 'automapper-ts';

export class TokenDataModel {

    public AccessToken: string;
    public TokenType: string;
    public ExpiresIn: number;
    public RefreshToken?: string;
    public Consumer: string;
    public NumeroClient?: string;
    public Civilite?: string;
    public Prenom?: string;
    public Nom?: string;
    public AdresseEmail?: string;
    public CodePostal?: string;
    public Pays?: string;
    public OptIn?: boolean;
    public '.issued': Date;
    public '.expires': Date;

    constructor(accessToken: string, tokenType: string, expiresIn: number, consumer: string, prenom: string, nom: string, adresseEmail: string, codePostal: string, pays: string, optin: boolean, numeroClient: string, civilite: string, refreshToken: string, issued: Date, expires: Date) {
        this.AccessToken = accessToken;
        this.TokenType = tokenType
        this.ExpiresIn = expiresIn;
        this.Consumer = consumer;
        this.Civilite = civilite;
        this.NumeroClient = numeroClient;
        this.Prenom = prenom;
        this.Nom = nom;
        this.AdresseEmail = adresseEmail;
        this.CodePostal = codePostal;
        this.Pays = pays;
        this.OptIn = optin;
        this.RefreshToken = refreshToken;
        this['.issued'] = issued;
        this['.expires'] = expires;
    }

    public static Map<T>(sourceKey: string, objectToMap: T): TokenDataModel {
        Automapper.createMap(sourceKey, this.name)
            .forMember('AccessToken', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('access_token'))
            .forMember('TokenType', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('token_type'))
            .forMember('ExpiresIn', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('expires_in'))
            .forMember('RefreshToken', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('refresh_token'))
            .forMember('Consumer', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('consumer'))
        return Automapper.map(sourceKey, this.name, objectToMap);
    }
}

export interface ILoginCredentialsModel {
    email: string;
    password: string;
}