import * as Automapper from 'automapper-ts';

/**
 * Classe contenant les infos nécessaires suite au retour de l'API pour demander un jeton de réinitialisation de mot de passe.
 */
export class ForgotPasswordModel {
  public isError: boolean;

  constructor(isError: boolean) {
    this.isError = isError
  }

  /**
   * Converti l'objet JSOn renvoyé par l'API en un modèle de données applicatif.
   * @param sourceKey
   * @param objectToMap
   */
  public static Map<T>(sourceKey: string, objectToMap: T): ForgotPasswordModel {
    Automapper.createMap(sourceKey, this.name)
      .forMember('isError', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('erreur'))
      .ignoreAllNonExisting();

    return Automapper.map(sourceKey, this.name, objectToMap);
  }
}