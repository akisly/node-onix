const express = require("express");
const http = require("http");
const UserRouter = require("../components/User/router");
const AuthRouter = require("../components/Auth/router");

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use("/v1/users", UserRouter.router);

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/auth
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use("/v1/auth", AuthRouter.router);

        /**
         * Forwards any requests to the /users URI to UserRouter.
         * @name /users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use("/users", UserRouter.viewRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res, next) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    }
};
