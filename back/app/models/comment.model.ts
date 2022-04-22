const sqlComment = require("./db.ts");

// constructor
const MComment = function(this: any, comment) {
  this.userId = comment.userId;
  this.heroId = comment.heroId;
  this.comment = comment.comment;
};

MComment.create = (newComment, result) => {
  sqlComment.query("INSERT INTO Comment SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId});
  });
};

MComment.getAll = (heroId, result) => {
  let query = "SELECT c.id, c.comment, u.username FROM Comment c JOIN User u ON (c.userId = u.userId)";
  query += ` WHERE heroId = '${heroId}'`;

  sqlComment.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("comments: ", res);
    result(null, res);
  });
};

module.exports = MComment;
