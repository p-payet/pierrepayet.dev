import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import duration from 'dayjs/plugin/duration';

const dayjsExt = dayjs;

dayjs.locale('fr');
dayjs.extend(duration);

export { dayjsExt };
