import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const getAllContacts = async () => {
  try {
    if (!PATH_DB) {
      throw new Error('Path to the database file is not defined');
    }
    const data = await fs.readFile(PATH_DB, 'utf8');
    if (!data) {
      throw new Error('File is empty');
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

console.log(await getAllContacts());
