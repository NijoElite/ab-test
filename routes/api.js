const { Router } = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const router = new Router();

router.get('/data', cors(), async (req, res, next) => {
  /** Какую часть минимальных и максимальных значений нужно убрать */
  const PART_TO_REMOVE = 0.05;
  /** Количество повторений */
  const REPEAT_COUNT = 10;
  /** Извлекаемое за раз количество строк */
  const LIMIT_COUNT = 200;
  const QUERY = `
    SELECT first, second
    FROM main
    ORDER BY random()
    LIMIT ${LIMIT_COUNT};
  `;

  const avg = arr => (arr.reduce((acc, val) => acc + val, 0) / arr.length);
  const removeExtremeValues = (arr, k) => {
    const sliceIndex = Math.floor(arr.length * k);
    return [...arr].sort((a, b) => a - b).slice(sliceIndex, -sliceIndex);
  };

  const result = {
    first: [],
    second: [],
  };

  for (let i = 0; i < REPEAT_COUNT; i++) {
    const firstCol = [];
    const secondCol = [];

    const data = await pool.query(QUERY);

    for (const row of data.rows) {
      firstCol.push(row.first);
      secondCol.push(row.second);
    }

    result.first.push(avg(removeExtremeValues(firstCol, PART_TO_REMOVE)));
    result.second.push(avg(removeExtremeValues(secondCol, PART_TO_REMOVE)));
  }

  res.json(result);
});

module.exports = router;
