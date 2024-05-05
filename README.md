
# Plateforme de Gestion Scolaire
```bash
API: https://lambtech-node.vercel.app
```
Cette plateforme de gestion scolaire vise à simplifier et à automatiser les processus administratifs et pédagogiques des établissements scolaires au Sénégal. Elle offre une solution complète pour la gestion des emplois du temps, des inscriptions, des évaluations, de la communication avec les parents, et bien plus encore.

## Fonctionnalités Principales
- **Gestion des Emplois du Temps :** Création et gestion des emplois du temps pour les enseignants et les classes.
- **Système d'Inscription en Ligne :** Inscription des élèves et des enseignants via une interface en ligne sécurisée.
- **Gestion des Notes et des Évaluations :** Suivi des notes, des évaluations et génération des bulletins de notes.
- **Gestion des Absences :** Enregistrement et suivi des absences et des retards des élèves.
- **Communication avec les Parents :** Envoi de notifications et de rapports aux parents via une application mobile.
- **Tableau de Bord Administratif :** Interface pour les directeurs d'école afin de surveiller et gérer l'ensemble des activités.

## Architecture du Projet
````
.
├── app.js
├── controllers
│   ├── api
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── errorController.js
│   │   ├── evaluationController.js
│   │   ├── formationController.js
│   │   ├── matiereController.js
│   │   ├── niveauController.js
│   │   ├── parentController.js
│   │   ├── pointageController.js
│   │   ├── presenceStudentController.js
│   │   ├── presenceTeacherController.js
│   │   ├── smsController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   └── uniteEnseignementController.js
│   └── socket
│       ├── location.controller.js
│       └── socket.controller.js
├── middlewares
│   ├── auth.middleware.js
│   ├── device.middleware.js
│   ├── jwt.middleware.js
│   └── socket.middleware.js
├── models
│   ├── Admin.js
│   ├── Evaluation.js
│   ├── Formation.js
│   ├── Matiere.js
│   ├── Niveau.js
│   ├── Parent.js
│   ├── Pointage.js
│   ├── PresenceStudent.js
│   ├── PresenceTeacher.js
│   ├── Sms.js
│   ├── Student.js
│   ├── Teacher.js
│   ├── UniteEnseignement.js
│   └── User.js
├── routes
│   ├── admin.routes.js
│   ├── app.routes.js
│   ├── auth.routes.js
│   ├── evaluation.routes.js
│   ├── formation.routes.js
│   ├── index.routes.js
│   ├── matiere.routes.js
│   ├── niveau.routes.js
│   ├── parent.routes.js
│   ├── pointage.routes.js
│   ├── presenceStudent.routes.js
│   ├── presenceTeacher.routes.js
│   ├── sms.routes.js
│   ├── student.routes.js
│   ├── teacher.routes.js
│   ├── ue.routes.js
│   └── user.routes.js
├── services
│   ├── api
│   │   ├── admin.service.js
│   │   ├── evaluation.service.js
│   │   ├── formation.service.js
│   │   ├── matiere.service.js
│   │   ├── niveau.service.js
│   │   ├── parent.service.js
│   │   ├── pointage.service.js
│   │   ├── smsService.js
│   │   ├── student.service.js
│   │   ├── teacher.service.js
│   │   └── uniteEnseignement.service.js
│   ├── auth
│   │   └── auth.service.js
│   └── socket
│       ├── index.service.js
│       ├── message.service.js
│       ├── notification.service.js
│       ├── tracking.service.js
│       └── user.service.js
├── utils
│   ├── apiFeatures.js
│   ├── common.utils.js
│   ├── constants.js
│   ├── exceptions.js
│   ├── integrety.utils.js
│   ├── mail.utils.js
│   ├── mail2.util.js
│   └── stringFormat.util.js
├── .env
└── README.md
````
### Routes
- **/auth :** Gestion de l'authentification et de l'inscription des utilisateurs.
- **/user :** Gestion des informations des utilisateurs (CRUD).
- **/teacher :** Gestion des enseignants (CRUD).
- **/student :** Gestion des élèves (CRUD).
- **/formation :** Gestion des formations (CRUD).
- **/ue :** Gestion des unités d'enseignement (CRUD).
- **/niveau :** Gestion des niveaux d'enseignement (CRUD).
- **/matiere :** Gestion des matières (CRUD).
- **/sms :** Envoi des SMS aux utilisateurs.
- **/evaluation :** Gestion des évaluations (CRUD).
- **/pointage :** Gestion du pointage des enseignants (CRUD).
- **/presenceStudent :** Gestion de la présence des élèves (CRUD).
- **/presenceTeacher :** Gestion de la présence des enseignants (CRUD).

### Contrôleurs
- **authController.js :** Contrôleur pour l'authentification et l'inscription des utilisateurs.
```javascript
// Exemple de méthode pour l'inscription d'un utilisateur
export const registerUser = async (req, res) => {
  try {
    // Logique d'inscription ici
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```


- **userController.js :** Contrôleur pour la gestion des informations des utilisateurs.
- **teacherController.js :** Contrôleur pour la gestion des enseignants.
- **studentController.js :** Contrôleur pour la gestion des élèves.
- **formationController.js :** Contrôleur pour la gestion des formations.
- **ueController.js :** Contrôleur pour la gestion des unités d'enseignement.
- **niveauController.js :** Contrôleur pour la gestion des niveaux d'enseignement.
- **matiereController.js :** Contrôleur pour la gestion des matières.
- **smsController.js :** Contrôleur pour l'envoi des SMS.
- **evaluationController.js :** Contrôleur pour la gestion des évaluations.
- **pointageController.js :** Contrôleur pour la gestion du pointage des enseignants.
- **presenceStudentController.js :** Contrôleur pour la gestion de la présence des élèves.
- **presenceTeacherController.js :** Contrôleur pour la gestion de la présence des enseignants.

### Services

- **authService.js :** Service pour l'authentification des utilisateurs.
```javascript
// Exemple de méthode pour l'authentification d'un utilisateur
export const authenticateUser = async (username, password) => {
  try {
    // Logique d'authentification ici
  } catch (error) {
    throw new Error(error.message);
  }
};
```


- **userService.js :** Service pour la gestion des informations des utilisateurs.

- **teacherService.js :** Service pour la gestion des enseignants.

- **studentService.js :** Service pour la gestion des élèves.

- **formationService.js :** Service pour la gestion des formations.

- **ueService.js :** Service pour la gestion des unités d'enseignement.

- **niveauService.js :** Service pour la gestion des niveaux d'enseignement.

- **matiereService.js :** Service pour la gestion des matières.

- **smsService.js :** Service pour l'envoi des SMS.

- **evaluationService.js :** Service pour la gestion des évaluations.

- **pointageService.js :** Service pour la gestion du pointage des enseignants.

- **presenceStudentService.js :** Service pour la gestion de la présence des élèves.

- **presenceTeacherService.js :** Service pour la gestion de la présence des enseignants.

### Modèles

- **User.js :** Modèle pour les utilisateurs.
  ```javascript
  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "teacher", "student"], required: true }
  });

  const User = mongoose.model("User", userSchema);
  export default User;
   ```

### Modèles

- **Teacher.js :** Modèle pour les enseignants.

- **Student.js :** Modèle pour les élèves.

- **Formation.js :** Modèle pour les formations.

- **UE.js :** Modèle pour les unités d'enseignement.

- **Niveau.js :** Modèle pour les niveaux d'enseignement.

- **Matiere.js :** Modèle pour les matières.

- **SMS.js :** Modèle pour les SMS.

- **Evaluation.js :** Modèle pour les évaluations.

- **Pointage.js :** Modèle pour le pointage des enseignants.

### Technologies Utilisées

- **Node.js** - Plateforme de développement côté serveur.

- **Express.js** - Framework web pour Node.js.

- **MongoDB** - Base de données NoSQL.

- **Mongoose** - ODM (Object Data Modeling) pour MongoDB.

- **Axios** - Client HTTP pour envoyer des requêtes.

### Installation

1. Cloner le repository :
   ```bash
   git clone git@github.com:MdialloC19/lambtech-node.git
   ```


2. Installer les dépendances :
   ```bash
   npm install
   ```
### Configuration des Variables d'Environnement

Créez un fichier nommé `.env` à la racine du projet et configurez les variables d'environnement nécessaires. Voici un exemple de contenu pour le fichier `.env` :

```plaintext
PORT=3000
MONGODB_URI=mongodb://localhost:27017/votre_base_de_donnees
INTECHSMS_API_KEY=votre_cle_api_intechsms
SENDER=votre_nom_expéditeur
```
3.Pour lancer l'application, utilisez la commande suivante :

```bash
npm start
```
L'application sera alors exécutée grâce à nodemon, ce qui permettra de redémarrer automatiquement le serveur à chaque modification des fichiers sources.
