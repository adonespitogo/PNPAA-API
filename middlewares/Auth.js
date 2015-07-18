// var restify = require('restify');
// var jwToken = require('../services/jsonwebtoken');
// var User = require('../models/User');

// module.exports = function (req, res, next) {

//   if (req.authorization) {

//     if (req.authorization.credentials) {
//       jwToken.verify(req.authorization.credentials, function (err, payload) {
//         if (err) {
//           res.json(401, {err: 'Invalid Token!'});
//           return next();
//         }

//         User.findOne({where: {id: payload.id}})
//         .then(function (user) {

//           if (!user) {
//             // res.status(403);
//             return next(new Error(403));
//           }

//           req['user'] = user.dataValues;
//           return next();
//         })
//         .catch(function () {
//           return next(new restify.NotAuthorizedError());
//         });

//         next();
//       });
//     }else {
//       res.send(403, "Authorization header not found");
//       return next();
//     }

//   }else {
//     res.send(403, "Authorization header not found");
//     return next();
//   }

// };


// // next(new restify.NotAuthorizedError());