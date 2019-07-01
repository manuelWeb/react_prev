import { accountService } from './accountService';
import ErrorObject from '../constants/common/errorObject';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';
const accountTestNoAllData: CustomerInfoModel = {

  Civilite: '',
  Prenom: '',
  Nom: 'TEST',
  ComplementAdresse: '',
  NumeroVoie: '',
  ComplementNumeroVoie: '',
  TypeVoie: '',
  LibelleVoie: '',
  Ville: '',
  CodePostal: '',
  BureauDistributeur: '',
  TelephoneFixe: '',
  TelephonePortable: '',
  AdresseEmail: '',
  DateDeNaissance: '',
  Email: '',
  AbonnementsClient: {
    OptIn: true,
    OptInPartenaire: false,
    OptInSms: false
  },
  ConnexionClient: {
    Password: '',
    Email: ''
  }
}
const accountTestAllData: CustomerInfoModel = {

  Civilite: 'MR',
  Prenom: 'TEST',
  Nom: 'TEST',
  ComplementAdresse: '',
  NumeroVoie: '16',
  ComplementNumeroVoie: '',
  TypeVoie: 'AVENUE',
  LibelleVoie: 'INDUSTRIELLE',
  Ville: 'Lille',
  CodePostal: '59000',
  BureauDistributeur: 'Lille',
  TelephoneFixe: '',
  TelephonePortable: '0600000000',
  AdresseEmail: 'tata@g.FR',
  DateDeNaissance: '',
  Email: 'titi@titi.fr',
  AbonnementsClient: {
    OptIn: true,
    OptInPartenaire: false,
    OptInSms: false
  },
  ConnexionClient: {
    Password: '123123',
    Email: 'tata@tata.fr'
  }
}

describe('Create Account Tests', () => {
  describe('Test call web api', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('call to the web api and return error 500', () => {
      const fetchSpy = jest.spyOn(accountService, 'createAccount')
        .mockImplementation(() => Promise.reject({
          ok: false,
          status: 500
        }));
      const promise = accountService.createAccount({} as CustomerInfoModel);
      promise.catch((r: Response) => {
        expect(r.ok).toBeFalsy();
        expect(r.status).toEqual(404);
      })
      expect(fetchSpy.mock.calls.length).toEqual(1);
      expect(fetchSpy).toHaveBeenCalledWith({} as CustomerInfoModel);
    })

    it('call to the web api and return error 404', () => {
      const fetchSpy = jest.spyOn(accountService, 'createAccount')
        .mockImplementation(() => Promise.reject({
          ok: false,
          status: 404
        }));
      const promise = accountService.createAccount({} as CustomerInfoModel);
      promise.catch((r: Response) => {
        expect(r.ok).toBeFalsy();
        expect(r.status).toEqual(404);
      })
      expect(fetchSpy.mock.calls.length).toEqual(1);
      expect(fetchSpy).toHaveBeenCalledWith({} as CustomerInfoModel);
    })
  })
});
