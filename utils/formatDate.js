import format from "date-fns/format";
import ru from "date-fns/locale/ru";

const formatDate = (date) => {
  return format(Date.parse(date), "dd MMMM yyyy, HH:mm:ss", {
    locale: ru,
  });
};

export default formatDate;
