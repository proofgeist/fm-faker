import { checkUser } from "../../../api-services/auth0";
import methods from "../../../utils/middleware/methods";
import { getDataSetById, deleteById } from "../../../api-services/db/dataset";

export default checkUser(
  methods({
    GET: async (req, res) => {
      const id = req.query.id;
      const results = await getDataSetById(id);
      res.statusCode = 200;
      return res.json(results);
    },
    DELETE: async (req, res) => {
      const id = req.query.id;
      const results = await deleteById(id);
      res.statusCode = 200;
      return res.json(results);
    }
  })
);
