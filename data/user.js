import { db } from '@/lib/db'

export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id) => {
  if (id === undefined) {
    return null;
  }
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
}

export const getUserByUsername = async (username) => {
  if (username === undefined) {
    return null;
  }
  try {
    const user = await db.user.findUnique({ where: { username } });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}