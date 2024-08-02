import { PageHeader } from '@/app/components/page-header';
import { Title } from '@/app/components/title';
import Link from 'next/link';

const contact: {
  method: string;
  link: string;
  label: string;
}[] = [
  {
    method: 'Email',
    link: 'mailto:pierre.payet@outlook.com',
    label: 'pierre.payet@outlook.com',
  },
  {
    method: 'Malt',
    link: 'https://www.malt.fr/profile/pierrepayet',
    label: 'pierrepayet',
  },
  {
    method: 'GitHub',
    link: 'https://github.com/p-payet',
    label: 'git/p-payet',
  },
  {
    method: 'LinkedIn',
    link: 'https://www.linkedin.com/in/pierre-payet-457476136',
    label: 'in/pierre-payet-457476136',
  },
];
export default async function InfoPage() {
  return (
    <main className="px-4 md:px-0">
      <PageHeader title="Contact" />
      <section className="pb-8">
        <p className="text-lg mb-4">
          Vous pouvez me joindre en utilisant l&apos;un de ces moyens de
          contact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contact.map((contactMethod) => {
            return (
              <div className="flex flex-col" key={contactMethod.method}>
                <Title as="h2" variant="tertiary">
                  {contactMethod.method}
                </Title>
                <Link
                  href={contactMethod.link}
                  target="_blank"
                  className="text-slate-700"
                >
                  {contactMethod.label}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
