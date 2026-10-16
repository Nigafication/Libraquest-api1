'use strict';

const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT
      s.join_code AS session_code,
      s."createdAt" AS started_at,
      s.ended_at,
      u.school_id,
      p.nickname,
      p.total_stars AS score,
      p.completed
    FROM game_sessions AS s
    JOIN players AS p
      ON p.session_id = s.session_id
    JOIN users AS u
      ON u.user_id = p.user_id
    WHERE s.status = 'completed'
      AND (
        CAST(:since AS timestamptz) IS NULL
        OR s.ended_at > CAST(:since AS timestamptz)
      )
    ORDER BY s.ended_at ASC, p.total_stars DESC;
  `;

  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: {
      since: since ? since.toISOString() : null,
    },
  });
}

module.exports = {
  findFinishedGamePlayers,
};
