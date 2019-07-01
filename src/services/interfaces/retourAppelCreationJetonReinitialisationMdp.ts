import IRetourAppelDTO from '../../services/interfaces/retourAppelDTO';

export default interface IRetourAppelCreationJetonReinitialisationMdp extends IRetourAppelDTO {
  IdentifiantJeton: string,
  CiviliteClient: string,
  NomClient: string,
  EmailClient: string,
  ErrorMessage: string
}