"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoURI = exports.Host = exports.Secret = void 0;
const database = "db_survey";
const remoteHost = "cluster0.ap5xt.mongodb.net";
const LocalURI = `mongodb://localhost:27017/${database}`;
const RemoteURI = `mongodb+srv://admin:admin@${remoteHost}/${database}?retryWrites=true&w=majority`;
exports.Secret = "someSecret";
exports.Host = remoteHost;
exports.MongoURI = LocalURI;
//# sourceMappingURL=db.js.map