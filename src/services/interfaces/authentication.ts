export interface ITokenData {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    consumer: string;
    NumeroClient?: string;
    Civilite?: string;
    Prenom?: string;
    Nom?: string;
    AdresseEmail?: string;
    CodePostal?: string;
    Pays?: string;
    OptIn?: boolean;
    '.issued': string;
    '.expires': string;
}

export interface ICustomerData {
    erreur: boolean,
    codeRetour: boolean,
    CommandeCree: boolean,
    Commandevalidee: boolean,
    Fraudeur: boolean,
    Employe: boolean,
    EmailMultiple: boolean,
    ClientIdentifie: boolean,
    InfosClients: ICustomerPersoInfo,
    NbPointsCadeaux: number
}

interface ICustomerPersoInfo {
    ConnexionClient: {
        IdentifiantClient: number;
        NumeroPersonne: number;
        NumeroClient: string;
        MotDePasse: string;
    },
    AbonnementsClient: ICustomerSubscription,
    Civilite: string;
    Prenom: string;
    Nom: string;
    AdresseEmail: string;
    DateNaissance: string;
    TelephonePortable: string;
    TelephoneFixe: string;
    PossessionCarteQuatreEtoiles: boolean;
    DateDeCreationCarteQuatreEtoiles: boolean
    NumeroCarteQuatreEtoiles: string;
    NumeroVoie: string;
    ComplementNumeroVoie: string;
    LibelleVoie: string;
    LieuDit: string;
    BureauDistributeur: string;
    ComplementAdresse: string;
    CodePostal: string;
    TypeVoie: string;
    TypeVoieAbrege: string;

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
