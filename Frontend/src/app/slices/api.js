export async function apiFetch(url, options = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Erreur réseau";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Pas de JSON, on garde l'erreur par défaut
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
