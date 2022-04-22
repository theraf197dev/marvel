const sqlRate = require("./db.ts");

// constructor
const Rate = function(this: any, rate) {
  this.userId = rate.userId;
  this.heroId = rate.heroId;
  this.rate = rate.rate;
};

Rate.create = (newRate, result) => {
  sqlRate.query("INSERT INTO Rate SET ?", newRate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId});
  });
};

Rate.updateById = (modRate, result) => {
  sqlRate.query(
    "UPDATE Rate SET rate = ? WHERE heroId = ? AND userId = ?",
    [modRate.rate, modRate.heroId, modRate.userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
    }
  );
};

Rate.findOne = (rate, result) => {
  let query = "SELECT * FROM rate";
  query += ` WHERE userId = ${rate.userId} AND heroId = ${rate.heroId}`;

  sqlRate.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("rates: ", res);
    result(null, res);
  });
};

Rate.getAverage = (heroId, result) => {
  let query = "SELECT rate FROM rate";
  query += ` WHERE heroId = ${heroId} `;

  sqlRate.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("rate: ", res);
    result(null, res);
  });
};

module.exports = Rate;
