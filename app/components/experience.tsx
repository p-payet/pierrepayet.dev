import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import 'dayjs/locale/en';
import duration from 'dayjs/plugin/duration';
import { getTranslations } from 'next-intl/server';

dayjs.extend(duration);

// Data type for experience records (without locale)
export interface ExperienceData {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  logo: string;
}

// Component props include locale for translations
export interface ExperienceProps extends ExperienceData {
  locale: string;
}

const formatDate = (date: dayjs.Dayjs) =>
  date.format('MMMM YYYY').charAt(0).toUpperCase() +
  date.format('MMMM YYYY').slice(1);

export async function Experience({
  company,
  role,
  startDate,
  endDate,
  logo,
  locale,
}: ExperienceProps) {
  const t = await getTranslations('dates');

  // Set dayjs locale based on current locale
  const dayjsLocale = locale === 'fr' ? 'fr' : 'en';

  const dayjsStartDate = dayjs(startDate).locale(dayjsLocale);
  const dayjsEndDate = endDate
    ? dayjs(endDate).locale(dayjsLocale)
    : dayjs().locale(dayjsLocale);

  const formattedStartDate = formatDate(dayjsStartDate);
  const formattedEndDate = dayjsEndDate.isSame(dayjs(), 'month')
    ? t('today')
    : formatDate(dayjsEndDate);

  const diff = dayjs.duration(dayjsEndDate.diff(dayjsStartDate));
  let diffYears = diff.years();
  // Add one month to compensate dayjs's duration strange calculation
  let diffMonths = diff.months() + 1;

  if (diffMonths === 12) {
    diffYears++;
    diffMonths = 0;
  }

  const diffResult = [
    diffYears > 0
      ? t(diffYears >= 2 ? 'years' : 'year', { count: diffYears })
      : '',
    diffMonths > 0
      ? t(diffMonths >= 2 ? 'months' : 'month', { count: diffMonths })
      : '',
  ]
    .filter(Boolean)
    .join(` ${t('and')} `);

  return (
    <div className="flex gap-4 py-6" key={company}>
      <Image
        width={56}
        height={56}
        src={logo}
        alt={`${company} logo`}
        className="w-14 h-14 rounded-xl"
        loading="lazy"
      />
      <div className="flex flex-col col-span-9">
        <span className="text-slate-800 text-xl font-semibold">{company}</span>
        <span className="text-slate-700 text-lg">{role}</span>
        <span className="block mt-4 text-slate-500 col-span-2 text-sm font-medium tracking-tighter font-mono">
          {formattedStartDate} → {formattedEndDate} - {diffResult}
        </span>
      </div>
    </div>
  );
}
