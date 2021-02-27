/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/resolvers.ts":
/*!**************************!*\
  !*** ./src/resolvers.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
const dbconfig = {
    host: "nmegx0z0tj4ho1.cxjpzndq5h93.us-west-1.rds.amazonaws.com",
    database: process.env.DB_NAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD
};
const client = __webpack_require__(/*! serverless-mysql */ "serverless-mysql")({
    config: dbconfig
});
const resetdb = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Resetting DB config: ", dbconfig);
    yield client.query(`
  CREATE TABLE IF NOT EXISTS shirts
  (
      id MEDIUMINT UNSIGNED not null AUTO_INCREMENT, 
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      design varchar(100) not null,
      small INT not null,
      medium INT not null,
      large INT not null,
      PRIMARY KEY (id)
  );  
  `);
    console.log("Clearing Table....");
    yield client.query('DELETE FROM shirts');
    console.log("Adding inital shirts");
    yield client.query('INSERT INTO shirts (design,small,medium,large) VALUES(?,?,?,?)', ["design1", 10, 5, 1]);
    yield client.query('INSERT INTO shirts (design,small,medium,large) VALUES(?,?,?,?)', ["design2", 3, 2, 5]);
    yield client.query('INSERT INTO shirts (design,small,medium,large) VALUES(?,?,?,?)', ["design3", 1, 3, 2]);
    yield client.end();
    return "Success";
});
const getAllShirts = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Gettting all Shirts");
    let shirts = [];
    const shirtResults = yield client.query(` select * from shirts`);
    for (const shirt of shirtResults) {
        const { id, design, small, medium, large } = shirt;
        console.log(`Shirt ID:${id} - ${design} : small QTY: ${small} | medium QTY: ${medium} | large QTY: ${large} `);
        shirts.push({ id, design, small, medium, large });
    }
    return shirts;
});
const purchaseShirt = (id, size, qty) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Purchasing Shirt:  id: ${id},size: ${size}, purchase qty:${qty}`);
    yield client.query(`UPDATE shirts SET ${size} = ${size} - ${qty} WHERE id = ${id} AND ${size}-${qty}>= 0; `);
    const shirtUpdateResult = yield client.query(`SELECT * from shirts WHERE id = ${id}; `);
    console.log("shirtUpdateResult: ", shirtUpdateResult);
    const results = {
        "id": shirtUpdateResult[0].id,
        "design": shirtUpdateResult[0].design,
        "small": shirtUpdateResult[0].small,
        "medium": shirtUpdateResult[0].medium,
        "large": shirtUpdateResult[0].large,
    };
    return results;
});
exports.resolvers = {
    Query: {
        hello: () => 'Hello world!',
        getAll: () => __awaiter(void 0, void 0, void 0, function* () { return yield getAllShirts(); })
    },
    Mutation: {
        reset: () => __awaiter(void 0, void 0, void 0, function* () { return yield resetdb(); }),
        purchase: (_, params) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("trying to purchase with params: ", params);
            const { id, size, qty } = params;
            return yield purchaseShirt(id, size, qty);
        })
    }
};


/***/ }),

/***/ "./src/type-defs.ts":
/*!**************************!*\
  !*** ./src/type-defs.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.typeDefs = apollo_server_lambda_1.gql `
type Shirt {
  id:Int
  design:String
  small:Int
  medium:Int
  large:Int
}

type User {
	UUID: String
	Name: String
	Posts: [Post]
}

type Post {
	UUID: String
	Text: String
}

input UserInput {
	Name: String
	Posts: [PostInput]
}

input PostInput{
	Text: String
}



type Mutation {
	reset:String
  addshirt:String
  purchase(id:Int!,size:String!,qty:Int!):Shirt
}

type Query {
  hello: String
	mysql_getUser(uuid: String!): User
  getAll:[Shirt]
}

schema {
	query: Query
	mutation: Mutation
}
`;


/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-lambda");;

/***/ }),

/***/ "serverless-mysql":
/*!***********************************!*\
  !*** external "serverless-mysql" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("serverless-mysql");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************************!*\
  !*** ./src/apollo-server.ts ***!
  \******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlHandler = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/resolvers.ts");
const type_defs_1 = __webpack_require__(/*! ./type-defs */ "./src/type-defs.ts");
const apolloServer = new apollo_server_lambda_1.ApolloServer({ resolvers: resolvers_1.resolvers, typeDefs: type_defs_1.typeDefs });
exports.graphqlHandler = apolloServer.createHandler();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2Fwb2xsby1zZXJ2ZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLWRiLy4vc3JjL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLWRiLy4vc3JjL3R5cGUtZGVmcy50cyIsIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLWRiL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIiIsIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLWRiL2V4dGVybmFsIFwic2VydmVybGVzcy1teXNxbFwiIiwid2VicGFjazovL3NlcnZlcmxlc3MtZGIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VydmVybGVzcy1kYi8uL3NyYy9hcG9sbG8tc2VydmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLy9pbXBvcnQgeyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmNvbnN0IGRiY29uZmlnID0ge1xuICBob3N0OiBcIm5tZWd4MHowdGo0aG8xLmN4anB6bmRxNWg5My51cy13ZXN0LTEucmRzLmFtYXpvbmF3cy5jb21cIiwvL3Byb2Nlc3MuZW52Lk1ZU1FMX0hPU1QsXG4gIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5EQl9OQU1FLFxuICB1c2VyOiBwcm9jZXNzLmVudi5VU0VSTkFNRSxcbiAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LlBBU1NXT1JEXG59XG5cblxuY29uc3QgY2xpZW50ID0gcmVxdWlyZSgnc2VydmVybGVzcy1teXNxbCcpKHtcbiAgY29uZmlnOmRiY29uZmlnXG59KVxuXG5cbmNvbnN0IHJlc2V0ZGIgPSBhc3luYyAoKSA9PiB7XG5jb25zb2xlLmxvZyhcIlJlc2V0dGluZyBEQiBjb25maWc6IFwiLGRiY29uZmlnKVxuXG4gIGF3YWl0IGNsaWVudC5xdWVyeShgXG4gIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHNoaXJ0c1xuICAoXG4gICAgICBpZCBNRURJVU1JTlQgVU5TSUdORUQgbm90IG51bGwgQVVUT19JTkNSRU1FTlQsIFxuICAgICAgY3JlYXRlZCBUSU1FU1RBTVAgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCwgXG4gICAgICBkZXNpZ24gdmFyY2hhcigxMDApIG5vdCBudWxsLFxuICAgICAgc21hbGwgSU5UIG5vdCBudWxsLFxuICAgICAgbWVkaXVtIElOVCBub3QgbnVsbCxcbiAgICAgIGxhcmdlIElOVCBub3QgbnVsbCxcbiAgICAgIFBSSU1BUlkgS0VZIChpZClcbiAgKTsgIFxuICBgKVxuICBjb25zb2xlLmxvZyhcIkNsZWFyaW5nIFRhYmxlLi4uLlwiKVxuICBhd2FpdCBjbGllbnQucXVlcnkoJ0RFTEVURSBGUk9NIHNoaXJ0cycpXG4gIGNvbnNvbGUubG9nKFwiQWRkaW5nIGluaXRhbCBzaGlydHNcIilcblxuICBhd2FpdCBjbGllbnQucXVlcnkoICdJTlNFUlQgSU5UTyBzaGlydHMgKGRlc2lnbixzbWFsbCxtZWRpdW0sbGFyZ2UpIFZBTFVFUyg/LD8sPyw/KScsIFtcImRlc2lnbjFcIiwxMCw1LDFdKTtcbiAgYXdhaXQgY2xpZW50LnF1ZXJ5KCAnSU5TRVJUIElOVE8gc2hpcnRzIChkZXNpZ24sc21hbGwsbWVkaXVtLGxhcmdlKSBWQUxVRVMoPyw/LD8sPyknLCBbXCJkZXNpZ24yXCIsMywyLDVdKTtcbiAgYXdhaXQgY2xpZW50LnF1ZXJ5KCAnSU5TRVJUIElOVE8gc2hpcnRzIChkZXNpZ24sc21hbGwsbWVkaXVtLGxhcmdlKSBWQUxVRVMoPyw/LD8sPyknLCBbXCJkZXNpZ24zXCIsMSwzLDJdKTtcbiAgXG4gIC8vIFJ1biBjbGVhbiB1cCBmdW5jdGlvblxuICBhd2FpdCBjbGllbnQuZW5kKClcbiAgcmV0dXJuIFwiU3VjY2Vzc1wiXG59XG5cblxuXG5cbmNvbnN0IGdldEFsbFNoaXJ0cyA9IGFzeW5jICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJHZXR0dGluZyBhbGwgU2hpcnRzXCIpXG4gIGxldCBzaGlydHMgPSBbXVxuICBjb25zdCBzaGlydFJlc3VsdHMgPSBhd2FpdCBjbGllbnQucXVlcnkoYCBzZWxlY3QgKiBmcm9tIHNoaXJ0c2ApXG4gIGZvcihjb25zdCBzaGlydCBvZiBzaGlydFJlc3VsdHMpe1xuICAgIGNvbnN0IHtpZCxkZXNpZ24sc21hbGwsbWVkaXVtLGxhcmdlfSA9IHNoaXJ0XG4gICAgY29uc29sZS5sb2coYFNoaXJ0IElEOiR7aWR9IC0gJHtkZXNpZ259IDogc21hbGwgUVRZOiAke3NtYWxsfSB8IG1lZGl1bSBRVFk6ICR7bWVkaXVtfSB8IGxhcmdlIFFUWTogJHtsYXJnZX0gYClcbiAgICBzaGlydHMucHVzaCh7aWQsZGVzaWduLHNtYWxsLG1lZGl1bSxsYXJnZX0pXG4gIH1cbiAgcmV0dXJuIHNoaXJ0c1xufVxuXG5jb25zdCBwdXJjaGFzZVNoaXJ0ID0gYXN5bmMgKGlkOk51bWJlcixzaXplOnN0cmluZyxxdHk6TnVtYmVyKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBQdXJjaGFzaW5nIFNoaXJ0OiAgaWQ6ICR7aWR9LHNpemU6ICR7c2l6ZX0sIHB1cmNoYXNlIHF0eToke3F0eX1gKVxuICBcbiAgIGF3YWl0IGNsaWVudC5xdWVyeShgVVBEQVRFIHNoaXJ0cyBTRVQgJHtzaXplfSA9ICR7c2l6ZX0gLSAke3F0eX0gV0hFUkUgaWQgPSAke2lkfSBBTkQgJHtzaXplfS0ke3F0eX0+PSAwOyBgKVxuICBcbiAgIGNvbnN0IHNoaXJ0VXBkYXRlUmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KGBTRUxFQ1QgKiBmcm9tIHNoaXJ0cyBXSEVSRSBpZCA9ICR7aWR9OyBgKSAgXG4gIGNvbnNvbGUubG9nKFwic2hpcnRVcGRhdGVSZXN1bHQ6IFwiLHNoaXJ0VXBkYXRlUmVzdWx0KVxuICBjb25zdCByZXN1bHRzID0ge1xuICAgIFwiaWRcIjpzaGlydFVwZGF0ZVJlc3VsdFswXS5pZCxcbiAgICBcImRlc2lnblwiOnNoaXJ0VXBkYXRlUmVzdWx0WzBdLmRlc2lnbixcbiAgICBcInNtYWxsXCI6c2hpcnRVcGRhdGVSZXN1bHRbMF0uc21hbGwsXG4gICAgXCJtZWRpdW1cIjpzaGlydFVwZGF0ZVJlc3VsdFswXS5tZWRpdW0sXG4gICAgXCJsYXJnZVwiOnNoaXJ0VXBkYXRlUmVzdWx0WzBdLmxhcmdlLFxuICB9XG4gIHJldHVybiByZXN1bHRzXG59XG5cblxuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xuXG5cbiAgUXVlcnk6IHtcbiAgICBcbiAgICBoZWxsbzogKCkgPT4gJ0hlbGxvIHdvcmxkIScsXG4gICAgZ2V0QWxsOiBhc3luYyAoKSA9PiB7IHJldHVybiBhd2FpdCBnZXRBbGxTaGlydHMoKSB9XG4gIH0sXG4gIE11dGF0aW9uOiB7XG4gICAgcmVzZXQ6ICBhc3luYyAoKSA9PiB7IHJldHVybiBhd2FpdCByZXNldGRiKCl9LCAgIFxuICAgIHB1cmNoYXNlOiBhc3luYyAoXzphbnkscGFyYW1zOmFueSk9PntcbiAgICBcbiAgICAgIGNvbnNvbGUubG9nKFwidHJ5aW5nIHRvIHB1cmNoYXNlIHdpdGggcGFyYW1zOiBcIiwgcGFyYW1zKVxuICAgICAgY29uc3Qge2lkLHNpemUscXR5fSA9IHBhcmFtcztcbiAgXG4gICAgICByZXR1cm4gYXdhaXQgcHVyY2hhc2VTaGlydChpZCxzaXplLHF0eSlcbiAgICB9ICAgXG5cbiAgfVxufTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItbGFtYmRhJztcblxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxudHlwZSBTaGlydCB7XG4gIGlkOkludFxuICBkZXNpZ246U3RyaW5nXG4gIHNtYWxsOkludFxuICBtZWRpdW06SW50XG4gIGxhcmdlOkludFxufVxuXG50eXBlIFVzZXIge1xuXHRVVUlEOiBTdHJpbmdcblx0TmFtZTogU3RyaW5nXG5cdFBvc3RzOiBbUG9zdF1cbn1cblxudHlwZSBQb3N0IHtcblx0VVVJRDogU3RyaW5nXG5cdFRleHQ6IFN0cmluZ1xufVxuXG5pbnB1dCBVc2VySW5wdXQge1xuXHROYW1lOiBTdHJpbmdcblx0UG9zdHM6IFtQb3N0SW5wdXRdXG59XG5cbmlucHV0IFBvc3RJbnB1dHtcblx0VGV4dDogU3RyaW5nXG59XG5cblxuXG50eXBlIE11dGF0aW9uIHtcblx0cmVzZXQ6U3RyaW5nXG4gIGFkZHNoaXJ0OlN0cmluZ1xuICBwdXJjaGFzZShpZDpJbnQhLHNpemU6U3RyaW5nISxxdHk6SW50ISk6U2hpcnRcbn1cblxudHlwZSBRdWVyeSB7XG4gIGhlbGxvOiBTdHJpbmdcblx0bXlzcWxfZ2V0VXNlcih1dWlkOiBTdHJpbmchKTogVXNlclxuICBnZXRBbGw6W1NoaXJ0XVxufVxuXG5zY2hlbWEge1xuXHRxdWVyeTogUXVlcnlcblx0bXV0YXRpb246IE11dGF0aW9uXG59XG5gO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcnZlcmxlc3MtbXlzcWxcIik7OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1sYW1iZGEnO1xuaW1wb3J0IHsgQ29udGV4dCwgQVBJR2F0ZXdheUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHRWMiB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyByZXNvbHZlcnMgfSBmcm9tICcuL3Jlc29sdmVycyc7XG5pbXBvcnQgeyB0eXBlRGVmcyB9IGZyb20gJy4vdHlwZS1kZWZzJztcblxuY29uc3QgYXBvbGxvU2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7IHJlc29sdmVycywgdHlwZURlZnMgfSk7XG5cbmV4cG9ydCBjb25zdCBncmFwaHFsSGFuZGxlciA9IGFwb2xsb1NlcnZlci5jcmVhdGVIYW5kbGVyKCk7XG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7QUNsR0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQ0E7QUFDQTtBQUNBO0E7Ozs7Ozs7O0FDbkRBO0FBQ0E7QTs7Ozs7Ozs7QUNEQTtBQUNBO0E7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFFQTtBQUNBO0FBRUE7QUFFQTs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==