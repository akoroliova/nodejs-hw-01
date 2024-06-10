import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const thanos = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    if (!data) {
      throw new Error('File is empty');
    }
    const contacts = JSON.parse(data);
    if (!Array.isArray(contacts)) {
      throw new Error('Invalid data format');
    }

    const updatedContacts = contacts.filter(() => {
      const shouldDelete = Math.random() >= 0.5;
      return !shouldDelete;
    });

    await fs.writeFile(
      PATH_DB,
      JSON.stringify(updatedContacts, null, 2),
      'utf8',
    );
  } catch (error) {
    console.error('Error removing contacts with probability:', error);
  }
};

await thanos();
