import fs from 'node:fs/promises';
import { faker } from '@faker-js/faker';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

//прибрати виводи у консоль

export const addOneContact = async () => {
  const newContacts = await Promise.resolve(
    faker.helpers.multiple(createFakeContact, { count: 1 }),
  );
  try {
    const fileContent = await fs.readFile(PATH_DB, 'utf8');

    let contacts = [];
    if (fileContent.trim() !== '[]') {
      contacts = JSON.parse(fileContent);
    }
    contacts = contacts.concat(newContacts);

    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    throw new Error(error);
  }
};
await addOneContact();
