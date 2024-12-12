import express, { application } from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3001;

// ミドルウェア
app.use(cors());
app.use(express.json()); // JSONリクエストをパースする

// データベース接続設定
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tsubame1729', // 実際のパスワードに置き換えてください
  database: 'spaceTravel'
});

// データベースクエリのための API エンドポイント
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM clientId');
    res.json(rows);
  } catch (err) {
    console.error('Database query failed', err);
    res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});

// admin.jsからの実行命令を受け取る
app.post('/api/execute-app', async (req, res) => {
  try {
    const [resRow] = await db.execute('SELECT * FROM clientId WHERE state="waiting";');
    const date = new Date();
    date.setSeconds(date.getSeconds() + 10); // 現在時刻に10秒を追加

    const futureTime = ('0' + date.getHours()).slice(-2) + ':' + 
                       ('0' + date.getMinutes()).slice(-2) + ':' + 
                       ('0' + date.getSeconds()).slice(-2);
    console.log(resRow[0].id, futureTime);
    await db.execute(
      'UPDATE clientId SET state="inProgress",startTime=? WHERE id=?;',
      [futureTime, resRow[0].id]
    )
    res.json(resRow[0]);
  } catch(err) {
    console.error('Database query failed', err);
    res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});

// 顧客データの新規追加 qr-generater.jsから受け取る
app.post('/api/execute-query', async (req, res) => {
  try {
    const { action, params } = req.body;
    console.log(action, params);
    const { createTime, state } = params;
    // INSERT文を実行
    await db.execute(
    'INSERT INTO clientId (state) VALUES (?)', 
      [state ?? "waiting"]
    );
    const [resRow] = await db.execute(
      'SELECT * FROM clientId ORDER BY id DESC'
    )
    res.json(resRow[0]);
  } catch (err) {
    console.error('Database query failed', err);
    res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});

// ユーザーからのリクエストを受け取る
// ユーザーIDに基づいてデータを返す
app.post('/api/status', async (req, res) => {
  try {
    const userId = req.body.id;
    if (!userId) {
      return res.status(400).json({ error: 'IDがありません' });
    }
    const [resRow] = await db.execute(
      'SELECT * FROM clientId WHERE id=?;',
      [userId]
    )
    if (resRow[0] != []) {
      // 現在のステータスと開始時刻を返す
      res.json({"state":resRow[0].state, "startTime": resRow[0].startTime});
    }
  } catch(err) {
    console.log(err);
  }
});

// サーバーの起動とデータベース接続
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});