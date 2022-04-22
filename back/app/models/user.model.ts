const sql = require("./db.ts");

// constructor
const User = function(this: any, user) {
  this.userId = user.userId;
  this.username = user.username;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user (username) values (?)", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId});
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM user";
  query += ` WHERE username = '${title}'`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

module.exports = User;
