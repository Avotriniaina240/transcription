export class MakeService {
  constructor(
    apiUrl = 'https://eu2.make.com/api/v2',
    organizationId = '2318613',
    apiToken = '1797298d-0810-4779-b56e-119133461c72'
  ) {
    this.apiUrl = apiUrl;
    this.organizationId = organizationId;
    this.apiToken = apiToken;
  }

  async importBlueprint(file) {
    try {
      const formData = new FormData();
      formData.append('blueprint', file);

      // Ajout des headers appropriés
      const headers = new Headers({
        'Authorization': `Token ${this.apiToken}`,
        // Ne pas définir Content-Type pour FormData
        'Accept': 'application/json',
        'X-Organization-Id': this.organizationId
      });

      const response = await fetch(
        `${this.apiUrl}/organizations/${this.organizationId}/blueprints/import`,
        {
          method: 'POST',
          headers: headers,
          body: formData,
          // Ajout des options de requête importantes
          credentials: 'include',
          mode: 'cors',
          timeout: 30000 // 30 secondes de timeout
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur détaillée:', error);
      
      // Gestion spécifique des erreurs
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré après 30 secondes');
      }
      if (error.message.includes('502')) {
        throw new Error('Erreur de connexion avec Make.com - Veuillez réessayer dans quelques minutes');
      }
      
      throw new Error(`Échec de l'importation: ${error.message}`);
    }
  }

  // Méthode pour vérifier la validité du token
  async verifyToken() {
    try {
      const response = await fetch(`${this.apiUrl}/organizations/${this.organizationId}`, {
        headers: {
          'Authorization': `Token ${this.apiToken}`,
          'Accept': 'application/json'
        }
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}