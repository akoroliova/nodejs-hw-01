import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const countContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    if (!data) {
      throw new Error('File is empty');
    }
    const contacts = JSON.parse(data);
    if (!Array.isArray(contacts)) {
      throw new Error('Invalid data format');
    }
    const count = contacts.length;
    return count;
  } catch (error) {
    console.error('Помилка читання файлу або парсингу даних:', error);
  }
};

console.log(await countContacts());
