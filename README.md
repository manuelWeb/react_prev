# 1st RUN

- npm install
- npm start

# Documentation de développement

## Normes à respecter pour les messages de commit

Chaque message de commit doit-être préfixé par un des mot-clés qui suit afin d'indiquer rapidement en quoi il consiste :

- **feat**: ajout d'une nouvelle fonctionnalité pour l'utilisateur
- **fix**: Correction d'un bug pour l'utilisateur
- **docs**: changements dans la documentation
- **style**: formatage de code, oubli de point-virgules, etc.
- **refactor**: réorganisation de code (exemple : renommage de variables, découpages de fonctions, etc.)
- **test**: ajout ou réorganisation de tests, pas de changement dans le reste du code
- **chore**: modifications liées à l'environnement de l'application, pas de changement dans le reste du code (exemple : modification de scripts de SQL)

[Normes en version originale](http://karma-runner.github.io/3.0/dev/git-commit-msg.html)

## Architecture du code

Ci-dessous se trouve la documentation sur l'organisation du code:

- **action** : contient tous les créateurs d'action et les types d'action
- **app** : contient les fichiers globaux à l'application (le composant App, son store, etc.)
- **components** : contient les composants de "présentation" du site. Les composants sont contenus dans des sous-dossiers qui regroupe le fichier de composant avec un fichier de style et un fichier de test.
- **constants** : contient les fichiers d'interfaces, de constantes et d'énumérations.
- **containers** : contient les composants "containers" de l'application (exemple: les formulaires).
- **helpers** : contient les helpers nécessaires au fonctionnement du site.
- **images** : contient les images nécessaires au fonctionnement du site.
- **pages** : contient des composants qui assemblent des containers et qui représent une page du routing (exemples : Home, Login, Basket...)
- **reducers** : contient les reducers dont les composants ont besoin pour gérer leur état.
- **services** : contient des services utilitaires pour faire des appels ajax.
- **styles** : contient les fichiers de styles globaux pour l'apparence du site.

En cas de difficulté à faire la différence entre un composant de présentation et un container, consulter [ce post sur GitHub](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c).

## NPM or Yarn

- update "react-scripts": "~2.1.3" to 3.0.1
