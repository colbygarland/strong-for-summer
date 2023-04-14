export const VERIFIED_NAMES = ['Bre', 'Colby', 'Danica', 'Harry', 'Harry ', 'Robyn', 'Robyn '];

export function getUser(): string {
  const user = localStorage.getItem('user');
  return user || '';
}
