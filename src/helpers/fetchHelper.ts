import authHeader from '../helpers/accessTokenHeader';
import { requestMethod, headerContentType } from '../constants/common/requestProperties';

const apiUrl: string = 'http://localhost:5702';

/**
 * Ce helper d'effectuer un appel à l'API en vérifiant auparavant la présence d'un token JWT et le récupère si nécessaire.
 * @param apiAction Action de l'API à appeler (inclure les paramètres GET dans la chaîne si nécessaire).
 * @param anonymousToken Indique si on utilise un token JWT de type anonyme. false si l'action dans la WAD est [Authorize]  (default true)
 * @param method Méthode HTTP à utiliser (GET, POST...).
 * @param contentType Content-type utiliser pour appeler l'API.
 * @param bodyPayload Données envoyées dans le body de la requête convertis en string
 * @returns {Promise<Response>} Promesse avec le résultat de l'appel.
 */
function fetchHelper(apiAction: string, anonymousToken: boolean = true, method?: requestMethod, contentType?: headerContentType, bodyPayload?: string): Promise<Response> {
    let header: HeadersInit = {
        'Content-Type': contentType ? contentType : headerContentType.JSON
    }
    const requestInit: RequestInit = {
        method: method ? method : requestMethod.GET,
        headers: header,
        body: bodyPayload
    };
    return authHeader(anonymousToken)
        .then((authHeader: HeadersInit) => {
            header = { ...header, ...authHeader };
            requestInit.headers = header;
            return fetch(apiUrl + apiAction, requestInit);
        })
        .catch(() => { return fetch(apiUrl + apiAction, requestInit); })
}

export default fetchHelper;