# Projet e-Bet

**Projet pour Andy Cinquin** – application de paris en ligne sur des équipes e-sport.  

## Sujet
Le projet consiste à permettre à des utilisateurs de parier sur des matchs e-sportifs, suivre leurs paris en cours, voir leurs gains et pertes, et gérer les matchs pour un administrateur. 

**L’application est disponible en ligne : [http://165.227.229.64:3000/](http://165.227.229.64:3000/)**

## Fonctionnalités réalisées
- Page de connexion / inscription pour les utilisateurs.  
- Dashboard utilisateur affichant les paris en cours et les résultats des paris terminés.  
- Page de profil avec informations utilisateur et gains totaux.  
- Page des matchs disponibles pour parier sur une équipe.  
- Gestion des paris (création, suivi, calcul des gains/pertes).  
- Middleware pour sécuriser les routes selon le rôle (admin ou utilisateur classique).  

## Compte administrateur
Un compte admin est disponible pour tester la gestion des matchs :  

- **Email** : admintest@gmail.com  
- **Mot de passe** : admintest  

## Technologies utilisées
- [Nuxt 3 / Vue 3](https://nuxt.com/)  
- [Tailwind CSS](https://tailwindcss.com/) pour le design  
- [Pinia](https://pinia.vuejs.org/) pour le state management  
- [Prisma](https://www.prisma.io/) pour la gestion de la base de données  
- [Axios](https://axios-http.com/) pour les appels API

## Difficultés rencontrées
- **Problème de VM Digital Ocean** avant la remise du projet, ce qui a nécessité de recommencer une partie du travail.  
- Sujet **assez restreint au niveau e-sport**, ce qui limitait les types de fonctionnalités à implémenter.  
- **Gestion des JWT et middleware** pour sécuriser les routes a demandé de l’ajustement pour permettre un accès correct aux utilisateurs et admins.  
- Adaptation de **Prisma** pour gérer les paris et calculer les gains/pertes automatiquement.  
- Problèmes ponctuels avec le **state management** et la synchronisation des stores entre les pages.  

## Axes d’amélioration
- **TailwindCSS** : certains styles ne s’appliquaient pas correctement, nécessitant une optimisation du design et de la structure des composants.  
- **WebSocket / temps réel** : permettre la mise à jour instantanée des cotes, des paris et des résultats sans recharger la page.  
- **Meilleure organisation des stores** avec Pinia pour centraliser les données et réduire les appels API.  
- **Protection avancée des pages** pour empêcher les utilisateurs non connectés ou non admin d’accéder à certaines routes.  
- **Amélioration du design** pour rendre l’interface plus attractive et ergonomique.  
- **Gestion de l’argent plus complète** : ajout d’un solde virtuel, vérification des fonds avant de parier, historique détaillé des gains et pertes.  
- **Optimisation backend** : endpoints plus robustes, meilleure gestion des erreurs et validations.  
- **Ajout de statistiques et graphiques** pour que les utilisateurs puissent suivre leurs performances.  
