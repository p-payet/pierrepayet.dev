import Image from 'next/image';

interface Props {
  status?: 'available' | 'busy' | 'unavailable';
}

export function Avatar({ status }: Props) {
  return (
    <div className="flex gap-4 md:gap-0 mb-5">
      <div className="relative">
        <div className="ring-gray-400 ring-offset-base-100 w-28 md:w-36 rounded-full ring ring-offset-2">
          <Image
            className="w-28 h-28 md:w-36 md:h-36 rounded-full"
            src="/pierre-payet.jpg"
            alt="Pierre Payet"
            width={303}
            height={303}
          />
        </div>
        {status && (
          <span
            className={`bottom-0 left-[90px] md:left-28 absolute w-[22px] h-[22px] border-2 border-white dark:border-gray-800 rounded-full ${status === 'available'
              ? 'bg-green-400'
              : status === 'busy'
                ? 'bg-orange-400'
                : 'bg-red-400'
              }`}
          ></span>
        )}
      </div>
      {status && (
        <p className="block content-end font-light text-slate-500 text-sm">
          {status === 'available' && 'Disponible.'}
          {status === 'busy' && 'Ouvert à de nouvelles opportunités.'}
          {status === 'unavailable' && 'Non disponible.'}
        </p>
      )}
    </div>
  );
}
