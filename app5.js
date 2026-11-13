const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id: 1, code: "JE01", name: "東京駅" },
  { id: 2, code: "JE07", name: "舞浜駅" },
  { id: 3, code: "JE12", name: "新習志野駅" },
  { id: 4, code: "JE13", name: "幕張豊砂駅" },
  { id: 5, code: "JE14", name: "海浜幕張駅" },
  { id: 6, code: "JE05", name: "新浦安駅" },
];

app.get("/keiyo", (req, res) => {
  res.render("db2", { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;

  let newdata = { id: id, code: code, name: name };
  station.push(newdata);

  res.render("db2",{ data: station });
});

let station2 = [
  { id: 1, code: "JE01", name: "東京駅", change: "総武本線、中央線、etc", passengers: 403831, distance: 0 },
  { id: 2, code: "JE02", name: "八丁堀駅", change: "日比谷線", passengers: 31071, distance: 1.2 },
  { id: 3, code: "JE05", name: "新木場駅", change: "有楽町線、りんかい線", passengers: 67206, distance: 7.4 },
  { id: 4, code: "JE07", name: "舞浜駅", change: "舞浜リゾートライン", passengers: 76156, distance: 12.7 },
  { id: 5, code: "JE12", name: "新習志野駅", change: "", passengers: 11655, distance: 28.3 },
  { id: 6, code: "JE17", name: "千葉みなと駅", change: "千葉都市モノレール", passengers: 16602, distance: 39.0 },
  { id: 7, code: "JE18", name: "蘇我駅", change: "内房線、外房線", passengers: 31328, distance: 43.0 },
];

app.get("/keiyo2", (req, res) => {
  res.render("keiyo2", { data: station2 });
});

app.get("/keiyo2_add", (req, res) => {
  const { id, code, name, change = "", passengers, distance } = req.query;

  if (
    ![id, code, name, passengers, distance].every(value =>
      typeof value === "string" && value.trim() !== ""
    ) || typeof change !== "string"
  ) {
    return res.status(400).send("必要な項目を入力してください。");
  }

  const newdata = {
    id: Number(id),
    code: code.trim(),
    name: name.trim(),
    change: change.trim(),
    passengers: Number(passengers),
    distance: Number(distance)
  };

  if (
    !Number.isInteger(newdata.id) || newdata.id < 1 ||
    !Number.isInteger(newdata.passengers) || newdata.passengers < 0 ||
    !Number.isFinite(newdata.distance) || newdata.distance < 0
  ) {
    return res.status(400).send("IDは正の整数、乗降客数は0以上の整数、距離は0以上の数値を入力してください。");
  }

  if (station2.some(row => row.id === newdata.id)) {
    return res.status(400).send("そのIDはすでに使われています。別のIDを入力してください。");
  }

  station2.push(newdata);
  res.redirect("/keiyo2");
});

app.get("/keiyo2/:number", (req, res) => {
  const number = Number(req.params.number);

  if (!Number.isInteger(number) || number < 0 || number >= station2.length) {
    return res.status(404).send("指定された駅は見つかりません。");
  }

  const detail = station2[number];
  res.render("keiyo2_detail", { data: detail });
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken2", (req, res) => {
  const hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);

  const num = Math.floor(Math.random() * 3);
  const hands = ["グー", "チョキ", "パー"];
  const cpu = hands[num];

  let judgement = "";

  if (hand === cpu) {
    judgement = "あいこ";
  } else if (
    (hand === "グー" && cpu === "チョキ") ||
    (hand === "チョキ" && cpu === "パー") ||
    (hand === "パー" && cpu === "グー")
  ) {
    judgement = "勝ち";
    win += 1;
  } else {
    judgement = "負け";
  }

  total += 1;

  res.render("janken2", {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  });
});

let monsters = [
  { id: 1, name: "リオレウス", weakness: "龍" },
  { id: 2, name: "リオレイア", weakness: "龍" },
  { id: 3, name: "ディアブロス", weakness: "氷" },
];

app.get("/monsters", (req, res) => {
  res.render("monsters", { data: monsters });
});

app.get("/monster_add", (req, res) => {
  let id = req.query.id;
  let name = req.query.name;
  let weakness = req.query.weakness;

  let newdata = { id: id, name: name, weakness: weakness };
  monsters.push(newdata);

  res.render("monsters", { data: monsters });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
