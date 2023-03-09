import { child, get, ref, set, getDatabase } from 'firebase/database';
import { getCurrentDate } from '../../utils/date';
import { getUser } from '../../utils/user';

export const ACTIVITIES = {
  '🏋️ 45 minute workout': {
    points: 20,
  },
  '💦 8 cups of water': {
    points: 10,
  },
  '🏃‍♂️ 10,000 steps': {
    points: 10,
  },
  '🥗 3 servings of vegetables': {
    points: 10,
  },
  '🧘 Activity or class': {
    points: 10,
  },
  '💦 4 cups of water': {
    points: 5,
  },
  '🏃‍♂️ 7,000 steps': {
    points: 5,
  },
  '🧘 5 minutes of meditation': {
    points: 5,
  },
  '📖 Read 10 pages of a book': {
    points: 5,
  },
  '💤 Get 8 hours of sleep': {
    points: 5,
  },
  '💪 Hit your protein goal': {
    points: 5,
  },
  '🛏️ Make the bed': {
    points: 2,
  },
  '🍃 Go outside': {
    points: 1,
  },
};

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

export const getLeaderboard = async () => {
  const snapshot = await get(child(ref(db), 'activities'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};
