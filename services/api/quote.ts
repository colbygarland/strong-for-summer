import { getDatabase, ref, push, get, child } from 'firebase/database';

const db = getDatabase();

export const setQuote = async (quote: string) => {
  push(ref(db, `/quotes/`), quote);
};

export const getQuotes = async () => {
  const snapshot = await get(child(ref(db), 'quotes'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};
