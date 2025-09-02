let googleScriptPromise = null;

function loadGoogleScript() {
  if (googleScriptPromise) return googleScriptPromise;
  googleScriptPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.accounts) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar Google Identity Services'));
    document.head.appendChild(script);
  });
  return googleScriptPromise;
}

export async function signInWithGoogle() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('Falta VITE_GOOGLE_CLIENT_ID en variables de entorno.');
  }

  await loadGoogleScript();

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid email profile',
        prompt: 'select_account',
        callback: async (response) => {
          try {
            if (!response || !response.access_token) {
              reject(new Error('No se recibió access_token'));
              return;
            }
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${response.access_token}` },
            });
            if (!res.ok) throw new Error('No se pudo obtener el perfil de Google');
            const profile = await res.json();
            try {
              localStorage.setItem('googleAccessToken', response.access_token);
              localStorage.setItem('googleUser', JSON.stringify(profile));
            } catch {}
            resolve({ accessToken: response.access_token, profile });
          } catch (err) {
            reject(err);
          }
        },
        error_callback: (err) => reject(err),
      });

      tokenClient.requestAccessToken();
    } catch (err) {
      reject(err);
    }
  });
}



