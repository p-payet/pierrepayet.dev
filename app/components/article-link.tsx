import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Title } from '@/app/components/title';

interface Props {
  title: string;
  date: string;
  summary: string;
  href: string;
  locale: string;
}

export async function ArticleLink({
  title,
  date,
  summary,
  href,
  locale,
}: Props) {
  const t = await getTranslations('dates');
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US';
  const dateFormatter = new Intl.DateTimeFormat(dateLocale, {
    dateStyle: 'medium',
  });
  const formattedDate = dateFormatter.format(new Date(date));

  return (
    <Link href={href} className="flex flex-col gap-4 py-8 first:pt-0">
      <div className="flex flex-col">
        <Title as="h2" variant="secondary">
          {title}
        </Title>
        <span className="text-slate-500 text-sm tracking-tight font-mono block mt-2">
          {t('publishedOn')}{' '}
          <time dateTime={date}>{formattedDate}</time>
        </span>

        <p className="mt-2 text-slate-700 text-base">{summary}</p>
      </div>
    </Link>
  );
}
