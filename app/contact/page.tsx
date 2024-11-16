import Link from 'next/link';
import contacts from '@/app/data/contacts';
import { PageHeader } from '@/app/components/page-header';
import { Title } from '@/app/components/title';

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
          {contacts.map((contact) => {
            return (
              <div className="flex flex-col" key={contact.method}>
                <Title as="h2" variant="tertiary">
                  {contact.method}
                </Title>
                <Link
                  href={contact.link}
                  target="_blank"
                  className="text-slate-700"
                >
                  {contact.label}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
