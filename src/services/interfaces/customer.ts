import IRetourAppelDTO from './retourAppelDTO';
import { CustomerInfoModel } from '../../models/createUpdateCustomerModel';

export interface IRetourAppelCreationClientDTO extends IRetourAppelDTO {
    NumeroClient: number,
    NumeroPersonne: number,
    IdentifiantClient: number,
    IdentifiantAbonnement: number,
}

export class CustomerPersoInfo {
    public ConnexionClient: IConnexionClient;
    public AbonnementsClient: ICustomerSubscription;
    public Civilite: string;
    public Prenom: string;
    public Nom: string;
    public AdresseEmail: string;
    public DateNaissance: string;
    public TelephonePortable: string;
    public TelephoneFixe: string;
    public PossessionCarteQuatreEtoiles: boolean;
    public DateDeCreationCarteQuatreEtoiles: string;
    public NumeroCarteQuatreEtoiles: string;
    public NumeroVoie: string;
    public ComplementNumeroVoie: string;
    public LibelleVoie: string;
    public LieuDit: string;
    public BureauDistributeur: string;
    public ComplementAdresse: string;
    public CodePostal: string;
    public TypeVoie: string;
    public TypeVoieAbrege: string;

    constructor(connexionClient: IConnexionClient, abonnementsClient: ICustomerSubscription, civilite: string, prenom: string, nom: string, adresseEmail: string, dateNaissance: string, telephonePortable: string, telephoneFixe: string, possessionCarteQuatreEtoiles: boolean, dateDeCreationCarteQuatreEtoiles: string, numeroCarteQuatreEtoiles: string, numeroVoie: string, complementNumeroVoie: string, libelleVoie: string, lieuDit: string, bureauDistributeur: string, complementAdresse: string, codePostal: string, typeVoie: string, typeVoieAbrege: string) {
        this.ConnexionClient = connexionClient;
        this.AbonnementsClient = abonnementsClient;
        this.Civilite = civilite;
        this.Prenom = prenom;
        this.Nom = nom;
        this.AdresseEmail = adresseEmail;
        this.DateNaissance = dateNaissance;
        this.TelephoneFixe = telephoneFixe;
        this.TelephonePortable = telephonePortable;
        this.PossessionCarteQuatreEtoiles = possessionCarteQuatreEtoiles;
        this.DateDeCreationCarteQuatreEtoiles = dateDeCreationCarteQuatreEtoiles;
        this.NumeroCarteQuatreEtoiles = numeroCarteQuatreEtoiles;
        this.NumeroVoie = numeroVoie;
        this.ComplementNumeroVoie = complementNumeroVoie;
        this.LibelleVoie = libelleVoie;
        this.LieuDit = lieuDit;
        this.BureauDistributeur = bureauDistributeur;
        this.ComplementAdresse = complementAdresse;
        this.CodePostal = codePostal;
        this.TypeVoie = typeVoie;
        this.TypeVoieAbrege = typeVoieAbrege;
    }

    public static convertCustomerForBack(customerInfo: CustomerInfoModel): CustomerPersoInfo {
        return {
            Nom: customerInfo.Name,
            AbonnementsClient: {
                DateDesinscriptionSmsPartenaire: customerInfo.SubcriptionCustomer.DateUnsubscribeSmsPartner,
                OptInSmsPartenaire: customerInfo.SubcriptionCustomer.OptInSmsPartenaire,
                TypeRejetSms: customerInfo.SubcriptionCustomer.SmsRejectionType,
                DateDesinscription: customerInfo.SubcriptionCustomer.UnsubscribeDate,
                DateInscription: customerInfo.SubcriptionCustomer.SubcriptionDate,
                IdentifiantContact: customerInfo.SubcriptionCustomer.ContactId,
                OptIn: customerInfo.SubcriptionCustomer.OptIn,
                OptInPartenaire: customerInfo.SubcriptionCustomer.OptInPartner,
                OptInSms: customerInfo.SubcriptionCustomer.OptInSms,
                TypeRejet: customerInfo.SubcriptionCustomer.RejectionType,
                TypeRejetPartenaire: customerInfo.SubcriptionCustomer.PartnerRejectionType,
                TypeRejetSmsPartenaire: customerInfo.SubcriptionCustomer.TypeRejectionPartnerSms
            },
            AdresseEmail: customerInfo.EmailAdress,
            BureauDistributeur: customerInfo.DeliveryOffice,
            Civilite: customerInfo.Civility,
            CodePostal: customerInfo.AdressCustomer.PostalCode,
            ComplementAdresse: customerInfo.AdressCustomer.AdditionalAdress,
            ComplementNumeroVoie: customerInfo.AdressCustomer.TrackNumeroSupplement,
            DateDeCreationCarteQuatreEtoiles: customerInfo.CreationDateFourStarCardNumber,
            DateNaissance: customerInfo.BirthDate,
            LibelleVoie: customerInfo.AdressCustomer.LabelTrack,
            LieuDit: customerInfo.AdressCustomer.Location,
            NumeroCarteQuatreEtoiles: customerInfo.FourStarCardNumber,
            NumeroVoie: customerInfo.AdressCustomer.TrackNumber,
            PossessionCarteQuatreEtoiles: customerInfo.PossessionFourStarCardNumber,
            Prenom: customerInfo.Firstname,
            TelephoneFixe: customerInfo.Phone,
            TelephonePortable: customerInfo.Cellphone,
            TypeVoie: customerInfo.AdressCustomer.TypeTrack,
            TypeVoieAbrege: customerInfo.AdressCustomer.TypeShortTrack,
            ConnexionClient: {
                Catalogue: customerInfo.ConnexionClient.Catalog,
                Email: customerInfo.ConnexionClient.Email,
                IdentifiantClient: customerInfo.ConnexionClient.CustomerId,
                Langue: customerInfo.ConnexionClient.Language,
                Matricule: customerInfo.ConnexionClient.RegistrationNumber,
                MotDePasse: customerInfo.ConnexionClient.Password,
                NumeroClient: customerInfo.ConnexionClient.CustomerNumber,
                NumeroPersonne: customerInfo.ConnexionClient.PersonNumber,
                Pays: customerInfo.ConnexionClient.Country,
                Url: customerInfo.ConnexionClient.Url
            }
        }
    }
}

interface ICustomerSubscription {
    IdentifiantContact: number;
    OptIn: boolean;
    DateInscription: string;
    DateDesinscription: string;
    TypeRejet: string;
    OptInPartenaire: boolean;
    TypeRejetPartenaire: string;
    OptInSms: boolean;
    TypeRejetSms: string;
    OptInSmsPartenaire: boolean;
    DateDesinscriptionSmsPartenaire: string;
    TypeRejetSmsPartenaire: string;
}

interface IConnexionClient {
    NumeroClient: number;
    NumeroPersonne: number;
    IdentifiantClient: number;
    MotDePasse: string;
    Url: string;
    Catalogue: string;
    Pays: string;
    Matricule: number;
    Langue: string;
    Email: string;
}