const login = async (username, password) => {
    try {
      const response = await fetch('login1.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(`✅ Authentification réussie pour ${username}`);
      } else {
        console.log(`❌ Échec d'authentification pour ${username}`);
      }
  
      console.log(`Réponse du serveur: ${result}`);
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };
  
  // Liste des couples username/password à tester
  const credentialsToTest = [
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
    { username: 'user4', password: 'password4' },
    { username: 'user5', password: 'password5' },
  ];
  
  // Tester chaque couple
  credentialsToTest.forEach(({ username, password }) => {
    login(username, password);
  });
  