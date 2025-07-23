import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';

dayjs.extend(relativeTime);
dayjs.locale('fr');

export const formatCreatedDate = (dateStr) => {
    const date = dayjs(dateStr);
    const formatted = date.format('D/MM/YYYY');

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatUpdatedDate = (dateStr) => {
    const newDate = dayjs(dateStr).fromNow();

    return newDate.charAt(0).toUpperCase() + newDate.slice(1);
}

