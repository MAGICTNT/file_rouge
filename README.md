# Projet de Gestion de Recettes

Ce projet est une application web de gestion de recettes, développée en Angular pour la partie front-end. Le but est de permettre aux utilisateurs de consulter des recettes et aux administrateurs d'ajouter, modifier, ou supprimer des recettes via une interface intuitive.

## Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Organisation et Structure du Code](#organisation-et-structure-du-code)
- [Utilisation des Services](#utilisation-des-services)
- [Formulaires et Validation](#formulaires-et-validation)
- [Recherche et Filtrage](#recherche-et-filtrage)
- [Fonctionnalités Page d'Accueil](#fonctionnalités-page-accueil)
- [Icônes](#icônes)
- [Responsive Design et Accessibilité](#responsive-design-et-accessibilité)
- [Gestion des Erreurs](#gestion-des-erreurs)
- [Performance et Optimisations](#performance-et-optimisations)
- [Contribution](#contribution)

## Fonctionnalités

- **Gestion des recettes** : Ajouter, modifier, et supprimer des recettes via une interface administrateur.
- **Affichage des recettes** : Consulter la liste des recettes disponibles.
- **Recherche et filtrage** : Rechercher des recettes par mots-clés pour une navigation simplifiée.
- **Formulaire dynamique** : Ajouter des ingrédients et des étapes à chaque recette grâce à un formulaire dynamique.
- **Fonctionnalité Réfrigérateur** : Ajouter, modifier, et retirer des ingrédients dans un réfrigérateur virtuel pour suivre les ingrédients disponibles et leurs quantités.

## Installation

Pour installer les dépendances et tester le projet, utilisez les commandes suivantes :
**npm install**

## Organisation et Structure du Code

Côté Angular, nous avons structuré le projet en plusieurs composants et services pour faciliter la gestion et l'évolution de l'application. Par exemple, un composant AdminComponent pour la gestion des recettes, et un composant RecipesComponent pour l'affichage des recettes aux utilisateurs. Chaque composant est autonome et utilise des services pour communiquer avec l'API backend.

## Utilisation des Services

Nous avons implémenté un service Angular, RecipeService, qui centralise les appels à l'API. Ce service gère les requêtes pour récupérer, ajouter, mettre à jour, et supprimer des recettes. Cela permet de simplifier le code des composants et de faciliter la maintenance de l'application.

## Formulaires et Validation

Nous aons utilisé ReactiveForms pour gérer le formulaire d'ajout de recettes dans le composant AdminComponent, ce qui permet de configurer facilement les champs, d'ajouter des validations, et de gérer dynamiquement des sous-sections du formulaire, comme les ingrédients et les étapes d'instructions. Cela rend le formulaire flexible et adaptable aux besoins de l'utilisateur.

## Recherche et Filtrage

Dans le composant RecipesComponent, on a ajouté une fonctionnalité de recherche pour permettre aux utilisateurs de trouver rapidement des recettes en fonction de mots-clés.

## Fonctionnalités Page Accueil

La page d'accueil met en avant deux sections de recettes pour attirer l'attention des utilisateurs :

- **Recettes les plus vues** : Cette section affiche les recettes les plus populaires, permettant aux utilisateurs de découvrir les recettes les plus consultées.
- **Dernières recettes ajoutées** : Cette section présente les dernières recettes ajoutées, offrant aux utilisateurs un aperçu des nouveautés et les encourageant à explorer de nouvelles idées.

Ces sections permettent de dynamiser l'expérience utilisateur en offrant du contenu pertinent dès l'arrivée sur le site.

## Icônes

Ce projet utilise des icônes personnalisées générées avec IcoMoon, intégrées sous forme de fichier de polices. Cette méthode permet d'éviter l'utilisation d'images pour les icônes, ce qui rend l'application plus légère et améliore les performances.

## Responsive Design et Accessibilité

Le site a été conçu pour être **entièrement responsive**, garantissant une expérience utilisateur optimale sur tous types d'écrans, y compris mobiles, tablettes et ordinateurs de bureau. Un menu burger est mis en place pour une navigation sur smartphone.

## Gestion des Erreurs

Pour garantir une bonne expérience utilisateur, on a mis en place un système de gestion des erreurs. Par exemple, si une requête échoue, un message d'erreur s'affiche pour informer l'utilisateur du problème. Cela améliore la fiabilité de l'application et aide à identifier rapidement les erreurs de connexion avec l'API.

## Performance et Optimisations

D'après **Google Lighthouse**, notre application obtient d'excellents scores dans plusieurs domaines clés :

- **Bonnes pratiques** : 96%
- **SEO** : 92%
- **Accessibilité** : 92%

[Lighthouse Score](https://raw.githubusercontent.com/MAGICTNT/file_rouge/main/lighthouse.png)

Les images ont été soigneusement optimisées, chacune ne dépassant pas **120 Ko**, pour une meilleure vitesse de chargement. 

Cependant, la **performance globale est de 55%**, principalement en raison des charges liées aux frameworks utilisés dans le projet.

Ces résultats témoignent de l'effort apporté par notre équipe pour rendre le site performant, optimisé, et accessible aux utilisateurs. Un projet fait par amour par des fans passionnés.

## Contribution

Les personnes ayant contribué au développement de ce projet sont :

- **Haiou King** - [GitHub](https://github.com/mangaluxe)
- **Tibault Garcia** - [GitHub](https://github.com/Mysthaqua)
- **Guilaume** - [GitHub](https://github.com/sun7code)
- **Maxime** - [GitHub](https://github.com/MAGICTNT)

---

**Note :** Ce frontend est conçu pour être utilisé en tandem avec le backend Angular disponible [ici](https://github.com/MAGICTNT/back_project).