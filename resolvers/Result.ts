import { ResultResolvers } from "./types"
import { parse, format } from "date-fns";

const resolvers: ResultResolvers = {
  date(parent, { format: dateFormat }) {
    if (!dateFormat) {
      return parent.date
    } else {
      return format(parse(parent.date, "yyyy-M-d", new Date()), dateFormat)
    }
  }
};

export default resolvers
