import { IRetourAppelCreationClientDTO } from '../services/interfaces/customer';
import * as automapper from 'automapper-ts';

export class CustomerInfoModel {
    public RegistrationNumber: string;
    public Country: string;
    public Catalog: string;
    public Url: string;
    public SubcriptionCustomer: ISubscritptionCustomerModel;
    public FourStarCardNumber: string;
    public CreationDateFourStarCardNumber: string;
    public PossessionFourStarCardNumber: boolean;
    public BirthDate: string;
    public EmailAdress: string;
    public Cellphone: string;
    public Phone: string;
    public DeliveryOffice: string;
    public AdressCustomer: IAdressCustomerModel;
    public NameSupplement: string;
    public Name: string;
    public Firstname: string;
    public Civility: string;
    public ConnexionClient: IConnectionCustomerModel;
    public Language: string;
    public Email: string;

    constructor(registrationNumber: string, country: string, catalog: string, url: string, subcriptionCustomer: ISubscritptionCustomerModel, fourStarCardNumber: string, creationDateFourStarCardNumber: string, possessionFourStarCardNumber: boolean, birthDate: string, emailAdress: string, cellphone: string, phone: string, deliveryOffice: string, adressCustomer: IAdressCustomerModel, nameSupplement: string, name: string, firstname: string, civility: string, connexionClient: IConnectionCustomerModel, language: string, email: string) {

        this.RegistrationNumber = registrationNumber;
        this.Country = country;
        this.Catalog = catalog;
        this.Url = url;
        this.SubcriptionCustomer = subcriptionCustomer;
        this.FourStarCardNumber = fourStarCardNumber;
        this.CreationDateFourStarCardNumber = creationDateFourStarCardNumber;
        this.PossessionFourStarCardNumber = possessionFourStarCardNumber;
        this.BirthDate = birthDate;
        this.EmailAdress = emailAdress;
        this.Cellphone = cellphone;
        this.Phone = phone;
        this.DeliveryOffice = deliveryOffice;
        this.AdressCustomer = adressCustomer;
        this.NameSupplement = nameSupplement;
        this.Name = name;
        this.Firstname = firstname;
        this.Civility = civility;
        this.ConnexionClient = connexionClient;
        this.Language = language;
        this.Email = email;

    }

    public static Map<T>(sourceKey: string, objectToMap: T): CustomerInfoModel {
        automapper.createMap(sourceKey, this.name)
            .forMember('Civility', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.Civilite'))
            .forMember('Firstname', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.Prenom'))
            .forMember('Name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.Nom'))
            .forMember('EmailAdress', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.AdresseEmail'))
            .forMember('BirthDate', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.DateDeNaissance'))
            .forMember('Cellphone', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.TelephonePortable'))
            .forMember('Phone', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.TelephoneFixe'))
            .forMember('AdressCustomer.PostalCode', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.CodePostal'))
            .forMember('AdressCustomer.Location', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.LieuDit'))
            .forMember('AdressCustomer.City', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.Ville'))
            .forMember('AdressCustomer.TrackNumber', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.NumeroVoie'))
            .forMember('AdressCustomer.LabelTrack', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.LibelleVoie'))
            .forMember('AdressCustomer.TypeShortTrack', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.TypeVoieAbrege'))
            .forMember('AdressCustomer.TypeTrack', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.TypeVoie'))
            .forMember('AdressCustomer.TrackNumeroSupplement', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.ComplementNumeroVoie'))
            .forMember('AdressCustomer.AdditionalAdress', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.ComplementAdresse'))
            .forMember('ConnexionClient.Password', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('InfosClients.ConnexionClient.MotDePasse'))

        return automapper.map(sourceKey, this.name, objectToMap);
    }

    public static MergeResulstCreate(objSource: CustomerInfoModel, objResult: IRetourAppelCreationClientDTO): CustomerInfoModel {
        objSource.ConnexionClient.CustomerId = objResult.NumeroClient;
        objSource.ConnexionClient.PersonNumber = objResult.NumeroPersonne;
        objSource.SubcriptionCustomer.SubscriptionId = objResult.IdentifiantAbonnement;
        objSource.ConnexionClient.CustomerNumber = objResult.IdentifiantClient;
        return objSource;
    }
}

export interface IAdressCustomerModel {
    PostalCode: string;
    Location: string;
    City: string;
    LabelTrack: string;
    TypeShortTrack: string;
    TypeTrack: string;
    TrackNumeroSupplement: string;
    TrackNumber: string;
    AdditionalAdress: string;
}

export interface ISubscritptionCustomerModel {

    DateRegistrationSmsPartner: string;
    OptInSmsPartenaire: boolean;
    SmsRejectionType: string;
    DateUnsubscribeSms: string;
    DateRegistrationSms: string;
    OptInSms: boolean;
    PartnerRejectionType: string;
    DateUnsubscribeSmsPartner: string;
    DateUnsubscribePartner: string;
    OptInPartner: boolean;
    RejectionType: string;
    UnsubscribeDate: string;
    SubcriptionDate: string;
    OptIn: boolean;
    ContactId: number;
    SubscriptionId: number;
    DateSubscriptionPartner: string;
    TypeRejectionPartnerSms: string;
}

export interface IConnectionCustomerModel {
    CustomerNumber: number;
    PersonNumber: number;
    CustomerId: number;
    Password: string;
    Url: string;
    Catalog: string;
    Country: string;
    RegistrationNumber: number;
    Language: string;
    Email: string;
}