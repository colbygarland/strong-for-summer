import { child, get, ref, set, getDatabase } from 'firebase/database';
import { getCurrentDate } from '../../utils/date';
import { getUser } from '../../utils/user';

const db = getDatabase();
const today = getCurrentDate();

export const getActivity = async (name: string) => {
  const user = getUser();
  const snapshot = await get(child(ref(db), `/activities/${user}/${today}/${name}`));
  if (snapshot.exists()) {
    return Boolean(snapshot.val().completed);
  } else {
    return false;
  }
};

export const setActivity = async (name: string, completed: boolean) => {
  const user = getUser();
  set(ref(db, `/activities/${user}/${today}/${name}`), {
    completed,
  });
};
