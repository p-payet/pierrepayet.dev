import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
dayjs.locale('fr');

export interface ExperienceProps {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  logo: string;
}

const formatDate = (date: dayjs.Dayjs) =>
  date.format('MMMM YYYY').charAt(0).toUpperCase() +
  date.format('MMMM YYYY').slice(1);

export function Experience({
  company,
  role,
  startDate,
  endDate,
  logo,
}: ExperienceProps) {
  const dayjsStartDate = dayjs(startDate);
  const dayjsEndDate = endDate ? dayjs(endDate) : dayjs();

  const formattedStartDate = formatDate(dayjsStartDate);
  const formattedEndDate = dayjsEndDate.isSame(dayjs(), 'month')
    ? "Aujourd'hui"
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
    diffYears > 0 ? `${diffYears} an${diffYears >= 2 ? 's' : ''}` : '',
    diffMonths > 0 ? `${diffMonths} mois` : '',
  ]
    .filter(Boolean)
    .join(' et ');

  return (
    <div className="flex gap-4 py-6" key={company}>
      <Image
        width={56}
        height={56}
        src={logo}
        alt={`${company} logo`}
        className="w-14 h-14 rounded-xl"
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
