import { TokenDataModel } from '../models/authenticationModels';
import loginActions from '../actions/authenticationActions';
import moment from 'moment';

// Vérifie le JWT token depuis le localStorage et le formatte en TokenDataModel
export function decodeJwt(): TokenDataModel | null {
    try {
        const storedToken = localStorage.getItem('AccessToken');
        if (storedToken !== null && storedToken !== undefined) {
            return JSON.parse(storedToken) as TokenDataModel;
        }
    }
    catch (ex) {
    }
    return null;
}

// return authorization header with jwt token 
// if anonymousToken = false => Check having a loggedIn token
export async function checkAuth(anonymousToken: boolean = true): Promise<string> {
    const storedToken: TokenDataModel | null = decodeJwt();

    let tokenStr: string = '';
    if (storedToken && isAuth(anonymousToken)) {
        if (isFreshToken()) {
            tokenStr = storedToken.AccessToken;
        }
        else {
            // Demande de refresh token JWT utilisateur
            const refresh: string | undefined = storedToken.RefreshToken;
            tokenStr = await loginActions.getFreshToken(refresh);
        }
    }
    else {
        // Demander un nouveu token anonyme
        tokenStr = await loginActions.getFreshToken();
    }
    return tokenStr;
}

// Vérifie la validité du token: si besoin d'un token non anonyme, il faut vérifier l'AdresseEmail et le RefreshToken
export function isAuth(anonymousToken: boolean = true): boolean {
    const token: TokenDataModel | null = decodeJwt();
    const isCredantialToken: boolean = !anonymousToken && token !== null && !!token.AdresseEmail && !!token.RefreshToken;
    return !!token && !!token.AccessToken && (isCredantialToken || anonymousToken);
}

export function isFreshToken(): boolean {
    const prevToken: TokenDataModel | null = decodeJwt();
    return !!prevToken && moment(prevToken['.expires']).utc().isAfter(new Date());
}

// Retourne l'entête de la request avec le token JWT requis pour les appels WAD [Authorize]
export default async function accessTokenHeader(anonymousToken: boolean = true): Promise<HeadersInit> {
    const accessToken: string = await checkAuth(anonymousToken);
    const header: HeadersInit = {
        'authorization': `Bearer ${accessToken}`
    }
    return header;
}