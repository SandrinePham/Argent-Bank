// src/utils/api.js

export async function apiFetch(url, options = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Essaye de récupérer un message d'erreur côté API
    let errorMessage = "Erreur réseau";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // fallback si pas de json dans la réponse
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
