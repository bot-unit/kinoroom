export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Политика конфиденциальности</h1>
      <p className="mb-4">Мы уважаем вашу конфиденциальность и не собираем персональные данные без вашего согласия. На сайте используются аналитические cookie-файлы только для анонимной статистики посещений. Вы можете принять или отклонить сбор статистики через баннер согласия.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Что собирается?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Анонимная статистика посещений (Google Analytics)</li>
        <li>Cookie-файлы для хранения вашего согласия</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Как используется?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Для улучшения сайта и анализа посещаемости</li>
        <li>Данные не передаются третьим лицам</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Ваши права</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Вы можете отказаться от сбора статистики в любой момент</li>
        <li>Для этого используйте баннер согласия внизу страницы</li>
      </ul>
      <p className="mt-6 text-sm text-neutral-500">Если у вас есть вопросы, напишите нам: info@kinoroom.ru</p>
    </main>
  );
}
