import React from 'react';

interface FooterProps {
  lang: 'ru' | 'de' | 'en';
}

interface FooterBlock {
  title: string;
  paragraphs: React.ReactNode[];
}

export function Footer({ lang }: FooterProps) {
  const email = 'es.nalyotova@gmail.com';

  const footerData: Record<'ru' | 'de' | 'en', FooterBlock[]> = {
    de: [
      {
        title: 'Hinweis',
        paragraphs: [
          'Dieser Navigator ist ein privater, nicht-kommerzieller Prototyp zur besseren Orientierung von Familien bei der Nutzung des Landesfamilienpasses Baden-Württemberg. Er ist kein offizielles Angebot der Stadt/Gemeinde und ersetzt keine Beratung sowie keine rechtsverbindliche Entscheidung der zuständigen Stelle.',
          'Die Antragstellung, die Prüfung der Voraussetzungen und die Entscheidung über die Ausstellung des Landesfamilienpasses erfolgen ausschließlich durch die zuständige Stadt- oder Gemeindeverwaltung. Maßgeblich sind die jeweils aktuellen gesetzlichen und behördlichen Vorgaben. Angaben ohne Gewähr.',
        ],
      },
      {
        title: 'Datenschutz',
        paragraphs: [
          'Eingaben wie Notizen, markierte Besuche oder verwendete Coupons werden nur lokal im Browser des jeweiligen Geräts gespeichert und nicht an die Stadt/Gemeinde oder an eine externe Datenbank übermittelt.',
        ],
      },
      {
        title: 'Quellenstand',
        paragraphs: [
          'Juni 2026. Bitte Öffnungszeiten, Eintrittsbedingungen und Couponregelungen vor dem Besuch direkt beim jeweiligen Anbieter prüfen.',
        ],
      },
      {
        title: 'Kontakt',
        paragraphs: [
          <span key="de-contact">
            Für Hinweise, Korrekturen oder Verbesserungsvorschläge zum Prototyp können Sie mich gerne kontaktieren:{' '}
            <a
              href={`mailto:${email}`}
              className="text-natural-600 hover:text-natural-800 font-semibold underline decoration-dotted transition-colors"
            >
              {email}
            </a>
          </span>,
        ],
      },
    ],
    ru: [
      {
        title: 'Примечание',
        paragraphs: [
          'Этот навигатор является частным некоммерческим прототипом, созданным для удобной ориентации семей при использовании Landesfamilienpass Baden-Württemberg. Он не является официальным предложением города/общины и не заменяет консультацию или юридически обязательное решение компетентного органа.',
          'Подача заявления, проверка оснований и решение о выдаче Landesfamilienpass осуществляются исключительно компетентной городской или муниципальной администрацией. Решающими являются актуальные правовые и ведомственные правила. Информация предоставляется без гарантии.',
        ],
      },
      {
        title: 'Защита данных',
        paragraphs: [
          'введённые данные, такие как заметки, отмеченные посещения или использованные купоны, сохраняются только локально в браузере соответствующего устройства и не передаются в городскую/муниципальную администрацию или во внешнюю базу данных.',
        ],
      },
      {
        title: 'Актуальность источников',
        paragraphs: [
          'июнь 2026. Перед посещением просьба проверять часы работы, условия входа и правила использования купонов напрямую у соответствующего учреждения.',
        ],
      },
      {
        title: 'Контакт',
        paragraphs: [
          <span key="ru-contact">
            если у вас есть замечания, исправления или предложения по улучшению прототипа, вы можете связаться со мной:{' '}
            <a
              href={`mailto:${email}`}
              className="text-natural-600 hover:text-natural-800 font-semibold underline decoration-dotted transition-colors"
            >
              {email}
            </a>
          </span>,
        ],
      },
    ],
    en: [
      {
        title: 'Note',
        paragraphs: [
          'This navigator is a private, non-commercial prototype designed to help families better navigate the use of the Landesfamilienpass Baden-Württemberg. It is not an official service of any city or municipality and does not replace official advice or a legally binding decision by the competent authority.',
          'The application process, eligibility check and decision on issuing the Landesfamilienpass are carried out exclusively by the responsible city or municipal administration. The current legal and administrative regulations apply. Information is provided without guarantee.',
        ],
      },
      {
        title: 'Privacy',
        paragraphs: [
          'Entries such as notes, marked visits or used coupons are stored only locally in the browser of the respective device and are not transmitted to the city/municipality or to any external database.',
        ],
      },
      {
        title: 'Source status',
        paragraphs: [
          'June 2026. Please check opening hours, admission conditions and coupon rules directly with the respective provider before visiting.',
        ],
      },
      {
        title: 'Contact',
        paragraphs: [
          <span key="en-contact">
            If you have comments, corrections or suggestions for improving this prototype, feel free to contact me:{' '}
            <a
              href={`mailto:${email}`}
              className="text-natural-600 hover:text-natural-800 font-semibold underline decoration-dotted transition-colors"
            >
              {email}
            </a>
          </span>,
        ],
      },
    ],
  };

  const blocks = footerData[lang] || footerData.de;

  return (
    <footer id="app-disclaimer-footer" className="border-t border-natural-100 bg-natural-50/50 mt-12 py-10">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] leading-relaxed text-natural-500">
          {blocks.map((block, blockIndex) => (
            <div key={blockIndex} className="space-y-2">
              <h4 className="font-extrabold text-natural-700 uppercase tracking-wider text-[10px]">
                {block.title}
              </h4>
              {block.paragraphs.map((para, paraIndex) => (
                <p key={paraIndex} className="text-natural-500 font-medium">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-natural-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-natural-400">
          <span>
            © 2026 Familienpass BW Navigator. {lang === 'de' ? 'Privater Prototyp' : lang === 'ru' ? 'Частный прототип' : 'Private Prototype'}.
          </span>
          <span className="font-mono">
            {lang === 'de' ? 'Nicht offiziell' : lang === 'ru' ? 'Неофициально' : 'Unofficial'}
          </span>
        </div>
      </div>
    </footer>
  );
}
