import * as express from "express"
import * as bodyParser from "body-parser"
import {SaveOrCreateSettings, ReadSettings} from "../shared/Settings"

const settingsRouter = express.Router();

settingsRouter.use(bodyParser.json());

settingsRouter.route("/settings")
    .get(async (req, res) => {
        try{
            const settings = await ReadSettings();
            res.send(settings ? settings : {});
        }
        catch{
            res.sendStatus(500);
        }
    })
    .post(async (req, res) => {
        try{
            await SaveOrCreateSettings(req.body);
            res.sendStatus(200);
        }
        catch{
            res.sendStatus(500);
        }
    })

export default settingsRouter;