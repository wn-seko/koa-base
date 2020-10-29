import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { handler } from "./handler";
import { routers } from "./routes";

const app = new Koa();

// error handling
app.use(handler());

// CORS
app.use(cors());

// parser
app.use(bodyParser());

// routers
routers(app);

app.listen(3000);
