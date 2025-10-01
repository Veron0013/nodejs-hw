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
