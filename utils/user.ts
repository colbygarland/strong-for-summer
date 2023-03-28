export const VERIFIED_NAMES = ['Bre', 'Colby', 'Danica', 'Harry', 'Robyn', 'Robyn '];

export function getUser(): string {
  const user = localStorage.getItem('user');
  return user || '';
}
