'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { dayjsExt } from '@/lib/dayjs-extend';

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
  const [diffResult, setDiffResult] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  useEffect(() => {
    const dayjsStartDate = dayjsExt(startDate);
    const dayjsEndDate = endDate ? dayjsExt(endDate) : dayjsExt();

    const endDateFormatted = dayjsEndDate.isSame(dayjsExt(), 'month')
      ? "Aujourd'hui"
      : formatDate(dayjsEndDate);
    setFormattedEndDate(endDateFormatted);

    const diff = dayjsExt.duration(dayjsEndDate.diff(dayjsStartDate));
    let diffYears = diff.years();
    // Add one month to compensate dayjs's duration strange calculation
    let diffMonths = diff.months() + 1;

    if (diffMonths === 12) {
      diffYears++;
      diffMonths = 0;
    }

    const result = [
      diffYears > 0 ? `${diffYears} an${diffYears >= 2 ? 's' : ''}` : '',
      diffMonths > 0 ? `${diffMonths} mois` : '',
    ]
      .filter(Boolean)
      .join(' et ');

    setDiffResult(result);
  }, [startDate, endDate]);

  const formattedStartDate = formatDate(dayjsExt(startDate));

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
