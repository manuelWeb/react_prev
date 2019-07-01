import IErreurDTO from '../../services/interfaces/erreurDTO';

export default interface IRetourAppelDTO {
  erreur: boolean,
  codeRetour: boolean,
  texteErreur: boolean,
  ErreurDTO: IErreurDTO,
  texteRetour: string,
  ErreursBloquantes: string[],
  ErreursInfos: string[],
  CommandeCree: boolean,
  Commandevalidee: boolean
}