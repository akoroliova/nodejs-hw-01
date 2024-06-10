import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const removeAllContacts = async () => {
  try {
    await fs.writeFile(PATH_DB, '[]', 'utf8');
  } catch (error) {
    throw new Error(error);
  }
};

await removeAllContacts();
