const sqlUpvote = require("./db.ts");
// constructor
const Upvote = function(this: any, upvote) {
  this.userId = upvote.userId;
  this.heroId = upvote.heroId;
};

Upvote.create = (newUpvote, result) => {
  sqlUpvote.query("INSERT INTO Upvote SET ?", newUpvote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId});
  });
};

Upvote.remove = (delUpvote, result) => {
    sqlUpvote.query("DELETE FROM upvote WHERE userId = ? and heroId = ?", [delUpvote.userId, delUpvote.heroId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found upvote with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    });
  };

Upvote.getOne = (getUpvote, result) => {
  let query = "SELECT * FROM Upvote";
  query += ` WHERE userId = ${getUpvote.userId} AND heroId = ${getUpvote.heroId}`;

  sqlUpvote.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("upvotes: ", res);
    result(null, res);
  });
};

module.exports = Upvote;
