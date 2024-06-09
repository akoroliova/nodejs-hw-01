import fs from 'node:fs/promises';
import { faker } from '@faker-js/faker';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

export const generateContacts = async (number) => {
  // за допомогою функції createFakeContact створюємо передану кількість згенерованих контактів
  const newContacts = await Promise.resolve(
    faker.helpers.multiple(createFakeContact, {
      count: number,
    }),
  );
  // перевірка, чи існує файл і він пустий
  try {
    const fileContent = await fs.readFile(PATH_DB, 'utf8');
    if (fileContent.trim() === '[]') {
      // якщо файл пустий, записуємо нові контакти
      await fs.writeFile(PATH_DB, JSON.stringify(newContacts), 'utf8');
      console.log('Дані успішно записані у пустий файл.');
    } else {
      // якщо файл не пустий, додаємо нові контакти
      await fs.appendFile(PATH_DB, JSON.stringify(newContacts), 'utf8');
      console.log('Дані успішно додані у файл.');
    }
  } catch (err) {
    console.error('Помилка читання або запису файлу:', err);
  }
};
