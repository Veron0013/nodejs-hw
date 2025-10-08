npm init @eslint/config@latest
npm install express
npm install -D nodemon
npm install cors
npm install pino-http pino-pretty
npm install dotenv

У файлі package.json відсутнє необхідне поле "dev": "nodemon src/server.js". Перевірте, будь ласка, що ви додали повний запис "dev": "nodemon src/server.js" у відповідному форматі (з подвійними лапками).

dz2

Завдання вирішено неправильно (файл src/models/note.js)
У полях title та content відсутня опція trim: true.
Поле content не має значення за замовчуванням — порожній рядок.
Поле tag позначене як required: true, але воно має бути необов’язковим із значенням за замовчуванням 'Todo'.

Завдання вирішено неправильно (файл src/controllers/notesController.js)
Контролер deleteNote використовує res.status(200).send(deletedNote); замість res.status(200).json(deletedNote); для узгодженості з іншими відповідями.

dz3
Завдання вирішено неправильно (файл src/models/note.js)
Константа TAGS не імпортується з ../constants/tags.js із необхідним розширенням файлу; замість цього enum-значення жорстко зафіксовані у коді.
Включено опцію versionKey: false, яка не зазначена як обов'язкова.

Завдання вирішено неправильно (файл src/controllers/notesController.js)
Функція getAllNotes формує фільтр запиту як звичайний об'єкт і передає його у Mongoose методи, замість використання Mongoose chain-запитів, таких як .find().where().or(). Це не відповідає вимозі використання

Завдання вирішено неправильно (файл src/validations/notesValidation.js)
Поле search у getAllNotesSchema повинно дозволяти порожні рядки, але наразі встановлено лише мінімальну довжину 0. Щоб явно дозволити порожні рядки, слід використовувати .allow('').
Поле content як у createNoteSchema, так і у updateNoteSchema повинно явно дозволяти порожні рядки. Зараз використовується лише .min(0), що не дозволяє порожні рядки без явного додавання .allow('').

Завдання вирішено неправильно (файл src/routes/notesRoutes.js)
Схема для валідації noteId імпортується як noteIdSchema, але використовується як noteIdSchema у коді, тоді як у специфікації ця назва — noteIdSchema. Будь ласка, забезпечте послідовність назв для зрозумілості та підтримуваності.
