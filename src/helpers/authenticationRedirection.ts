import routes from '../routes';
import { History } from 'history';

/**
 * Redirection dynamique selon l'état de l'application
 * @param isAuthenticated Indique si l'utulisateur est authentifié
 * @param history Le browser history récupéré dans le App 
 * @returns redirige vers la page indiqué dans le fichier routes.ts / pour les route privée redirige vers Login
 */
export default function authenticationRedirection(isAuthenticated: boolean, history: History): void {
    // const findRoute = routes.filter(route => route.path === location.pathname);
    const findRoute = routes.filter(route => route.path === './');
    const route = findRoute.length > 0 ? findRoute[0] : null;

    if (route) {
        if (isAuthenticated === true && route.unauthenticatedOnly === true) {
            if (route.redirectTo !== undefined) {
                return history.push(route.redirectTo);
            }

            return history.push("/");
        } else if (isAuthenticated === false && route.private === true) {
            return history.push("/Login");
        }
    }
}
