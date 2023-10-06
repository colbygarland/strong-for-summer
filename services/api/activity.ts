import { child, get, ref, set, getDatabase } from 'firebase/database';
import { getUser } from '../../utils/user';

export const ACTIVITIES = {
  '🏋️ 30 minute workout': {
    points: 20,
  },
  '💦 8 cups of water': {
    points: 10,
  },
  '🏃‍♂️ 10,000 steps': {
    points: 10,
  },
  '🥗 3 servings of fruit or vegetables': {
    points: 10,
  },
  '🧘 30 minute activity or class': {
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

export const getActivity = async (name: string, date: string) => {
  const user = getUser();
  const snapshot = await get(child(ref(db), `/activities/${user}/${date}/${name}`));
  if (snapshot.exists()) {
    return Boolean(snapshot.val().completed);
  } else {
    return false;
  }
};

export const getActivityDetailsByUser = async (user: string, date: string) => {
  const snapshot = await get(child(ref(db), `/activities/${user}/${date}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

export const setActivity = async (name: string, date: string, completed: boolean) => {
  const user = getUser();
  set(ref(db, `/activities/${user}/${date}/${name}`), {
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
